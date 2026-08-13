const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ============================================================
// IN-MEMORY DATABASE (Replace with PostgreSQL in production)
// ============================================================
const DB = {
  users: [
    { id: 'usr-001', name: 'Chisom Adeyemi', phone: '08012345678', email: 'chisom@email.com', lga: 'Ikeja', address: 'Allen Avenue, Ikeja', psp_id: 'psp-001', wallet_balance: 7243, plan: 'standard', password: 'hashed', role: 'resident', created_at: new Date().toISOString() },
    { id: 'usr-002', name: 'Emeka Obi', phone: '08087654321', email: 'emeka@email.com', lga: 'Agege', address: 'Agege Motor Road', psp_id: 'psp-002', wallet_balance: 3100, plan: 'basic', password: 'hashed', role: 'resident', created_at: new Date().toISOString() },
  ],
  psps: [
    { id: 'psp-001', name: 'AkiClean Services', contact: '08060502237', lga: 'Ikeja', area: 'Ikeja / Ogba', rating: 4.5, price_basic: 500, price_standard: 1500, price_premium: 2500, trucks: 5, status: 'active', collections_this_month: 124 },
    { id: 'psp-002', name: 'GreenLagos PSP', contact: '08034567890', lga: 'Agege', area: 'Agege / Ikeja', rating: 4.2, price_basic: 500, price_standard: 1200, price_premium: 2200, trucks: 3, status: 'active', collections_this_month: 89 },
    { id: 'psp-003', name: 'CleanCity Operators', contact: '08023456789', lga: 'Ojodu', area: 'Ojodu / Maryland', rating: 3.8, price_basic: 500, price_standard: 1000, price_premium: 2000, trucks: 2, status: 'active', collections_this_month: 56 },
  ],
  collections: [
    { id: 'col-001', user_id: 'usr-001', psp_id: 'psp-001', scheduled_date: '2026-08-13', time_slot: '08:00 AM', status: 'scheduled', created_at: new Date().toISOString() },
    { id: 'col-002', user_id: 'usr-001', psp_id: 'psp-001', scheduled_date: '2026-08-08', time_slot: '08:00 AM', status: 'completed', rating: 5, created_at: new Date().toISOString() },
    { id: 'col-003', user_id: 'usr-001', psp_id: 'psp-001', scheduled_date: '2026-08-01', time_slot: '11:00 AM', status: 'completed', rating: 4, created_at: new Date().toISOString() },
    { id: 'col-004', user_id: 'usr-001', psp_id: 'psp-001', scheduled_date: '2026-07-25', time_slot: '08:00 AM', status: 'missed', created_at: new Date().toISOString() },
  ],
  sort_logs: [
    { id: 'srt-001', user_id: 'usr-001', plastic_kg: 2.3, organic_kg: 1.1, general_kg: 0.5, earnings: 183, status: 'verified', psp_id: 'psp-001', created_at: new Date().toISOString() },
    { id: 'srt-002', user_id: 'usr-001', plastic_kg: 1.8, organic_kg: 0.9, general_kg: 0.3, earnings: 144, status: 'verified', psp_id: 'psp-001', created_at: new Date().toISOString() },
  ],
  reports: [
    { id: 'rpt-001', user_id: 'usr-001', type: 'Illegal dumping on roadside', location: 'Allen Avenue, Ikeja', lat: 6.5965, lng: 3.3510, description: 'Large pile of waste dumped overnight', status: 'under_review', reward: 0, fine_amount: 0, created_at: new Date().toISOString() },
    { id: 'rpt-002', user_id: 'usr-001', type: 'Open burning of waste', location: 'Ogba Market Road', lat: 6.6225, lng: 3.3467, description: 'Market traders burning waste openly', status: 'verified', reward: 8500, fine_amount: 85000, created_at: new Date().toISOString() },
    { id: 'rpt-003', user_id: 'usr-002', type: 'Dumping in drainage channel', location: 'Agege Motor Road', lat: 6.6290, lng: 3.3195, description: 'Waste blocking major drainage channel', status: 'pending', reward: 0, fine_amount: 0, created_at: new Date().toISOString() },
    { id: 'rpt-004', user_id: 'usr-001', type: 'Illegal dumping on roadside', location: 'Oregun Road, Ikeja', lat: 6.5978, lng: 3.3621, description: 'Bags of refuse dumped at roadside', status: 'prosecuted', reward: 15000, fine_amount: 150000, created_at: new Date().toISOString() },
  ],
  transactions: [
    { id: 'txn-001', user_id: 'usr-001', type: 'sortpay', description: 'SortPay — Plastic (2.3kg)', amount: 161, created_at: new Date().toISOString() },
    { id: 'txn-002', user_id: 'usr-001', type: 'whistleblower', description: 'WhistleBlower Reward', amount: 8500, created_at: new Date().toISOString() },
    { id: 'txn-003', user_id: 'usr-001', type: 'subscription', description: 'Monthly Subscription', amount: -1500, created_at: new Date().toISOString() },
    { id: 'txn-004', user_id: 'usr-001', type: 'sortpay', description: 'SortPay — Organic (4.1kg)', amount: 82, created_at: new Date().toISOString() },
  ],
  dumpsites: [
    { id: 'dmp-001', name: 'Olusosun Landfill', lga: 'Ojota', capacity_pct: 78, lat: 6.5729, lng: 3.3925, status: 'active', type: 'landfill' },
    { id: 'dmp-002', name: 'Abule Egba Dumpsite', lga: 'Abule Egba', capacity_pct: 45, lat: 6.6350, lng: 3.2620, status: 'active', type: 'transfer_station' },
    { id: 'dmp-003', name: 'Ikeja Collection Hub', lga: 'Ikeja', capacity_pct: 30, lat: 6.5963, lng: 3.3362, status: 'active', type: 'hub' },
  ],
  hotspots: [
    { id: 'hot-001', location: 'Agege Market Road', lga: 'Agege', lat: 6.6290, lng: 3.3195, report_count: 12, level: 'high', last_reported: new Date().toISOString() },
    { id: 'hot-002', location: 'Ikeja Bus Stop Drainage', lga: 'Ikeja', lat: 6.5963, lng: 3.3362, report_count: 7, level: 'medium', last_reported: new Date().toISOString() },
    { id: 'hot-003', location: 'Ogba Junction', lga: 'Ogba', lat: 6.6225, lng: 3.3467, report_count: 4, level: 'low', last_reported: new Date().toISOString() },
  ],
  enforcement_officers: [
    { id: 'off-001', name: 'Officer Bello', badge: 'LW-2024-001', lga: 'Ikeja', status: 'active' },
    { id: 'off-002', name: 'Officer Nwosu', badge: 'LW-2024-002', lga: 'Agege', status: 'active' },
  ],
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
const success = (res, data, msg = 'Success', code = 200) => res.status(code).json({ status: 'success', message: msg, data });
const error = (res, msg = 'Error', code = 400) => res.status(code).json({ status: 'error', message: msg });
const paginate = (arr, page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  return { data: arr.slice(start, start + limit), total: arr.length, page: +page, pages: Math.ceil(arr.length / limit) };
};

// ============================================================
// ROOT
// ============================================================
app.get('/', (req, res) => {
  success(res, {
    name: 'WasteFirst API',
    version: '1.0.0',
    description: 'Lagos waste management platform API',
    endpoints: {
      auth: ['POST /api/auth/register', 'POST /api/auth/login'],
      users: ['GET /api/users/:id', 'PUT /api/users/:id', 'GET /api/users/:id/wallet'],
      collections: ['GET /api/collections', 'POST /api/collections', 'PUT /api/collections/:id/rate'],
      sort: ['GET /api/sort', 'POST /api/sort'],
      reports: ['GET /api/reports', 'POST /api/reports', 'PUT /api/reports/:id/status'],
      psps: ['GET /api/psps', 'GET /api/psps/:id', 'PUT /api/psps/:id/connect'],
      map: ['GET /api/map/dumpsites', 'GET /api/map/hotspots', 'GET /api/map/psps'],
      wallet: ['GET /api/wallet/:userId', 'POST /api/wallet/withdraw', 'GET /api/wallet/:userId/transactions'],
      lawma: ['GET /api/lawma/dashboard', 'GET /api/lawma/reports', 'PUT /api/lawma/reports/:id', 'GET /api/lawma/psps', 'GET /api/lawma/analytics'],
      ussd: ['POST /api/ussd'],
    }
  }, 'WasteFirst API is running');
});

// ============================================================
// AUTH ROUTES
// ============================================================
app.post('/api/auth/register', (req, res) => {
  const { name, phone, email, address, lga, plan = 'basic' } = req.body;
  if (!name || !phone || !email) return error(res, 'Name, phone, and email are required');
  const existing = DB.users.find(u => u.phone === phone || u.email === email);
  if (existing) return error(res, 'User with this phone or email already exists');
  const user = { id: `usr-${uuidv4().slice(0, 6)}`, name, phone, email, address, lga, psp_id: null, wallet_balance: 0, plan, role: 'resident', created_at: new Date().toISOString() };
  DB.users.push(user);
  success(res, { user: { ...user, password: undefined }, token: `wf-token-${uuidv4()}` }, 'Registration successful', 201);
});

app.post('/api/auth/login', (req, res) => {
  const { phone, email } = req.body;
  const user = DB.users.find(u => u.phone === phone || u.email === email);
  if (!user) return error(res, 'User not found', 404);
  success(res, { user: { ...user, password: undefined }, token: `wf-token-${uuidv4()}` }, 'Login successful');
});

// ============================================================
// USER ROUTES
// ============================================================
app.get('/api/users/:id', (req, res) => {
  const user = DB.users.find(u => u.id === req.params.id);
  if (!user) return error(res, 'User not found', 404);
  success(res, { ...user, password: undefined });
});

app.put('/api/users/:id', (req, res) => {
  const idx = DB.users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return error(res, 'User not found', 404);
  DB.users[idx] = { ...DB.users[idx], ...req.body, id: req.params.id };
  success(res, { ...DB.users[idx], password: undefined }, 'User updated');
});

// ============================================================
// COLLECTION ROUTES
// ============================================================
app.get('/api/collections', (req, res) => {
  const { user_id, psp_id, status, page = 1, limit = 10 } = req.query;
  let results = [...DB.collections];
  if (user_id) results = results.filter(c => c.user_id === user_id);
  if (psp_id) results = results.filter(c => c.psp_id === psp_id);
  if (status) results = results.filter(c => c.status === status);
  results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  success(res, paginate(results, page, limit));
});

app.post('/api/collections', (req, res) => {
  const { user_id, psp_id, scheduled_date, time_slot } = req.body;
  if (!user_id || !psp_id || !scheduled_date || !time_slot) return error(res, 'user_id, psp_id, scheduled_date, and time_slot are required');
  const collection = { id: `col-${uuidv4().slice(0, 6)}`, user_id, psp_id, scheduled_date, time_slot, status: 'scheduled', created_at: new Date().toISOString() };
  DB.collections.push(collection);
  success(res, collection, 'Pickup scheduled successfully', 201);
});

app.put('/api/collections/:id/status', (req, res) => {
  const idx = DB.collections.findIndex(c => c.id === req.params.id);
  if (idx === -1) return error(res, 'Collection not found', 404);
  DB.collections[idx].status = req.body.status;
  success(res, DB.collections[idx], 'Collection status updated');
});

app.put('/api/collections/:id/rate', (req, res) => {
  const idx = DB.collections.findIndex(c => c.id === req.params.id);
  if (idx === -1) return error(res, 'Collection not found', 404);
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) return error(res, 'Rating must be between 1 and 5');
  DB.collections[idx].rating = rating;
  DB.collections[idx].status = 'completed';
  success(res, DB.collections[idx], 'Collection rated');
});

