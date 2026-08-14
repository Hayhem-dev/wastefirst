// WasteFirst API Configuration
// Switches automatically between local dev and production

const BASE_URL = import.meta.env.VITE_API_URL || 'https://wastefirst.onrender.com/api';

const api = {
  base: BASE_URL,

  // Auth
  register: (data) => fetch(`${BASE_URL}/auth/register`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  login: (data) => fetch(`${BASE_URL}/auth/login`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  // Collections
  getCollections: (userId) =>
    fetch(`${BASE_URL}/collections?user_id=${userId}`).then(r => r.json()),

  scheduleCollection: (data) => fetch(`${BASE_URL}/collections`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  rateCollection: (id, rating) => fetch(`${BASE_URL}/collections/${id}/rate`, {
    method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({rating})
  }).then(r => r.json()),

  // SortPay
  getSortLogs: (userId) =>
    fetch(`${BASE_URL}/sort?user_id=${userId}`).then(r => r.json()),

  submitSort: (data) => fetch(`${BASE_URL}/sort`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  // WhistleBlower Reports
  getReports: (userId) =>
    fetch(`${BASE_URL}/reports?user_id=${userId}`).then(r => r.json()),

  submitReport: (data) => fetch(`${BASE_URL}/reports`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  // PSPs
  getPsps: (lga) =>
    fetch(`${BASE_URL}/psps${lga ? '?lga='+lga : ''}`).then(r => r.json()),

  getPsp: (id) =>
    fetch(`${BASE_URL}/psps/${id}`).then(r => r.json()),

  connectPsp: (pspId, userId) => fetch(`${BASE_URL}/psps/${pspId}/connect`, {
    method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({user_id: userId})
  }).then(r => r.json()),

  // Map
  getDumpsites: () =>
    fetch(`${BASE_URL}/map/dumpsites`).then(r => r.json()),

  getHotspots: () =>
    fetch(`${BASE_URL}/map/hotspots`).then(r => r.json()),

  getNearbyPsps: (lat, lng) =>
    fetch(`${BASE_URL}/map/psps?lat=${lat}&lng=${lng}`).then(r => r.json()),

  // Wallet
  getWallet: (userId) =>
    fetch(`${BASE_URL}/wallet/${userId}`).then(r => r.json()),

  withdraw: (data) => fetch(`${BASE_URL}/wallet/withdraw`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  getTransactions: (userId) =>
    fetch(`${BASE_URL}/wallet/${userId}/transactions`).then(r => r.json()),

  // LAWMA Dashboard
  getLawmaDashboard: () =>
    fetch(`${BASE_URL}/lawma/dashboard`).then(r => r.json()),

  getLawmaReports: (status) =>
    fetch(`${BASE_URL}/lawma/reports${status ? '?status='+status : ''}`).then(r => r.json()),

  updateReportStatus: (id, data) => fetch(`${BASE_URL}/lawma/reports/${id}`, {
    method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  }).then(r => r.json()),

  getLawmaPsps: () =>
    fetch(`${BASE_URL}/lawma/psps`).then(r => r.json()),

  getLawmaAnalytics: () =>
    fetch(`${BASE_URL}/lawma/analytics`).then(r => r.json()),
};

export default api;
