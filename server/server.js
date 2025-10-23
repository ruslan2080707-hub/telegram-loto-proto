require('dotenv').config();
const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');
const { initSchema, query } = require('./db');

const PORT = process.env.PORT || 5173;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.BOT_TOKEN || '';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '';
const MIN_WITHDRAW_AZN = Number(process.env.MIN_WITHDRAW_AZN || '10');
const REF_BONUS_Q = Number(process.env.REF_BONUS_Q || '10');
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || process.env.WEBAPP_URL || ('http://localhost:'+PORT);
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}

function sendJson(res, status, data){
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}

function parseBody(req){
  return new Promise((resolve) => {
    let buf='';
    req.on('data', ch => buf += ch);
    req.on('end', () => {
      try { resolve(JSON.parse(buf || '{}')); } catch { resolve({}); }
    });
  });
}

function tgSendMessage(text, extra){
  if (!BOT_TOKEN || !ADMIN_CHAT_ID) return;
  const payload = JSON.stringify({ chat_id: ADMIN_CHAT_ID, text, parse_mode: 'Markdown', ...extra });
  const req = https.request({ hostname:'api.telegram.org', path:`/bot${BOT_TOKEN}/sendMessage`, method:'POST', headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)} });
  req.on('error',()=>{}); req.write(payload); req.end();
}

function verifyInitData(initData){
  if (!BOT_TOKEN) return null;
  const url = new URLSearchParams(initData);
  const hash = url.get('hash');
  url.delete('hash');
  const dataCheckArr = [];
  url.sort();
  url.forEach((v,k)=>{ dataCheckArr.push(`${k}=${v}`); });
  const dataCheckString = dataCheckArr.join('\n');
  const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');
  if (hmac !== hash) return null;
  const userJson = url.get('user');
  let user = null; try{ user = JSON.parse(userJson); }catch{}
  const startParam = url.get('start_param') || '';
  return { user, startParam };
}

async function getOrCreateUserByTG(tg){
  const tgId = Number(tg?.id || 0);
  if (!tgId) return null;
  const sel = await query('select * from users where tg_id=$1',[tgId]);
  if (sel.rows.length) return sel.rows[0];
  const ins = await query('insert into users (tg_id, tg_username, name) values ($1,$2,$3) returning *',[tgId, tg.username||null, tg.first_name||'User']);
  return ins.rows[0];
}

async function grantReferralIfAny(newUser, startParam){
  if (!startParam || !startParam.startsWith('ref_')) return;
  const inviterTgId = Number(startParam.slice(4));
  if (!inviterTgId || inviterTgId === Number(newUser.tg_id)) return;
  const inviterSel = await query('select * from users where tg_id=$1',[inviterTgId]);
  if (!inviterSel.rows.length) return;
  const inviter = inviterSel.rows[0];
  const refExists = await query('select 1 from referrals where invited_user_id=$1',[newUser.id]);
  if (refExists.rows.length) return;
  await query('insert into referrals (inviter_user_id, invited_user_id, bonus_q, granted) values ($1,$2,$3,true)',[inviter.id, newUser.id, REF_BONUS_Q]);
  await query('update users set invited_count=invited_count+1 where id=$1',[inviter.id]);
  await query('insert into transactions (user_id, type, amount_q, meta) values ($1, $2, $3, $4)',[inviter.id,'bonus',REF_BONUS_Q,{ reason:'referral', from:newUser.id }]);
  await query('update users set balance_q=balance_q+$1 where id=$2',[REF_BONUS_Q, inviter.id]);
  tgSendMessage(`Реферальный бонус: +${(REF_BONUS_Q/100).toFixed(2)} AZN для @${inviter.tg_username||inviter.tg_id}`);
}

