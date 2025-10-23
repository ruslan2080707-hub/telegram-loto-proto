  const tabRooms = document.getElementById('tabRooms');
  const tabTasks = document.getElementById('tabTasks');
  const tabReferral = document.getElementById('tabReferral');
  const tabRating = document.getElementById('tabRating');
  const tabProfile = document.getElementById('tabProfile');
// Lotto Mini-app Prototype
(function(){
  // Azerbaijani-like names for bots
  const AZ_NAMES = [
    'Ali','Murad','Orxan','Kamal','Rəsul','Elvin','Rauf','Farid','Nihad','Emin',
    'Samir','Tural','Elnur','Kamran','Anar','Cavid','Fuad','Ramil','Ilqar','Sahil',
    'Aysel','Nigar','Leyla','Sevda','Günel','Aygün','Zeynəb','Şəbnəm','Nərgiz','Rəna',
    'Fidan','Sevil','Tamilla','Sabina','Aylin','Laman','Xəyalə','Konul','Günay','Nazlı',
    'Yusif','Hüseyn','Məhəmməd','Əli','Ömər','Tunar','Elçin','Sadiq','Arzu','Ilham'
  ];
  const I18N = {
    ru: {
      titleLobby: 'Лото — Лобби',
      backToLobby: '← Лобби',
      balance: 'Баланс',
      topupAZN: 'Пополнить AZN',
      topupTON: 'Пополнить TON',
      topupStars: 'Пополнить Телеграм Старс',
      withdraw: 'Вывод',
      room: 'Комната',
      roomName_gold: 'Золотой зал',
      roomName_sapphire: 'Сапфировый зал',
      roomName_emerald: 'Изумрудный зал',
      roomName_free: 'Тренировочный зал',
      tabRooms: 'Комнаты',
      tabTasks: 'Задания',
      tabReferral: 'Рефералка',
      tabRating: 'Рейтинг',
      tabProfile: 'Профиль',
      players: 'Игроков',
      pool: 'Пул',
      prize80: '',
      enter: 'Зайти',
      myCards: 'Мои карты:',
      waiting: 'Старт через',
      running: 'Идёт розыгрыш',
      finished: 'Завершено. Новый матч через',
      buyCard: 'Купить карту',
      getCardFree: 'Получить карту (бесплатно)',
      buyMore2: 'Купить ещё (2 из 3)',
      buyMore1: 'Купить ещё (1 из 3)',
      limitReached: 'Лимит карт достигнут',
      pricePerCard: 'AZN/карта',
      free: 'Бесплатно',
      openPurchasePrice: 'Покупка открыта. Цена',
      openPurchaseFree: 'Покупка открыта. Бесплатные карты.',
      youBought: 'Вы купили',
      youTook: 'Вы взяли',
      of3: 'из 3.',
      expect3: 'Ожидают 3 цифры', expect2: 'Ожидают 2 цифры', expect1: 'Ожидают 1 цифру',
      prize: 'Приз',
      ok: 'Понятно',
    },
    az: {
      titleLobby: 'Loto — Lobi',
      backToLobby: '← Lobi',
      balance: 'Balans',
      topupAZN: 'AZN ilə artır',
      topupTON: 'TON ilə artır',
      topupStars: 'Telegram Stars ilə artır',
      withdraw: 'Çıxarış',
      room: 'Otaq',
      roomName_gold: 'Qızıl zal',
      roomName_sapphire: 'Safir zalı',
      roomName_emerald: 'Zümrüd zalı',
      roomName_free: 'Məşq zalı',
      tabRooms: 'Otaqlar',
      tabTasks: 'Tapşırıqlar',
      tabReferral: 'Referal',
      tabRating: 'Reytinq',
      tabProfile: 'Profil',
      players: 'Oyunçular',
      pool: 'Fond',
      prize80: '',
      enter: 'Daxil ol',
      myCards: 'Kartlarım:',
      waiting: 'Starta',
      running: 'Çəkiliş gedir',
      finished: 'Bitdi. Yeni oyun',
      buyCard: 'Kart al',
      getCardFree: 'Kart al (pulsuz)',
      buyMore2: 'Daha al (2/3)',
      buyMore1: 'Daha al (1/3)',
      limitReached: 'Limit doldu',
      pricePerCard: 'AZN/kart',
      free: 'Pulsuz',
      openPurchasePrice: 'Alış açıqdır. Qiymət',
      openPurchaseFree: 'Alış açıqdır. Pulsuz kartlar.',
      youBought: 'Aldınız',
      youTook: 'Götürdünüz',
      of3: '3-dən.',
      expect3: '3 rəqəm gözləyir', expect2: '2 rəqəm gözləyir', expect1: '1 rəqəm gözləyir',
      prize: 'Mükafat',
      ok: 'Başa düşdüm',
    },
    en: {
      titleLobby: 'Lotto — Lobby',
      backToLobby: '← Lobby',
      balance: 'Balance',
      topupAZN: 'Top up AZN',
      topupTON: 'Top up TON',
      topupStars: 'Top up Telegram Stars',
      withdraw: 'Withdraw',
      room: 'Room',
      roomName_gold: 'Gold Hall',
      roomName_sapphire: 'Sapphire Hall',
      roomName_emerald: 'Emerald Hall',
      roomName_free: 'Practice Hall',
      tabRooms: 'Rooms',
      tabTasks: 'Tasks',
      tabReferral: 'Referral',
      tabRating: 'Rating',
      tabProfile: 'Profile',
      players: 'Players',
      pool: 'Pool',
      prize80: '',
      enter: 'Enter',
      myCards: 'My cards:',
      waiting: 'Starts in',
      running: 'Drawing',
      finished: 'Finished. Next in',
      buyCard: 'Buy card',
      getCardFree: 'Get card (free)',
      buyMore2: 'Buy more (2 of 3)',
      buyMore1: 'Buy more (1 of 3)',
      limitReached: 'Limit reached',
      pricePerCard: 'AZN/card',
      free: 'Free',
      openPurchasePrice: 'Purchase open. Price',
      openPurchaseFree: 'Purchase open. Free cards.',
      youBought: 'You bought',
      youTook: 'You took',
      of3: 'of 3.',
      expect3: 'Waiting 3 numbers', expect2: 'Waiting 2 numbers', expect1: 'Waiting 1 number',
      prize: 'Prize',
      ok: 'OK',
      closed: 'Purchase closed.',
      drawBallsTitle: 'Drawn numbers (last 20):',
      win: 'Win!',
      canBuyMore: 'You can buy',
      cardsWord: 'cards',
    }
  };

  // Telegram WebApp verify -> fetch user and balance from server
  async function setupTelegram(){
    try{
      const tg = window.Telegram && window.Telegram.WebApp;
      const initData = tg && tg.initData;
      if (!initData) return;
      const res = await fetch('/api/telegram/verify', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ initData }) });
      const data = await res.json();
      if (!data.ok) return;
      state.user.remote = { id: data.user.id, tg_id: data.user.tg_id, username: data.user.username };
      state.user.id = String(data.user.tg_id || 'you');
      state.user.name = data.user.username || state.user.name;
      state.user.balance = Number(data.user.balanceAZN || state.user.balance);
      updateBalanceUI();
    }catch(e){ /* ignore */ }
  }
  function t(key){
    const dict = I18N[state?.user?.lang || 'ru'] || I18N.ru;
    return dict[key] || key;
  }
  const ROOMS = [
    { id: 'gold', price: 0.20 },
    { id: 'sapphire', price: 1.00 },
    { id: 'emerald', price: 5.00 },
    { id: 'free', price: 0.00, demoFree: true },
  ];

  const COUNTDOWN_SECONDS = 90; // 1 minute 30 seconds
  const DRAW_INTERVAL_MS = 3000; // 3 seconds

  const lobbyEl = document.getElementById('lobby');
  const roomViewEl = document.getElementById('roomView');
  const tasksViewEl = document.getElementById('tasksView');
  const referralViewEl = document.getElementById('referralView');
  const ratingViewEl = document.getElementById('ratingView');
  const profileViewEl = document.getElementById('profileView');
  const backBtn = document.getElementById('backBtn');
  const titleEl = document.getElementById('title');
  const balanceEl = document.getElementById('balance');
  const topupBtn = document.getElementById('topupBtn');
  const topupStarsBtn = document.getElementById('topupStarsBtn');
  const topupTonBtn = document.getElementById('topupTonBtn');
  const withdrawBtn = document.getElementById('withdrawBtn');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayPrize = document.getElementById('overlayPrize');
  const overlayCard = document.getElementById('overlayCard');
  const overlayClose = document.getElementById('overlayClose');
  const introEl = document.getElementById('intro');

  overlayClose.onclick = () => overlay.style.display = 'none';

  // Local client state only (demo). In production, this comes from server.
  // Audio (WebAudio) for SFX
  let audioCtx = null;
  function getAudioCtx(){
    if (!audioCtx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }

  async function topupTonFlow(){
    // Show wallet address to user and collect TX hash/link
    try{
      const infoRes = await fetch('/api/ton/info');
      const info = await infoRes.json();
      if (!info.ok){ alert('TON кошелёк недоступен'); return; }
      const amountVal = prompt(`Введите сумму пополнения (AZN). Отправьте TON на адрес:\n${info.wallet}\n\nПосле отправки введите сумму:`, '1.00');
      if (!amountVal) return;
      const amount = Number(amountVal.replace(',', '.'));
      if (!isFinite(amount) || amount <= 0){ alert('Неверная сумма'); return; }
      const tx = prompt('Вставьте ссылку/хеш транзакции TON для проверки админом:', '') || '';
      const res = await fetch('/api/ton/deposit-request', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountAZN: amount, tx })
      });
      const data = await res.json();
      if (!data.ok){ alert('Ошибка создания заявки'); return; }
      const id = data.id;
      alert('Заявка создана. Ожидайте проверки.');
      // simple polling for status
      const t = setInterval(async () => {
        const st = await fetch(`/api/ton/deposit-status?id=${encodeURIComponent(id)}`);
        const sj = await st.json();
        if (!sj.ok) { clearInterval(t); return; }
        if (sj.status === 'approved'){
          state.user.balance = +(state.user.balance + Number(sj.amountAZN || amount)).toFixed(2);
          updateBalanceUI();
          alert('Депозит подтверждён админом. Средства зачислены.');
          clearInterval(t);
        } else if (sj.status === 'declined'){
          alert('Депозит отклонён. Проверьте данные транзакции.');
          clearInterval(t);
        }
      }, 3000);
    }catch(e){
      alert('Сбой запроса TON');
    }
  }
    return audioCtx;
  }
  function unlockAudio(){
    const ctx = getAudioCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }
  function playTone(freq, duration=0.07, type='sine', gain=0.05){
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g); g.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.stop(now + duration + 0.01);
  }
  function playTick(){
    playTone(880, 0.05, 'square', 0.04);
  }
  function playWin(){
    // simple pleasant arpeggio
    const seq = [660, 880, 1320];
    seq.forEach((f, i) => setTimeout(() => playTone(f, 0.12, 'sine', 0.06), i*120));
  }
  function stopAudioNow(){
    const ctx = audioCtx;
    if (!ctx) return;
    if (ctx.state === 'running') ctx.suspend();
  }

  // Local client state only (demo). In production, this comes from server.
  const state = {
    rooms: {},
    view: { mode: 'lobby', currentRoomId: null },
    user: { id: 'you', name: 'Вы', balance: 0.00, lang: 'ru', remote: null }
  };

  ROOMS.forEach(r => {
    state.rooms[r.id] = createRoomState(r.id, r.price);
  });

  // UI nav
  backBtn.onclick = () => goLobby();
  topupBtn.onclick = () => topupFlow();
  if (topupStarsBtn) topupStarsBtn.onclick = () => topupStarsFlow();
  if (topupTonBtn) topupTonBtn.onclick = () => topupTonFlow();
  if (withdrawBtn) withdrawBtn.onclick = () => withdrawFlow();
  // ensure audio on first user gesture anywhere
  window.addEventListener('pointerdown', unlockAudio, { once: true });
  // balance quick actions
  if (balanceEl){
    balanceEl.style.cursor = 'pointer';
    balanceEl.title = 'Пополнить/Вывести';
    balanceEl.onclick = () => {
      const action = prompt('Введите: deposit или withdraw','withdraw');
      if (!action) return;
      if (action.toLowerCase().startsWith('dep')) topupFlow();
      else withdrawFlow();
    };
  }
  // intro language select
  if (introEl){
    introEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
      introEl.style.display = 'none';
      renderTick();
    });
  }
  function setActiveTab(tabId){
    [tabRooms,tabTasks,tabReferral,tabRating,tabProfile].forEach(b=>{ if(!b)return; b.classList.toggle('active', b&&b.id===tabId); });
  }
  function showOnly(el){
    [lobbyEl,roomViewEl,tasksViewEl,referralViewEl,ratingViewEl,profileViewEl].forEach(x=>{ if (!x) return; x.style.display = (x===el)?'':'none'; });
  }
  function goLobby(){
    state.view.mode = 'lobby';
    state.view.currentRoomId = null;
    titleEl.textContent = t('titleLobby');
    backBtn.style.display = 'none';
    setActiveTab('tabRooms');
    showOnly(lobbyEl);
    renderLobby();
  }

  async function topupStarsFlow(){
    const val = prompt('Введите сумму пополнения в Stars (XTR):', '10');
    if (!val) return;
    const stars = Math.floor(Number(val));
    if (!isFinite(stars) || stars <= 0) { alert('Неверное количество Stars'); return; }
    try{
      const res = await fetch('/api/topup-stars-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars })
      });
      const data = await res.json();
      if (!data.ok){
        alert('Ошибка создания Stars-инвойса: ' + (data.error || 'unknown'));
        return;
      }
      const rate = Number(data.rate_xtr_to_azn ?? 0.10);
      const azn = Math.floor(stars * rate * 100)/100;
      // In Telegram, call Telegram.WebApp.openInvoice(data.invoice_link);
      // Demo: считаем, что оплата прошла
      state.user.balance = +(state.user.balance + azn).toFixed(2);
      updateBalanceUI();
      alert(`Пополнение XTR успешно (демо): +${stars} Stars ≈ +${azn.toFixed(2)} AZN по курсу ${rate.toFixed(2)}`);
    }catch(e){
      alert('Сбой запроса Stars-топ-апа');
    }
  }

  async function withdrawFlow(){
    const val = prompt('Введите сумму вывода (AZN):', '1.00');
    if (!val) return;
    const amount = Number(val.replace(',', '.'));
    if (!isFinite(amount) || amount <= 0) { alert('Неверная сумма'); return; }
    if (amount > state.user.balance){ alert('Недостаточно средств'); return; }
    const method = prompt('Метод вывода: введите "stars" или "manual"', 'manual')?.trim().toLowerCase();
    if (!method || !['stars','manual'].includes(method)){ alert('Неверный метод'); return; }
    try{
      const res = await fetch('/api/withdraw-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountAZN: amount, method })
      });
      const data = await res.json();
      if (!data.ok){
        alert('Ошибка создания заявки на вывод');
        return;
      }
      // Demo: сразу списываем баланс
      state.user.balance = +(state.user.balance - amount).toFixed(2);
      updateBalanceUI();
      if (method === 'stars'){
        alert(`Заявка на вывод в Stars создана (демо). Сумма: ${amount.toFixed(2)} AZN`);
      } else {
        alert(`Заявка на ручной вывод создана (демо). Сумма: ${amount.toFixed(2)} AZN`);
      }
    }catch(e){
      alert('Сбой запроса вывода');
    }
  }
  function roomDisplayName(room){
    return t('roomName_'+room.id) || `${t('room')} ${String(room.id).toUpperCase()}`;
  }
  function goRoom(id){
    state.view.mode = 'room';
    state.view.currentRoomId = id;
    titleEl.textContent = roomDisplayName(state.rooms[id]);
    backBtn.style.display = '';
    lobbyEl.style.display = 'none';
    roomViewEl.style.display = '';
    renderRoomView();
  }

  // initial
  goLobby();
  startLoops();
  updateBalanceUI();
  setupTelegram();

  // Tabs handlers
  if (tabRooms) tabRooms.onclick = () => goLobby();
  if (tabTasks) tabTasks.onclick = () => { state.view.mode='tasks'; backBtn.style.display='none'; titleEl.textContent='Задания'; setActiveTab('tabTasks'); renderTasksView(); showOnly(tasksViewEl); };
  if (tabReferral) tabReferral.onclick = () => { state.view.mode='referral'; backBtn.style.display='none'; titleEl.textContent='Рефералка'; setActiveTab('tabReferral'); renderReferralView(); showOnly(referralViewEl); };
  if (tabRating) tabRating.onclick = () => { state.view.mode='rating'; backBtn.style.display='none'; titleEl.textContent='Рейтинг'; setActiveTab('tabRating'); renderRatingView(); showOnly(ratingViewEl); };
  if (tabProfile) tabProfile.onclick = () => { state.view.mode='profile'; backBtn.style.display='none'; titleEl.textContent='Профиль'; setActiveTab('tabProfile'); renderProfileView(); showOnly(profileViewEl); };

  function renderTasksView(){
    tasksViewEl.innerHTML = '';
    const wrap = el('div','room');
    const head = el('div','head');
    head.appendChild(el('div','title','Задания'));
    wrap.appendChild(head);
    const body = el('div','body');
    const tg_id = getTgId();
    fetch(`/api/tasks${tg_id?`?tg_id=${tg_id}`:''}`)
      .then(r=>r.json()).then(d=>{
        if (!d.ok){ body.appendChild(el('div','', 'Ошибка загрузки заданий')); return; }
        const completed = new Set(d.completed||[]);
        (d.tasks||[]).forEach(tk => {
          const row = el('div');
          row.appendChild(el('div','', `${tk.title} — награда ${Number(tk.reward_azn||0).toFixed(2)} AZN`));
          row.appendChild(el('div','', tk.description));
          const btn = el('button','go-btn small', completed.has(tk.id) ? 'Выполнено' : 'Выполнить');
          btn.disabled = completed.has(tk.id) || !tg_id;
          btn.onclick = async ()=>{
            try{
              const res = await fetch('/api/tasks/complete', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ tg_id, taskId: tk.id }) });
              const jr = await res.json();
              if (!jr.ok){ alert('Не удалось выполнить задание'); return; }
              btn.textContent = 'Выполнено'; btn.disabled = true;
              await refreshBalanceFromServer();
            }catch{ alert('Ошибка выполнения'); }
          };
          row.appendChild(btn);
          body.appendChild(row);
        });
      }).catch(()=> body.appendChild(el('div','', 'Ошибка сети')));
    wrap.appendChild(body);
    tasksViewEl.appendChild(wrap);
  }

  function renderReferralView(){
    referralViewEl.innerHTML='';
    const wrap = el('div','room');
    const head = el('div','head');
    head.appendChild(el('div','title','Реферальная программа'));
    wrap.appendChild(head);
    const body = el('div','body');
    const tgId = state.user?.remote?.tg_id;
    const bot = 'loto_onlinebot';
    const link = tgId ? `https://t.me/${bot}?startapp=ref_${tgId}` : 'Доступно после входа через Telegram';
    body.appendChild(el('div','', 'Бонус за друга: 0.10 AZN'));
    const input = el('input'); input.value = link; input.readOnly = true; input.style.width='100%'; input.style.padding='8px'; input.style.borderRadius='8px';
    body.appendChild(input);
    const copyBtn = el('button','go-btn small','Скопировать ссылку');
    copyBtn.onclick = async ()=>{ try{ await navigator.clipboard.writeText(link); copyBtn.textContent='Скопировано'; setTimeout(()=>copyBtn.textContent='Скопировать ссылку',1200);}catch{}}
    body.appendChild(copyBtn);
    wrap.appendChild(body);
    referralViewEl.appendChild(wrap);
  }

  function renderRatingView(){
    ratingViewEl.innerHTML='';
    const wrap = el('div','room');
    const head = el('div','head');
    head.appendChild(el('div','title','Рейтинг'));
    wrap.appendChild(head);
    const body = el('div','body');
    fetch('/api/leaderboard').then(r=>r.json()).then(d=>{
      if (!d.ok){ body.appendChild(el('div','', 'Ошибка загрузки рейтинга')); return; }
      const list = el('div');
      (d.top||[]).forEach((it, idx) => {
        const line = el('div');
        line.textContent = `${idx+1}. @${it.username||'-'} • игры: ${it.games_played||0} • приглашено: ${it.invited_count||0}`;
        list.appendChild(line);
      });
      body.appendChild(list);
    }).catch(()=> body.appendChild(el('div','', 'Ошибка сети')));
    wrap.appendChild(body);
    ratingViewEl.appendChild(wrap);
  }

  function renderProfileView(){
    profileViewEl.innerHTML='';
    const wrap = el('div','room');
    const head = el('div','head');
    head.appendChild(el('div','title','Профиль'));
    wrap.appendChild(head);
    const body = el('div','body');
    const tg_id = getTgId();
    if (!tg_id){
      body.appendChild(el('div','', 'Войдите через Telegram, чтобы видеть профиль.'));
    } else {
      fetch(`/api/profile?tg_id=${tg_id}`).then(r=>r.json()).then(d=>{
        if (!d.ok){ body.appendChild(el('div','', 'Ошибка загрузки профиля')); return; }
        const p = d.profile;
        body.appendChild(el('div','', `Имя: @${p.username||state.user.name||'-'}`));
        body.appendChild(el('div','', `Баланс: ${Number(p.balanceAZN||state.user.balance).toFixed(2)} AZN`));
        body.appendChild(el('div','', `Сыграно игр: ${p.gamesPlayed||0}`));
        body.appendChild(el('div','', `Приглашённых: ${p.invited||0}`));
        body.appendChild(el('div','', `Пополнено всего: ${Number(p.totalDepositsAZN||0).toFixed(2)} AZN`));
        body.appendChild(el('div','', `Выведено всего: ${Number(p.totalWithdrawAZN||0).toFixed(2)} AZN`));
      }).catch(()=> body.appendChild(el('div','', 'Ошибка сети')));
    }
    wrap.appendChild(body);
    profileViewEl.appendChild(wrap);
  }

  function getTgId(){ return state?.user?.remote?.tg_id || null; }
  async function refreshBalanceFromServer(){
    const tg_id = getTgId(); if (!tg_id) return;
    try{
      const r = await fetch(`/api/profile?tg_id=${tg_id}`); const d = await r.json();
      if (d && d.ok){ state.user.balance = Number(d.profile.balanceAZN||state.user.balance); updateBalanceUI(); }
    }catch{}
  }

  function createRoomState(id, price){
    return {
      id,
      price,
      phase: 'waiting', // waiting -> running -> finished -> waiting
      countdown: COUNTDOWN_SECONDS,
      nextDrawAt: null,
      drawn: [],
      purchases: 0, // your cards count for current match
      cards: [],
      winners: [], // array of {cardIndex, userId}
      matchIndex: 1,
      totalPlayers: 1,
      totalPurchases: 0,
      bots: [],
      botPlan: (function(){
        const plannedCount = Math.floor(25 + Math.random()*6); // 25..30
        let plannedPurchases = 0;
        for (let i=0;i<plannedCount;i++) plannedPurchases += (1 + Math.floor(Math.random()*3));
        return { count: plannedCount, purchases: plannedPurchases };
      })(),
      rngSeed: Math.random().toString(36).slice(2)
    };
  }

  function resetForNextMatch(room){
    room.phase = 'waiting';
    room.countdown = COUNTDOWN_SECONDS;
    room.nextDrawAt = null;
    room.drawn = [];
    room.purchases = 0;
    room.totalPlayers = 1;
    room.totalPurchases = 0;
    room.cards = [];
    room.winners = [];
    room.bots = [];
    // plan bots for next match (so counts rise during waiting)
    const plannedCount = Math.floor(25 + Math.random()*6); // 25..30
    let plannedPurchases = 0;
    for (let i=0;i<plannedCount;i++) plannedPurchases += (1 + Math.floor(Math.random()*3));
    room.botPlan = { count: plannedCount, purchases: plannedPurchases };
    room.matchIndex += 1;
  }

  function seedBots(room){
    const botCount = room.botPlan ? room.botPlan.count : Math.floor(25 + Math.random()*6);
    const bots = [];
    let botPurchases = 0;
    const usedNames = new Set();
    for (let i=0;i<botCount;i++){
      const id = 'bot_'+(room.matchIndex)+'_'+i;
      let name = AZ_NAMES[Math.floor(Math.random()*AZ_NAMES.length)] || `Bot ${i+1}`;
      // ensure some uniqueness
      if (usedNames.has(name)) name = name + ' ' + (10 + Math.floor(Math.random()*90));
      usedNames.add(name);
      const cards = [];
      const buyN = 1 + Math.floor(Math.random()*3); // 1..3
      for (let k=0;k<buyN;k++) cards.push(generateLotoCard());
      botPurchases += buyN;
      bots.push({ id, name, cards });
    }
    room.bots = bots;
    room.totalPlayers = 1 + botCount; // user + bots
    room.totalPurchases = room.purchases + botPurchases;
  }

  function findBotName(room, botId){
    const b = (room.bots || []).find(x => x.id === botId);
    return b && b.name;
  }

  function getWinnerCardElement(room, win){
    if (win.userId === state.user.id){
      return renderCard(room, room.cards[win.cardIndex], win.cardIndex);
    }
    const bot = (room.bots || []).find(b => b.id === win.userId);
    if (!bot) return null;
    return renderCard(room, bot.cards[win.cardIndex], win.cardIndex);
  }

  function startLoops(){
    setInterval(() => {
      ROOMS.forEach(r => tickRoom(state.rooms[r.id]));
      renderTick();
    }, 1000);
  }

  function renderTick(){
    updateBalanceUI();
    if (state.view.mode === 'lobby') renderLobby();
    if (state.view.mode === 'room') renderRoomView();
  }

  function updateBalanceUI(){
    if (balanceEl) balanceEl.textContent = `${t('balance')}: ${state.user.balance.toFixed(2)} AZN`;
    // update header button labels per language
    if (topupBtn) topupBtn.textContent = t('topupAZN');
    if (topupTonBtn) topupTonBtn.textContent = t('topupTON');
    if (topupStarsBtn) topupStarsBtn.textContent = t('topupStars');
    if (withdrawBtn) withdrawBtn.textContent = t('withdraw');
    if (overlayClose) overlayClose.textContent = t('ok');
    if (backBtn) backBtn.textContent = t('backToLobby');
    // footer tabs
    if (tabRooms) tabRooms.textContent = t('tabRooms');
    if (tabTasks) tabTasks.textContent = t('tabTasks');
    if (tabReferral) tabReferral.textContent = t('tabReferral');
    if (tabRating) tabRating.textContent = t('tabRating');
    if (tabProfile) tabProfile.textContent = t('tabProfile');
    // update header title based on view
    if (titleEl){
      if (state.view.mode === 'lobby'){ titleEl.textContent = t('titleLobby'); }
      if (state.view.mode === 'room'){ titleEl.textContent = roomDisplayName(state.rooms[state.view.currentRoomId]); }
    }
  }

  function setLang(lang){
    if (!['ru','az','en'].includes(lang)) lang = 'ru';
    state.user.lang = lang;
    document.documentElement.lang = lang;
    updateBalanceUI();
  }

  function tickRoom(room){
    if (room.phase === 'waiting'){
      room.countdown -= 1;
      // simulate bot join counts increasing during waiting based on plan
      if (room.botPlan){
        const progress = Math.min(1, (COUNTDOWN_SECONDS - room.countdown) / COUNTDOWN_SECONDS);
        room.totalPlayers = 1 + Math.floor(room.botPlan.count * progress);
        room.totalPurchases = room.purchases + Math.floor(room.botPlan.purchases * progress);
      }
      if (room.countdown <= 0){
        room.phase = 'running';
        room.nextDrawAt = Date.now();
        room.drawn = [];
        room.winners = [];
        // seed bots for this match using planned numbers
        seedBots(room);
        // ensure sounds resume only when round starts
        unlockAudio();
      }
      return;
    }

    if (room.phase === 'running'){
      if (Date.now() >= (room.nextDrawAt || 0)){
        room.nextDrawAt = Date.now() + DRAW_INTERVAL_MS;
        // draw next number
        const n = drawNext(room.drawn);
        if (n == null){
          room.phase = 'finished';
          room.countdown = 10;
          return;
        }
        room.drawn.push(n);
        playTick();

        // mark cards and check winners (user + bots)
        checkWinners(room);

        if (room.winners.length > 0){
          room.phase = 'finished';
          room.countdown = 10; // short show, then cycle
          // show overlay to everyone with winner name and winning card
          const pot = room.price * room.totalPurchases;
          const prize = Math.floor(pot * 100 * 0.8)/100; // 2 decimals
          const w0 = room.winners[0];
          const winnerName = w0.userId === state.user.id ? state.user.name : (findBotName(room, w0.userId) || 'Player');
          overlayTitle.textContent = `${t('win')} ${winnerName}`;
          overlayPrize.textContent = `${t('prize')}: ${prize.toFixed(2)} AZN`;
          overlayCard.innerHTML = '';
          const cardEl = getWinnerCardElement(room, w0);
          if (cardEl) overlayCard.appendChild(cardEl);
          playWin();
          overlay.style.display = 'flex';
          // stop any ticks immediately after finish to avoid lingering sound
          stopAudioNow();
        }
      }
      return;
    }

    if (room.phase === 'finished'){
      room.countdown -= 1;
      if (room.countdown <= 0){
        resetForNextMatch(room);
      }
      return;
    }
  }

  function checkWinners(room){
    room.winners = [];
    // user cards
    room.cards.forEach((card, idx) => {
      const allHit = card.numbers.every(v => room.drawn.includes(v));
      if (allHit){ room.winners.push({ cardIndex: idx, userId: state.user.id }); }
    });
    // bot cards
    if (room.bots){
      room.bots.forEach((bot) => {
        bot.cards.forEach((card, cidx) => {
          const allHit = card.numbers.every(v => room.drawn.includes(v));
          if (allHit){ room.winners.push({ cardIndex: cidx, userId: bot.id }); }
        });
      });
    }
  }

  // Lobby
  function renderLobby(){
    lobbyEl.innerHTML = '';
    ROOMS.forEach(r => {
      const room = state.rooms[r.id];
      const card = el('div', 'lobby-card');
      const head = el('div', 'lobby-head');
      head.appendChild(el('div', 'title', roomDisplayName(room)));
      head.appendChild(el('div', 'price', `${fmtPriceLabel(room)}`));

      const timer = el('div', 'timer', timerText(room));

      const stats = el('div', 'lobby-stats');
      const players = el('div', '', `${t('players')}: ${room.totalPlayers}`);
      const potVal = room.price * room.totalPurchases;
      const pot = el('div', '', `${t('pool')}: ${potVal.toFixed(2)} AZN`);
      stats.appendChild(players);
      stats.appendChild(pot);
      // no 80% line per requirement

      const go = el('button', 'go-btn', t('enter'));
      go.onclick = () => goRoom(room.id);

      card.appendChild(head);
      card.appendChild(timer);
      card.appendChild(stats);
      card.appendChild(go);
      lobbyEl.appendChild(card);
    });
  }

  function roomPlayerCount(room){
    // demo: single user
    return room.purchases > 0 ? 1 : 1; // always 1 in demo
  }

  // Room view
  function renderRoomView(){
    const room = state.rooms[state.view.currentRoomId];
    roomViewEl.innerHTML = '';

    // status line
    roomViewEl.appendChild(el('div', 'statline', `${roomDisplayName(room)} · ${timerText(room)}`));

    // global stats row: players, pot, prize, remaining stats 3/2/1
    const bar = el('div', 'lobby-stats');
    bar.appendChild(el('div', '', `${t('players')}: ${room.totalPlayers}`));
    const potVal = room.price * room.totalPurchases;
    bar.appendChild(el('div', '', `${t('pool')}: ${potVal.toFixed(2)} AZN`));
    const remain = remainingStats(room);
    bar.appendChild(el('div', '', `${t('expect3')}: ${remain[3]}`));
    bar.appendChild(el('div', '', `${t('expect2')}: ${remain[2]}`));
    bar.appendChild(el('div', '', `${t('expect1')}: ${remain[1]}`));
    roomViewEl.appendChild(bar);

    // buy button (single). Press up to 3 times while waiting
    const actions = el('div', 'actions');
    const btn = el('button', room.phase==='waiting' && room.purchases<3 ? 'primary' : '', buyLabel(room));
    btn.disabled = !(room.phase==='waiting' && room.purchases<3);
    btn.onclick = () => { buyCards(room, 1); renderRoomView(); };
    actions.appendChild(btn);
    actions.appendChild(el('div', 'hint', room.phase==='waiting' ? `Можно купить ещё ${3 - room.purchases} карты` : 'Покупка закрыта'));
    roomViewEl.appendChild(actions);

    // live numbers (no label)
    const live = el('div', 'live');
    room.drawn.slice(-20).forEach(n => live.appendChild(el('div', 'ball', String(n))));
    roomViewEl.appendChild(live);

    // cards
    roomViewEl.appendChild(el('div', '', t('myCards')));
    const cardsWrap = el('div', 'cards');
    room.cards.forEach((card, i) => cardsWrap.appendChild(renderCard(room, card, i)));
    roomViewEl.appendChild(cardsWrap);

    // footer status
    roomViewEl.appendChild(el('div', 'small', statusText(room)));
  }

  function buyLabel(room){
    if (room.purchases===0) return room.price<=0 ? t('getCardFree') : `${t('buyCard')} (${fmtAZN(room.price)} AZN)`;
    if (room.purchases===1) return t('buyMore2');
    if (room.purchases===2) return t('buyMore1');
    return t('limitReached');
  }

  function remainingStats(room){
    // For demo, compute from your cards only
    const res = {3:0,2:0,1:0};
    room.cards.forEach(card => {
      const left = card.numbers.filter(v => !room.drawn.includes(v)).length;
      if (left<=3 && left>=1) res[left] += 1;
    });
    return res;
  }

  function renderCard(room, card, index){
    const cardEl = el('div', 'card');
    const grid = el('div', 'grid');
    for (let r=0; r<3; r++){
      for (let c=0; c<9; c++){
        const v = card.grid[r][c];
        const cell = el('div', 'cell' + (v && room.drawn.includes(v) ? ' hit' : ''), v ? String(v) : '');
        grid.appendChild(cell);
      }
    }
    const isWinner = room.winners.some(w => w.cardIndex === index);
    if (isWinner){ cardEl.appendChild(el('div', 'win', 'Победа!')); }
    cardEl.appendChild(grid);
    return cardEl;
  }

  function timerText(room){
    if (room.phase === 'waiting') return `${t('waiting')} ${fmtSeconds(room.countdown)}`;
    if (room.phase === 'running') return `${t('running')} (${room.drawn.length}/90)`;
    if (room.phase === 'finished') return `${t('finished')} ${fmtSeconds(room.countdown)}`;
    return '';
  }

  function statusText(room){
    if (room.phase === 'waiting') return room.price<=0
      ? `${t('openPurchaseFree')} ${t('youTook')} ${room.purchases} ${t('of3')}`
      : `${t('openPurchasePrice')}: ${fmtAZN(room.price)} ${t('pricePerCard')} ${t('youBought')} ${room.purchases} ${t('of3')}`;
    if (room.phase === 'running') return `${t('running')}. ${t('closed')}`;
    if (room.phase === 'finished'){
      const pot = room.price * room.totalPurchases;
      const prize = Math.floor(pot * 100 * 0.8)/100; // keep computation, hide 80% wording
      if (room.winners.length === 0) return '';
      const each = Math.floor((prize / room.winners.length) * 100)/100;
      return `${t('players')}: ${room.totalPlayers}. ${t('pool')}: ${pot.toFixed(2)} AZN. ${t('prize')}: ${prize.toFixed(2)} AZN.`;
    }
    return '';
  }

  function fmtSeconds(s){
    const m = Math.floor(s/60); const r = s % 60;
    return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  }

  // Draw next unique number 1..90
  function drawNext(drawn){
    if (!Array.isArray(drawn)) return null;
    if (drawn.length >= 90) return null;
    // fast path: compute remaining, choose random index
    const present = new Set(drawn);
    const remaining = [];
    for (let i=1;i<=90;i++) if (!present.has(i)) remaining.push(i);
    if (remaining.length === 0) return null;
    const idx = Math.floor(Math.random() * remaining.length);
    return remaining[idx];
  }

  function buyCards(room, n){
    const can = room.phase === 'waiting' && (room.purchases + n) <= 3;
    if (!can) return;
    unlockAudio();
    const totalCost = room.price * n;
    if (room.price > 0 && state.user.balance < totalCost){
      alert('Недостаточно средств. Пополните баланс.');
      return;
    }
    for (let i=0; i<n; i++){
      const card = generateLotoCard();
      room.cards.push(card);
    }
    room.purchases += n;
    room.totalPurchases += n; // demo aggregation equals local
    if (room.price > 0){
      state.user.balance = Math.max(0, +(state.user.balance - totalCost).toFixed(2));
    }
    updateBalanceUI();
  }

  async function topupFlow(){
    const val = prompt('Введите сумму пополнения (AZN):', '1.00');
    if (!val) return;
    const num = Number(val.replace(',', '.'));
    if (!isFinite(num) || num <= 0) { alert('Неверная сумма'); return; }
    try{
      const res = await fetch('/api/topup-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountAZN: num })
      });
      const data = await res.json();
      if (!data.ok){
        alert('Ошибка создания инвойса: ' + (data.error || 'unknown'));
        return;
      }
      // In Telegram, we would call Telegram.WebApp.openInvoice(data.invoice_link)
      // For demo, immediately credit as if payment succeeded
      state.user.balance = +(state.user.balance + num).toFixed(2);
      updateBalanceUI();
      alert(`Баланс пополнен на ${num.toFixed(2)} AZN (демо)`);
    }catch(e){
      alert('Сбой запроса топ-апа');
    }
  }

  // Card generation: standard 3x9 ticket
  // - Exactly 5 numbers per row (total 15)
  // - Per column 0–3 numbers
  // - Column ranges: [1–9],[10–19],...,[80–90]
  // - Numbers in each column ascend top→bottom
  function generateLotoCard(){
    // 1) Choose 5 unique columns per row (respect column capacity ≤3)
    const colCounts = Array(9).fill(0);
    const rowCols = [];
    for (let r=0; r<3; r++){
      rowCols[r] = pickRowColumns(colCounts, 5);
      // increase counts
      rowCols[r].forEach(c => colCounts[c]++);
    }

    // 2) For each column, pick the required count of numbers within its range
    const colRanges = [
      [1,9],[10,19],[20,29],[30,39],[40,49],[50,59],[60,69],[70,79],[80,90]
    ];
    const colValues = Array.from({length:9}, ()=>[]);
    for (let c=0; c<9; c++){
      const need = colCounts[c];
      if (need === 0) continue;
      const [lo,hi] = colRanges[c];
      const values = pickUnique(need, lo, hi).sort((a,b)=>a-b);
      colValues[c] = values;
    }

    // 3) Place numbers into grid according to selected row columns, ascending top→bottom
    const grid = Array.from({length:3}, () => Array(9).fill(null));
    const takeIdx = Array(9).fill(0);
    for (let r=0; r<3; r++){
      const cols = rowCols[r].slice().sort((a,b)=>a-b);
      for (const c of cols){
        const idx = takeIdx[c];
        const val = colValues[c][idx];
        grid[r][c] = val;
        takeIdx[c] = idx + 1;
      }
    }

    const allNums = grid.flat().filter(Boolean);
    return { grid, numbers: allNums };
  }

  function chooseRow(rowCounts){
    const options = [0,1,2].filter(r => rowCounts[r] < 5);
    if (options.length === 0) return -1;
    options.sort((a,b) => rowCounts[a] - rowCounts[b]);
    return options[0];
  }

  function pickRowColumns(colCounts, k){
    // Pick k distinct columns (0..8) such that each column used ≤3 in total
    // Simple heuristic: shuffle columns, pick first k with capacity
    const cols = [...Array(9).keys()];
    shuffle(cols);
    const picked = [];
    for (const c of cols){
      if (colCounts[c] < 3){
        picked.push(c);
        if (picked.length === k) break;
      }
    }
    // As capacity total is large (27) and we need 15 cells, this should always succeed
    if (picked.length !== k){
      // Fallback: fill from any columns (should not happen)
      const rest = [...Array(9).keys()].filter(c=>!picked.includes(c));
      while (picked.length<k && rest.length){ picked.push(rest.shift()); }
    }
    return picked.sort((a,b)=>a-b);
  }

  function shuffle(a){
    for (let i=a.length-1; i>0; i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  function spreadIndices(n, k){
    const step = n / k; const res = [];
    for (let i=0; i<k; i++){ res.push(Math.min(n-1, Math.round(i*step + step/2 - 1))); }
    const set = new Set(res);
    while (set.size < k){ set.add(Math.floor(Math.random()*n)); }
    return Array.from(set).sort((a,b)=>a-b);
  }

  function pickUnique(k, min, max){
    const set = new Set();
    while (set.size < k){ set.add(Math.floor(Math.random()*(max - min + 1)) + min); }
    return Array.from(set);
  }

  function el(tag, cls, txt){
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }

  function fmtAZN(v){
    return Number(v).toFixed(2);
  }

  function fmtPriceLabel(room){
    return room.price<=0 ? t('free') : `${fmtAZN(room.price)} ${t('pricePerCard')}`;
  }
})();