// ============================================================
// SORT PAY ROUTES
// ============================================================
app.get('/api/sort', (req, res) => {
  const { user_id } = req.query;
  let logs = user_id ? DB.sort_logs.filter(s => s.user_id === user_id) : DB.sort_logs;
  const total_earned = logs.reduce((sum, l) => sum + l.earnings, 0);
  const total_kg = logs.reduce((sum, l) => sum + l.plastic_kg + l.organic_kg, 0);
  success(res, { logs, summary: { total_earned, total_kg: parseFloat(total_kg.toFixed(2)), total_sortings: logs.length } });
});

app.post('/api/sort', (req, res) => {
  const { user_id, psp_id, plastic_kg = 0, organic_kg = 0, general_kg = 0 } = req.body;
  if (!user_id || !psp_id) return error(res, 'user_id and psp_id are required');
  const earnings = Math.round((plastic_kg * 70) + (organic_kg * 20));
  const log = { id: `srt-${uuidv4().slice(0, 6)}`, user_id, psp_id, plastic_kg, organic_kg, general_kg, earnings, status: 'pending_verification', created_at: new Date().toISOString() };
  DB.sort_logs.push(log);
  const userIdx = DB.users.findIndex(u => u.id === user_id);
  if (userIdx !== -1) DB.users[userIdx].wallet_balance += earnings;
  const txn = { id: `txn-${uuidv4().slice(0, 6)}`, user_id, type: 'sortpay', description: `SortPay — Plastic ${plastic_kg}kg + Organic ${organic_kg}kg`, amount: earnings, created_at: new Date().toISOString() };
  DB.transactions.push(txn);
  success(res, { log, earnings, message: `₦${earnings} will be credited after PSP verification` }, 'Sort log submitted', 201);
});