// Conversion config for Stars -> USD -> AZN (can be overridden by env)
const STARS_TO_USD = Number(process.env.STARS_TO_USD || '0.02'); // 1 Star = $0.02 (100 Stars = $2)
const USD_TO_AZN = Number(process.env.USD_TO_AZN || '1.70');     // default FX rate
const TON_USD = Number(process.env.TON_USD || '2.13');           // TON price in USD
const TON_WALLET = process.env.TON_WALLET || 'UQB21lj7GGZIaYUcC_lifGsImy5qpsiKS1zJZwLypS-ZZnoG';

// In-memory TON deposits (demo). In production, store in DB.
if (!global.__TON_DEPOSITS__) global.__TON_DEPOSITS__ = [];
const TON_DEPOSITS = global.__TON_DEPOSITS__;

async function notifyAdminTON(dep){
  const approveUrl = `${process.env.PUBLIC_BASE_URL || 'http://localhost:'+PORT}/api/admin/ton/approve?id=${encodeURIComponent(dep.id)}`;
  const declineUrl = `${process.env.PUBLIC_BASE_URL || 'http://localhost:'+PORT}/api/admin/ton/decline?id=${encodeURIComponent(dep.id)}`;
  const text = `TON депозит (ожидает):\nID: ${dep.id}\nСумма: ${dep.amountAZN} AZN\nTX: ${dep.tx || '-'}\n\n[Подтвердить](${approveUrl}) | [Отклонить](${declineUrl})`;
  const token = process.env.BOT_TOKEN;
  const adminChat = process.env.ADMIN_CHAT_ID;
  if (token && adminChat){
    try{
      const https = require('https');
      const payload = JSON.stringify({ chat_id: adminChat, text, parse_mode: 'Markdown' });
      const req = https.request({
        hostname: 'api.telegram.org',
        path: `/bot${token}/sendMessage`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      });
      req.on('error', ()=>{});
      req.write(payload); req.end();
    }catch(e){ /* noop */ }
  } else {
    console.log('[TON deposit pending]\n', text);
  }
}

initSchema().catch((err)=>{
  console.error('Database initialization failed:', err);
});

