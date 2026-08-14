import { useState } from "react";

const COLORS = {
  primary: "#1B6B3A",
  primaryLight: "#2D8A4E",
  primaryDark: "#0F4023",
  accent: "#F5A623",
  accentLight: "#FDB94A",
  danger: "#E53935",
  surface: "#F7FAF8",
  card: "#FFFFFF",
  border: "#DCE8E0",
  textPrimary: "#0F2419",
  textSecondary: "#4A6355",
  textMuted: "#8AA698",
  success: "#2D8A4E",
  warning: "#F5A623",
};

const styles = {
  app: { fontFamily: "'Inter', sans-serif", background: COLORS.surface, minHeight: "100vh", maxWidth: 420, margin: "0 auto", position: "relative", overflow: "hidden" },
  header: { background: COLORS.primaryDark, padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" },
  logoAccent: { color: COLORS.accent },
  headerTag: { fontSize: 10, fontWeight: 700, color: COLORS.accentLight, background: "rgba(255,255,255,0.1)", padding: "3px 8px", borderRadius: 20, marginLeft: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  avatar: { width: 34, height: 34, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 },
  content: { padding: "0 0 80px" },
  heroCard: { background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`, margin: "16px", borderRadius: 16, padding: "20px", color: "#fff", position: "relative", overflow: "hidden" },
  heroOverlay: { position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" },
  heroTitle: { fontSize: 13, opacity: 0.8, marginBottom: 4 },
  heroName: { fontSize: 20, fontWeight: 800, marginBottom: 16 },
  heroStats: { display: "flex", gap: 10 },
  heroStat: { background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 10px", flex: 1, textAlign: "center" },
  heroStatVal: { fontSize: 16, fontWeight: 800, color: COLORS.accent },
  heroStatLabel: { fontSize: 10, opacity: 0.8, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, padding: "16px 16px 8px" },
  sectionSub: { fontSize: 12, color: COLORS.textMuted, padding: "0 16px 4px", marginTop: -6 },
  card: { background: COLORS.card, borderRadius: 14, margin: "0 16px 12px", padding: "16px", border: `1px solid ${COLORS.border}` },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: COLORS.textPrimary },
  badge: { fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 },
  badgeGreen: { background: "#E8F5EE", color: COLORS.primary },
  badgeOrange: { background: "#FEF3E2", color: "#B86A00" },
  badgeRed: { background: "#FDECEA", color: COLORS.danger },
  requestRow: { borderRadius: 12, padding: "12px 14px", border: `1.5px solid ${COLORS.border}`, marginBottom: 10, cursor: "pointer" },
  requestTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  requestName: { fontSize: 14, fontWeight: 700, color: COLORS.textPrimary },
  requestMeta: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  requestActions: { display: "flex", gap: 8, marginTop: 10 },
  btn: { background: COLORS.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnOutline: { background: "transparent", color: COLORS.primary, border: `1.5px solid ${COLORS.primary}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnAccent: { background: COLORS.accent, color: COLORS.primaryDark, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%" },
  btnDanger: { background: "transparent", color: COLORS.danger, border: `1.5px solid #F7C9C6`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  walletCard: { background: `linear-gradient(135deg, #0F4023 0%, #1B6B3A 100%)`, borderRadius: 16, margin: "0 16px 12px", padding: "20px", color: "#fff" },
  walletBal: { fontSize: 30, fontWeight: 800, color: COLORS.accent, marginBottom: 4 },
  walletLabel: { fontSize: 13, opacity: 0.75 },
  walletActions: { display: "flex", gap: 10, marginTop: 16 },
  walletBtn: { flex: 1, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  txRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` },
  txIcon: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 13, fontWeight: 600, color: COLORS.textPrimary },
  txDate: { fontSize: 11, color: COLORS.textMuted },
  txAmount: { fontSize: 14, fontWeight: 700 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 14, background: COLORS.surface, boxSizing: "border-box", outline: "none", color: COLORS.textPrimary },
  weightRow: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` },
  weightIcon: { width: 34, height: 34, borderRadius: 8, background: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  weightLabel: { flex: 1, fontSize: 13, fontWeight: 600, color: COLORS.textPrimary },
  weightField: { width: 72, padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 13, textAlign: "right", outline: "none" },
  payoutBox: { background: "#E8F5EE", borderRadius: 12, padding: "14px", marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  payoutLabel: { fontSize: 13, color: COLORS.textSecondary },
  payoutVal: { fontSize: 20, fontWeight: 800, color: COLORS.primary },
  starRow: { color: COLORS.accent, fontSize: 15, marginBottom: 2 },
  reviewRow: { padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` },
  reviewName: { fontSize: 13, fontWeight: 600, color: COLORS.textPrimary },
  reviewText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  coverageChip: { display: "inline-block", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, margin: "0 6px 6px 0" },
  progressBar: { height: 6, borderRadius: 3, background: COLORS.border, overflow: "hidden", marginTop: 6 },
  progressFill: { height: "100%", borderRadius: 3, background: COLORS.accent },
  navBar: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 420, background: "#fff", borderTop: `1px solid ${COLORS.border}`, display: "flex", padding: "8px 0 12px", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 0" },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, fontWeight: 600 },
  toast: { position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", background: COLORS.primary, color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap" },
  backRow: { display: "flex", alignItems: "center", gap: 8, padding: "12px 16px 4px", fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, cursor: "pointer" },
};

const REQUESTS = [
  { id: 1, name: "Tolu Adebayo", area: "12 Adeniran St, Ikeja", distance: "2.1km", time: "Today, 4:00 PM", icon: "🧍" },
  { id: 2, name: "Ngozi Balogun", area: "Agege Motor Rd", distance: "3.4km", time: "Tomorrow, 9:00 AM", icon: "🧍" },
  { id: 3, name: "Femi Okoro", area: "Ogba GRA", distance: "1.6km", time: "Tomorrow, 11:00 AM", icon: "🧍" },
];

const ACCEPTED_JOBS = [
  { id: 4, name: "Halima Yusuf", area: "Ojodu-Berger", distance: "4.0km", time: "Today, 6:00 PM", icon: "🧍" },
];

const PAYOUT_HISTORY = [
  { id: 1, label: "Weekly payout", amount: "-₦38,200", date: "Mon, Aug 10", icon: "🏦", color: "#FDECEA", textColor: COLORS.danger },
  { id: 2, label: "SortPay collections", amount: "+₦6,400", date: "Sun, Aug 9", icon: "♻️", color: "#E8F5EE", textColor: COLORS.success },
  { id: 3, label: "Subscription fees (14 households)", amount: "+₦16,800", date: "Aug 1, 2026", icon: "📅", color: "#E8F5EE", textColor: COLORS.success },
  { id: 4, label: "Weekly payout", amount: "-₦31,000", date: "Mon, Aug 3", icon: "🏦", color: "#FDECEA", textColor: COLORS.danger },
];

const REVIEWS = [
  { name: "Tolu A.", text: "Always on time and very polite. Highly recommend.", stars: "★★★★★" },
  { name: "Bayo O.", text: "Missed a pickup once but made up for it fast.", stars: "★★★★☆" },
];

export default function PSPApp() {
  const [screen, setScreen] = useState("dashboard");
  const [activeJob, setActiveJob] = useState(null);
  const [requests, setRequests] = useState(REQUESTS);
  const [jobs, setJobs] = useState(ACCEPTED_JOBS);
  const [weights, setWeights] = useState({ plastic: "2.4", metal: "0.8", organic: "1.1" });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const rate = { plastic: 70, metal: 120, organic: 40 }; // ₦ per kg
  const payout = Object.keys(rate).reduce((sum, k) => sum + rate[k] * (parseFloat(weights[k]) || 0), 0);

  const acceptRequest = (id) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setRequests(requests.filter((r) => r.id !== id));
    setJobs([...jobs, req]);
    showToast(`✅ Accepted ${req.name}'s pickup`);
  };

  const declineRequest = (id) => {
    setRequests(requests.filter((r) => r.id !== id));
    showToast("Request declined");
  };

  const openJob = (job) => {
    setActiveJob(job);
    setScreen("jobDetail");
  };

  const completeJob = () => {
    showToast(`✅ Marked complete — ${activeJob.name}`);
    setScreen("verify");
  };

  const confirmPay = () => {
    showToast(`💰 Confirmed — ₦${payout.toFixed(0)} owed to customer`);
    setJobs(jobs.filter((j) => j.id !== activeJob.id));
    setActiveJob(null);
    setScreen("dashboard");
  };

  const NavBar = () => (
    <div style={styles.navBar}>
      {[
        { id: "dashboard", icon: "🏠", label: "Home" },
        { id: "requests", icon: "📋", label: "Requests" },
        { id: "earnings", icon: "💰", label: "Wallet" },
        { id: "profile", icon: "👤", label: "Profile" },
      ].map((n) => (
        <div key={n.id} style={styles.navItem} onClick={() => setScreen(n.id)}>
          <span style={{ ...styles.navIcon, opacity: screen === n.id ? 1 : 0.4 }}>{n.icon}</span>
          <span style={{ ...styles.navLabel, color: screen === n.id ? COLORS.primary : COLORS.textMuted }}>{n.label}</span>
        </div>
      ))}
    </div>
  );

  const DashboardScreen = () => (
    <div>
      <div style={styles.heroCard}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroTitle}>Welcome back 👋</div>
        <div style={styles.heroName}>Chukwuma PSP</div>
        <div style={styles.heroStats}>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>{jobs.length + REQUESTS.length - requests.length}</div>
            <div style={styles.heroStatLabel}>Today's pickups</div>
          </div>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>₦8,400</div>
            <div style={styles.heroStatLabel}>Earnings today</div>
          </div>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>★4.8</div>
            <div style={styles.heroStatLabel}>Rating</div>
          </div>
        </div>
      </div>

      {requests.length > 0 && (
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.accent}` }}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>🔔 New requests</div>
            <span style={{ ...styles.badge, ...styles.badgeOrange }}>{requests.length} pending</span>
          </div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 10 }}>
            Households waiting to connect with you.
          </div>
          <button style={styles.btn} onClick={() => setScreen("requests")}>Review requests</button>
        </div>
      )}

      <div style={styles.sectionTitle}>Today's route</div>
      {jobs.length === 0 && (
        <div style={{ ...styles.card, textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>
          No accepted jobs yet — accept a request to build today's route.
        </div>
      )}
      {jobs.map((j) => (
        <div key={j.id} style={styles.requestRow} onClick={() => openJob(j)}>
          <div style={styles.requestTop}>
            <div>
              <div style={styles.requestName}>{j.icon} {j.name}</div>
              <div style={styles.requestMeta}>{j.area} · {j.distance}</div>
            </div>
            <span style={{ ...styles.badge, ...styles.badgeGreen }}>{j.time}</span>
          </div>
        </div>
      ))}

      <div style={styles.sectionTitle}>This week</div>
      <div style={styles.card}>
        {[
          { label: "Pickups completed", value: "34 / 40", pct: 85 },
          { label: "SortPay verified", value: "18.6 kg", pct: 60 },
          { label: "On-time rate", value: "96%", pct: 96 },
        ].map((s) => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{s.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>{s.value}</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RequestsScreen = () => (
    <div>
      <div style={styles.sectionTitle}>Pending requests</div>
      <div style={styles.sectionSub}>Accept to add to today's route, or decline.</div>
      {requests.length === 0 && (
        <div style={{ ...styles.card, textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>
          You're all caught up — no pending requests.
        </div>
      )}
      {requests.map((r) => (
        <div key={r.id} style={{ ...styles.card, margin: "0 16px 12px" }}>
          <div style={styles.requestTop}>
            <div>
              <div style={styles.requestName}>{r.icon} {r.name}</div>
              <div style={styles.requestMeta}>{r.area} · {r.distance}</div>
            </div>
            <span style={{ ...styles.badge, ...styles.badgeOrange }}>{r.time}</span>
          </div>
          <div style={styles.requestActions}>
            <button style={{ ...styles.btnAccent, flex: 1 }} onClick={() => acceptRequest(r.id)}>Accept</button>
            <button style={{ ...styles.btnDanger, flex: 1 }} onClick={() => declineRequest(r.id)}>Decline</button>
          </div>
        </div>
      ))}

      <div style={styles.sectionTitle}>Accepted — today's route</div>
      {jobs.map((j) => (
        <div key={j.id} style={styles.requestRow} onClick={() => openJob(j)}>
          <div style={styles.requestTop}>
            <div>
              <div style={styles.requestName}>{j.icon} {j.name}</div>
              <div style={styles.requestMeta}>{j.area} · {j.distance}</div>
            </div>
            <span style={{ ...styles.badge, ...styles.badgeGreen }}>{j.time}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const JobDetailScreen = () => {
    if (!activeJob) return null;
    return (
      <div>
        <div style={{ ...styles.card, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{activeJob.icon}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.textPrimary }}>{activeJob.name}</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{activeJob.area}</div>
          <div style={{ ...styles.badge, ...styles.badgeGreen, marginTop: 10, display: "inline-block" }}>{activeJob.time}</div>
        </div>

        <div style={styles.card}>
          <div style={{ ...styles.cardTitle, marginBottom: 12 }}>Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={styles.btnOutline} onClick={() => showToast("📞 Calling customer…")}>📞 Call customer</button>
            <button style={styles.btnOutline} onClick={() => showToast("🧭 Opening directions…")}>🧭 Navigate</button>
          </div>
        </div>

        <div style={{ padding: "0 16px" }}>
          <button style={styles.btnAccent} onClick={completeJob}>Mark complete</button>
        </div>
      </div>
    );
  };

  const VerifyScreen = () => (
    <div>
      <div style={styles.sectionTitle}>Verify sorted waste</div>
      <div style={styles.sectionSub}>{activeJob ? `${activeJob.name} · ${activeJob.area}` : "Enter weights collected"}</div>

      <div style={styles.card}>
        {[
          { key: "plastic", label: "Plastic", icon: "🧴" },
          { key: "metal", label: "Metal", icon: "🥫" },
          { key: "organic", label: "Organic", icon: "🌿" },
        ].map((m) => (
          <div key={m.key} style={styles.weightRow}>
            <div style={styles.weightIcon}>{m.icon}</div>
            <div style={styles.weightLabel}>{m.label} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>· ₦{rate[m.key]}/kg</span></div>
            <input
              style={styles.weightField}
              type="number"
              step="0.1"
              value={weights[m.key]}
              onChange={(e) => setWeights({ ...weights, [m.key]: e.target.value })}
            />
          </div>
        ))}
        <div style={styles.payoutBox}>
          <span style={styles.payoutLabel}>Customer payout</span>
          <span style={styles.payoutVal}>₦{payout.toFixed(0)}</span>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <button style={styles.btnAccent} onClick={confirmPay}>Confirm &amp; pay</button>
      </div>
    </div>
  );

  const EarningsScreen = () => (
    <div>
      <div style={styles.walletCard}>
        <div style={styles.walletLabel}>Available balance</div>
        <div style={styles.walletBal}>₦42,900.00</div>
        <div style={styles.walletActions}>
          <button style={styles.walletBtn} onClick={() => showToast("🏦 Withdrawal requested")}>Withdraw</button>
          <button style={styles.walletBtn} onClick={() => showToast("📄 Statement sent to email")}>Statement</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Payout history</div>
      <div style={styles.card}>
        {PAYOUT_HISTORY.map((tx) => (
          <div key={tx.id} style={styles.txRow}>
            <div style={{ ...styles.txIcon, background: tx.color }}>{tx.icon}</div>
            <div style={styles.txInfo}>
              <div style={styles.txLabel}>{tx.label}</div>
              <div style={styles.txDate}>{tx.date}</div>
            </div>
            <div style={{ ...styles.txAmount, color: tx.textColor }}>{tx.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div>
      <div style={{ ...styles.card, textAlign: "center" }}>
        <div style={{ ...styles.avatar, width: 64, height: 64, fontSize: 22, margin: "0 auto 10px" }}>CP</div>
        <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.textPrimary }}>Chukwuma PSP</div>
        <div style={styles.starRow}>★★★★★ <span style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600 }}>4.8 · 112 reviews</span></div>
      </div>

      <div style={styles.sectionTitle}>Coverage area</div>
      <div style={styles.card}>
        {["Ikeja", "Ogba", "Agege", "Ojodu"].map((a) => (
          <span key={a} style={styles.coverageChip}>{a}</span>
        ))}
        <div style={{ marginTop: 12 }}>
          <button style={styles.btnOutline} onClick={() => showToast("✏️ Edit coverage")}>Edit coverage &amp; pricing</button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>Standard pricing</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>₦1,200/mo</span>
        </div>
      </div>

      <div style={styles.sectionTitle}>Recent reviews</div>
      <div style={styles.card}>
        {REVIEWS.map((r, i) => (
          <div key={i} style={styles.reviewRow}>
            <div style={styles.reviewName}>{r.name} <span style={{ color: COLORS.accent }}>{r.stars}</span></div>
            <div style={styles.reviewText}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const screens = {
    dashboard: DashboardScreen,
    requests: RequestsScreen,
    jobDetail: JobDetailScreen,
    verify: VerifyScreen,
    earnings: EarningsScreen,
    profile: ProfileScreen,
  };
  const ActiveScreen = screens[screen] || DashboardScreen;

  const showBack = screen === "jobDetail" || screen === "verify";

  return (
    <div style={styles.app}>
      {toast && <div style={styles.toast}>{toast}</div>}
      <div style={styles.header}>
        <div style={styles.logo}>
          Dat<span style={styles.logoAccent}>i</span>
          <span style={styles.headerTag}>PSP</span>
        </div>
        <div style={styles.avatar}>CP</div>
      </div>
      {showBack && (
        <div style={styles.backRow} onClick={() => setScreen(screen === "verify" ? "jobDetail" : "requests")}>
          ← Back
        </div>
      )}
      <div style={styles.content}>
        <ActiveScreen />
      </div>
      <NavBar />
    </div>
  );
}