app.put('/api/sort/:id/verify', (req, res) => {
  const idx = DB.sort_logs.findIndex(s => s.id === req.params.id);
  if (idx === -1) return error(res, 'Sort log not found', 404);
  DB.sort_logs[idx].status = req.body.status === 'verified' ? 'verified' : 'rejected';
  success(res, DB.sort_logs[idx], `Sort log ${DB.sort_logs[idx].status}`);
});

// ============================================================
// WHISTLEBLOWER REPORT ROUTES
// ============================================================
app.get('/api/reports', (req, res) => {
  const { user_id, status, lga, page = 1, limit = 10 } = req.query;
  let results = [...DB.reports];
  if (user_id) results = results.filter(r => r.user_id === user_id);
  if (status) results = results.filter(r => r.status === status);
  results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  success(res, paginate(results, page, limit));
});

app.post('/api/reports', (req, res) => {
  const { user_id, type, location, lat, lng, description, photo_url } = req.body;
  if (!user_id || !type || !location || !description) return error(res, 'user_id, type, location, and description are required');
  const report = { id: `rpt-${uuidv4().slice(0, 6)}`, user_id, type, location, lat, lng, description, photo_url, status: 'pending', reward: 0, fine_amount: 0, created_at: new Date().toISOString() };
  DB.reports.push(report);
  const hotspot = DB.hotspots.find(h => h.location.includes(location.split(',')[1]?.trim() || location));
  if (hotspot) hotspot.report_count++;
  else DB.hotspots.push({ id: `hot-${uuidv4().slice(0, 6)}`, location, lat, lng, report_count: 1, level: 'low', last_reported: new Date().toISOString() });
  success(res, report, 'Report submitted successfully. Our team will review within 24 hours.', 201);
});