const server = http.createServer(async (req, res) => {
  let reqPath = req.url.split('?')[0];

  if (reqPath === '/api/telegram/verify' && req.method === 'POST'){
    try{
      const body = await parseBody(req);
      const initData = String(body?.initData||'');
      const parsed = verifyInitData(initData);
      if (!parsed || !parsed.user) return sendJson(res, 401, { ok:false, error:'bad_signature' });
      const user = await getOrCreateUserByTG(parsed.user);
      await grantReferralIfAny(user, parsed.startParam||'');
      return sendJson(res, 200, { ok:true, user:{ id:user.id, tg_id:user.tg_id, name:user.name, username:user.tg_username, balanceAZN: (user.balance_q/100).toFixed(2) } });
    }catch(e){ return sendJson(res, 500, { ok:false, error:'server_error' }); }
  }

  if (reqPath === '/api/withdraw/request' && req.method === 'POST'){
    try{
      const body = await parseBody(req);
      const tgId = Number(body?.tg_id||0);
      const amountAZN = Number(body?.amountAZN||0);
      const cardNumber = String(body?.cardNumber||'').replace(/\s+/g,'');
      if (!tgId) return sendJson(res,400,{ok:false,error:'no_user'});
      if (!isFinite(amountAZN) || amountAZN < MIN_WITHDRAW_AZN) return sendJson(res,400,{ok:false,error:'min_10'});
      if (!/^\d{16}$/.test(cardNumber)) return sendJson(res,400,{ok:false,error:'card_16'});
      const ures = await query('select * from users where tg_id=$1',[tgId]);
      if (!ures.rows.length) return sendJson(res,404,{ok:false,error:'user_not_found'});
      const u = ures.rows[0];
      const amount_q = Math.round(amountAZN*100);
      if (u.balance_q < amount_q) return sendJson(res,400,{ok:false,error:'insufficient'});
      const ins = await query('insert into withdraw_requests (user_id, amount_q, method, card_number) values ($1,$2,$3,$4) returning *',[u.id, amount_q, 'card', cardNumber]);
      const wr = ins.rows[0];
      const masked = cardNumber.replace(/\d{12}(\d{4})/,'**** **** **** $1');
      const text = `Вывод (ожидает):\nПользователь: @${u.tg_username||u.tg_id}\nСумма: ${(amount_q/100).toFixed(2)} AZN\nКарта: ${masked}`;
      const reply_markup = { inline_keyboard: [[
        { text: 'Подтвердить', callback_data: `withdraw:approve:${wr.id}` },
        { text: 'Отклонить', callback_data: `withdraw:decline:${wr.id}` }
      ]] };
      tgSendMessage(text, { reply_markup });
      return sendJson(res,200,{ok:true,id:wr.id});
    }catch(e){ return sendJson(res,500,{ok:false,error:'server_error'}); }
  }

  if (reqPath === '/api/admin/withdraw/approve' && req.method === 'GET'){
    try{
      const url = new URL(req.url, 'http://localhost');
      const id = Number(url.searchParams.get('id')||0);
      const sel = await query('select * from withdraw_requests where id=$1',[id]);
      if (!sel.rows.length) return sendJson(res,404,{ok:false,error:'not_found'});
      const wr = sel.rows[0];
      if (wr.status !== 'pending') return sendJson(res,400,{ok:false,error:'already'});
      const ures = await query('select * from users where id=$1',[wr.user_id]);
      const u = ures.rows[0];
      if (u.balance_q < wr.amount_q) return sendJson(res,400,{ok:false,error:'insufficient'});
      await query('update users set balance_q=balance_q-$1 where id=$2',[wr.amount_q,u.id]);
      await query('insert into transactions (user_id,type,amount_q,meta) values ($1,$2,$3,$4)',[u.id,'withdraw',-wr.amount_q,{ method:'card', request_id:wr.id }]);
      await query("update withdraw_requests set status='approved', decided_at=now() where id=$1",[id]);
      tgSendMessage(`Вывод одобрен: @${u.tg_username||u.tg_id} на ${(wr.amount_q/100).toFixed(2)} AZN`);
      return sendJson(res,200,{ok:true,status:'approved'});
    }catch(e){ return sendJson(res,500,{ok:false,error:'server_error'}); }
  }

  if (reqPath === '/api/admin/withdraw/decline' && req.method === 'GET'){
    try{
      const url = new URL(req.url, 'http://localhost');
      const id = Number(url.searchParams.get('id')||0);
      const sel = await query('select * from withdraw_requests where id=$1',[id]);
      if (!sel.rows.length) return sendJson(res,404,{ok:false,error:'not_found'});
      await query("update withdraw_requests set status='declined', decided_at=now() where id=$1",[id]);
      return sendJson(res,200,{ok:true,status:'declined'});
    }catch(e){ return sendJson(res,500,{ok:false,error:'server_error'}); }
  }

  // minimal API for demo top-up intent
  if (reqPath === '/api/topup-intent' && req.method === 'POST'){
    const body = await parseBody(req);
    const amount = Number(body?.amountAZN);
    if (!isFinite(amount) || amount <= 0){
      return sendJson(res, 400, { ok:false, error: 'Invalid amount' });
    }
    // In real integration, create invoice via Telegram Payments (Ammer Pay) and return invoice_link
    const fakeLink = `demo-invoice://ammerpay?amount=${amount.toFixed(2)}`;
    return sendJson(res, 200, { ok:true, invoice_link: fakeLink });
  }

  // minimal API for demo Stars (XTR) top-up intent
  if (reqPath === '/api/topup-stars-intent' && req.method === 'POST'){
    const body = await parseBody(req);
    const stars = Number(body?.stars);
    if (!isFinite(stars) || stars <= 0){
      return sendJson(res, 400, { ok:false, error: 'Invalid stars amount' });
    }
    // In real integration, create Stars invoice (XTR). Here we just echo and provide a demo link
    const fakeLink = `demo-invoice://stars?amount=${stars.toFixed(0)}`;
    const usd = stars * STARS_TO_USD;
    const azn = Math.floor(usd * USD_TO_AZN * 100) / 100; // 2 decimals
    return sendJson(res, 200, {
      ok: true,
      invoice_link: fakeLink,
      stars,
      usd: Number(usd.toFixed(2)),
      azn,
      rates: { stars_to_usd: STARS_TO_USD, usd_to_azn: USD_TO_AZN }
    });
  }

  // minimal API for demo withdrawal intent (manual or stars)
  if (reqPath === '/api/withdraw-intent' && req.method === 'POST'){
    const body = await parseBody(req);
    const amount = Number(body?.amountAZN);
    const method = String(body?.method || 'manual');
    if (!isFinite(amount) || amount <= 0){
      return sendJson(res, 400, { ok:false, error: 'Invalid amount' });
    }
    if (!['manual','stars'].includes(method)){
      return sendJson(res, 400, { ok:false, error: 'Invalid method' });
    }
    // In real integration, create a withdrawal request record (manual) or start Stars payout flow
    return sendJson(res, 200, { ok:true, method });
  }

  // TON info (wallet address)
  if (reqPath === '/api/ton/info' && req.method === 'GET'){
    return sendJson(res, 200, { ok:true, wallet: TON_WALLET, ton_usd: TON_USD, usd_to_azn: USD_TO_AZN });
  }

  // Create TON manual deposit request
  if (reqPath === '/api/ton/deposit-request' && req.method === 'POST'){
    const body = await parseBody(req);
    const amountAZN = Number(body?.amountAZN);
    const tx = String(body?.tx || '').trim();
    if (!isFinite(amountAZN) || amountAZN <= 0){
      return sendJson(res, 400, { ok:false, error: 'Invalid amount' });
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const deposit = { id, userId: 'you', amountAZN: Math.floor(amountAZN*100)/100, tx, status: 'pending', createdAt: Date.now() };
    TON_DEPOSITS.push(deposit);
    notifyAdminTON(deposit).catch(()=>{});
    return sendJson(res, 200, { ok:true, id });
  }

  // Get TON deposit status
  if (reqPath === '/api/ton/deposit-status' && req.method === 'GET'){
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');
    const dep = TON_DEPOSITS.find(d => d.id === id);
    if (!dep) return sendJson(res, 404, { ok:false, error:'Not found' });
    return sendJson(res, 200, { ok:true, status: dep.status, amountAZN: dep.amountAZN });
  }

  // Admin approve/decline TON deposit
  if (reqPath === '/api/admin/ton/approve' && req.method === 'GET'){
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');
    const dep = TON_DEPOSITS.find(d => d.id === id);
    if (!dep) return sendJson(res, 404, { ok:false, error:'Not found' });
    dep.status = 'approved';
    return sendJson(res, 200, { ok:true, id, status: dep.status });
  }
  if (reqPath === '/api/admin/ton/decline' && req.method === 'GET'){
    const url = new URL(req.url, 'http://localhost');
    const id = url.searchParams.get('id');
    const dep = TON_DEPOSITS.find(d => d.id === id);
    if (!dep) return sendJson(res, 404, { ok:false, error:'Not found' });
    dep.status = 'declined';
    return sendJson(res, 200, { ok:true, id, status: dep.status });
  }

  if (reqPath === '/' || reqPath === '') {
    return serveFile(path.join(PUBLIC_DIR, 'index.html'), res);
  }
  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err) {
      return serveFile(path.join(PUBLIC_DIR, 'index.html'), res);
    }
    if (stat.isDirectory()) {
      return serveFile(path.join(filePath, 'index.html'), res);
    }
    serveFile(filePath, res);
  });
});

server.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
  console.log(`Database URL configured: ${DATABASE_URL ? 'Yes' : 'No'}`);
  console.log(`Bot token configured: ${BOT_TOKEN ? 'Yes' : 'No'}`);
  console.log(`Admin chat ID: ${ADMIN_CHAT_ID}`);
  console.log(`Public base URL: ${PUBLIC_BASE_URL}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