app.put('/api/reports/:id/status', (req, res) => {
  const idx = DB.reports.findIndex(r => r.id === req.params.id);
  if (idx === -1) return error(res, 'Report not found', 404);
  const { status, fine_amount, officer_id, notes } = req.body;
  DB.reports[idx].status = status;
  DB.reports[idx].notes = notes;
  DB.reports[idx].officer_id = officer_id;
  if (fine_amount) {
    DB.reports[idx].fine_amount = fine_amount;
    const platform_share = Math.round(fine_amount * 0.20);
    const reporter_reward = Math.round(fine_amount * 0.10);
    DB.reports[idx].reward = reporter_reward;
    const userIdx = DB.users.findIndex(u => u.id === DB.reports[idx].user_id);
    if (userIdx !== -1 && status === 'prosecuted') {
      DB.users[userIdx].wallet_balance += reporter_reward;
      DB.transactions.push({ id: `txn-${uuidv4().slice(0, 6)}`, user_id: DB.reports[idx].user_id, type: 'whistleblower', description: 'WhistleBlower Reward', amount: reporter_reward, created_at: new Date().toISOString() });
    }
  }
  success(res, DB.reports[idx], 'Report status updated');
});

// ============================================================
// PSP ROUTES
// ============================================================
app.get('/api/psps', (req, res) => {
  const { lga, status } = req.query;
  let results = [...DB.psps];
  if (lga) results = results.filter(p => p.lga.toLowerCase() === lga.toLowerCase());
  if (status) results = results.filter(p => p.status === status);
  success(res, results);
});

app.get('/api/psps/:id', (req, res) => {
  const psp = DB.psps.find(p => p.id === req.params.id);
  if (!psp) return error(res, 'PSP not found', 404);
  const collections = DB.collections.filter(c => c.psp_id === req.params.id);
  const completed = collections.filter(c => c.status === 'completed').length;
  const missed = collections.filter(c => c.status === 'missed').length;
  success(res, { ...psp, stats: { total_collections: collections.length, completed, missed, completion_rate: collections.length ? Math.round((completed / collections.length) * 100) : 0 } });
});

app.put('/api/psps/:id/connect', (req, res) => {
  const { user_id } = req.body;
  const psp = DB.psps.find(p => p.id === req.params.id);
  if (!psp) return error(res, 'PSP not found', 404);
  const userIdx = DB.users.findIndex(u => u.id === user_id);
  if (userIdx === -1) return error(res, 'User not found', 404);
  DB.users[userIdx].psp_id = req.params.id;
  success(res, { user: DB.users[userIdx], psp }, `Connected to ${psp.name} successfully`);
});

// ============================================================
// MAP ROUTES
// ============================================================
app.get('/api/map/dumpsites', (req, res) => success(res, DB.dumpsites));
app.get('/api/map/hotspots', (req, res) => {
  const sorted = [...DB.hotspots].sort((a, b) => b.report_count - a.report_count);
  success(res, sorted);
});
app.get('/api/map/psps', (req, res) => {
  const { lat, lng } = req.query;
  success(res, DB.psps.map(p => ({ ...p, distance_km: lat && lng ? (Math.random() * 5 + 0.5).toFixed(1) : null })));
});

// ============================================================
// WALLET ROUTES
// ============================================================
app.get('/api/wallet/:userId', (req, res) => {
  const user = DB.users.find(u => u.id === req.params.userId);
  if (!user) return error(res, 'User not found', 404);
  const txns = DB.transactions.filter(t => t.user_id === req.params.userId);
  const earned = txns.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  success(res, { balance: user.wallet_balance, total_earned: earned, transactions: txns.slice(0, 5) });
});

app.post('/api/wallet/withdraw', (req, res) => {
  const { user_id, amount, method } = req.body;
  const userIdx = DB.users.findIndex(u => u.id === user_id);
  if (userIdx === -1) return error(res, 'User not found', 404);
  if (DB.users[userIdx].wallet_balance < amount) return error(res, 'Insufficient balance');
  DB.users[userIdx].wallet_balance -= amount;
  DB.transactions.push({ id: `txn-${uuidv4().slice(0, 6)}`, user_id, type: 'withdrawal', description: `Withdrawal via ${method}`, amount: -amount, created_at: new Date().toISOString() });
  success(res, { new_balance: DB.users[userIdx].wallet_balance }, `₦${amount} withdrawal initiated`);
});

app.get('/api/wallet/:userId/transactions', (req, res) => {
  const txns = DB.transactions.filter(t => t.user_id === req.params.userId);
  success(res, txns.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

// ============================================================
// LAWMA DASHBOARD ROUTES
// ============================================================
app.get('/api/lawma/dashboard', (req, res) => {
  const totalReports = DB.reports.length;
  const pendingReports = DB.reports.filter(r => r.status === 'pending').length;
  const verifiedReports = DB.reports.filter(r => r.status === 'verified').length;
  const prosecutedReports = DB.reports.filter(r => r.status === 'prosecuted').length;
  const totalFines = DB.reports.reduce((s, r) => s + r.fine_amount, 0);
  const totalRewards = DB.reports.reduce((s, r) => s + r.reward, 0);
  const totalCollections = DB.collections.length;
  const completedCollections = DB.collections.filter(c => c.status === 'completed').length;
  const missedCollections = DB.collections.filter(c => c.status === 'missed').length;
  const totalWaste = DB.sort_logs.reduce((s, l) => s + l.plastic_kg + l.organic_kg + l.general_kg, 0);
  const totalSortings = DB.sort_logs.length;
  const activePSPs = DB.psps.filter(p => p.status === 'active').length;
  const activeResidents = DB.users.filter(u => u.role === 'resident').length;
  success(res, {
    overview: { total_residents: activeResidents, active_psps: activePSPs, collections_this_month: totalCollections, waste_diverted_kg: parseFloat(totalWaste.toFixed(2)) },
    reports: { total: totalReports, pending: pendingReports, verified: verifiedReports, prosecuted: prosecutedReports, total_fines: totalFines, total_rewards: totalRewards },
    collections: { total: totalCollections, completed: completedCollections, missed: missedCollections, completion_rate: totalCollections ? Math.round((completedCollections / totalCollections) * 100) : 0 },
    sort: { total_sortings: totalSortings, total_kg: parseFloat(totalWaste.toFixed(2)) },
    hotspots: DB.hotspots.sort((a, b) => b.report_count - a.report_count).slice(0, 5),
    psp_performance: DB.psps.map(p => ({ ...p, collections: DB.collections.filter(c => c.psp_id === p.id).length })),
  });
});

app.get('/api/lawma/reports', (req, res) => {
  const { status, lga, page = 1, limit = 20 } = req.query;
  let results = [...DB.reports];
  if (status) results = results.filter(r => r.status === status);
  results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const enriched = results.map(r => ({ ...r, reporter: DB.users.find(u => u.id === r.user_id)?.name || 'Anonymous' }));
  success(res, paginate(enriched, page, limit));
});

app.get('/api/lawma/psps', (req, res) => {
  const enriched = DB.psps.map(p => {
    const cols = DB.collections.filter(c => c.psp_id === p.id);
    return { ...p, total_collections: cols.length, completed: cols.filter(c => c.status === 'completed').length, missed: cols.filter(c => c.status === 'missed').length, registered_households: DB.users.filter(u => u.psp_id === p.id).length };
  });
  success(res, enriched);
});

app.get('/api/lawma/analytics', (req, res) => {
  const monthly = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i));
    return { month: d.toLocaleString('default', { month: 'short' }), collections: Math.floor(Math.random() * 200 + 50), reports: Math.floor(Math.random() * 30 + 5), waste_kg: Math.floor(Math.random() * 5000 + 1000), fines: Math.floor(Math.random() * 500000 + 50000) };
  });
  success(res, { monthly_trends: monthly, lga_breakdown: ['Ikeja', 'Agege', 'Ojodu', 'Ogba', 'Maryland'].map(lga => ({ lga, collections: Math.floor(Math.random() * 100 + 20), reports: Math.floor(Math.random() * 20 + 2), compliance_rate: Math.floor(Math.random() * 40 + 50) })) });
});

// ============================================================
// USSD HANDLER
// ============================================================
app.post('/api/ussd', (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';
  const inputs = text ? text.split('*') : [];
  const level = inputs.length;
  if (text === '' || text === undefined) {
    response = `CON Welcome to WasteFirst\n*483*1#\n\n1. Schedule Pickup\n2. SortPay Balance\n3. Report Illegal Dump\n4. Find PSP Near Me\n5. Pay Subscription\n0. Exit`;
  } else if (inputs[0] === '1' && level === 1) {
    response = `CON Schedule Pickup\n\nAvailable slots:\n1. Tomorrow 8:00 AM\n2. Tomorrow 11:00 AM\n3. Tomorrow 2:00 PM\n4. Thursday 8:00 AM\n\n0. Back`;
  } else if (inputs[0] === '1' && level === 2) {
    const slots = { '1': 'Tomorrow 8:00 AM', '2': 'Tomorrow 11:00 AM', '3': 'Tomorrow 2:00 PM', '4': 'Thursday 8:00 AM' };
    const slot = slots[inputs[1]] || 'Selected slot';
    response = `END Pickup Scheduled!\n\nTime: ${slot}\nPSP: AkiClean Services\n\nYou'll receive an SMS\nalert 1 hour before arrival.\n\nRef: WF-${Date.now().toString().slice(-6)}`;
  } else if (inputs[0] === '2') {
    const user = DB.users.find(u => u.phone === phoneNumber) || DB.users[0];
    response = `END SortPay Balance\n\nWallet: ₦${user?.wallet_balance || 0}\nThis month: ₦1,243\nTotal sortings: ${DB.sort_logs.filter(s => s.user_id === user?.id).length}\n\nDial *483*1# to withdraw`;
  } else if (inputs[0] === '3' && level === 1) {
    response = `CON Report Illegal Dump\n\nEnter location:\n(Street name, LGA)\n\nExample:\nAllen Ave, Ikeja\n\n0. Back`;
  } else if (inputs[0] === '3' && level === 2) {
    response = `END Report Submitted!\n\nLocation: ${inputs[1]}\nRef: WF-RPT-${Date.now().toString().slice(-6)}\n\nLAWMA will investigate\nwithin 24 hours.\n\nReward: Up to ₦50,000`;
  } else if (inputs[0] === '4') {
    response = `END PSPs Near You\n\n1. AkiClean Services\n   ₦1,500/mo | ⭐4.5\n   Call: 08060502237\n\n2. GreenLagos PSP\n   ₦1,200/mo | ⭐4.2\n   Call: 08034567890\n\n3. CleanCity\n   ₦1,000/mo | ⭐3.8\n   Call: 08023456789`;
  } else if (inputs[0] === '5' && level === 1) {
    response = `CON Pay Subscription\n\nCurrent plan: Standard\nAmount due: ₦1,500\nDue date: Sep 1, 2026\n\n1. Pay with airtime\n2. Pay with bank transfer\n3. Cancel\n\n0. Back`;
  } else if (inputs[0] === '5' && inputs[1] === '1') {
    response = `END Payment Successful!\n\nAmount: ₦1,500\nMethod: Airtime deduction\nPlan: Standard (30 days)\n\nRef: WF-PAY-${Date.now().toString().slice(-6)}\nThank you!`;
  } else if (inputs[0] === '0') {
    response = `END Thank you for using WasteFirst!\n\nKeep Lagos clean.\nDial *483*1# anytime.`;
  } else {
    response = `CON Invalid option.\n\nPlease try again.\n\n0. Back to main menu`;
  }
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

// ============================================================
// ERROR HANDLING
// ============================================================
app.use((req, res) => error(res, `Route ${req.method} ${req.url} not found`, 404));
app.use((err, req, res, next) => { console.error(err); error(res, 'Internal server error', 500); });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`\n🟢 WasteFirst API running on http://localhost:${PORT}\n📖 Docs: http://localhost:${PORT}/\n`));

module.exports = app;
