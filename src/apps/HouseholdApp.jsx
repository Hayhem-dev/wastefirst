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
  header: { background: COLORS.primary, padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" },
  logoAccent: { color: COLORS.accent },
  headerRight: { display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 },
  notifBadge: { width: 8, height: 8, borderRadius: "50%", background: COLORS.danger, position: "absolute", top: 0, right: 0 },
  content: { padding: "0 0 80px" },
  heroCard: { background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`, margin: "16px", borderRadius: 16, padding: "20px", color: "#fff", position: "relative", overflow: "hidden" },
  heroOverlay: { position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" },
  heroTitle: { fontSize: 15, opacity: 0.85, marginBottom: 4 },
  heroName: { fontSize: 22, fontWeight: 800, marginBottom: 16 },
  heroStats: { display: "flex", gap: 12 },
  heroStat: { background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" },
  heroStatVal: { fontSize: 18, fontWeight: 800, color: COLORS.accent },
  heroStatLabel: { fontSize: 11, opacity: 0.8, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: COLORS.textPrimary, padding: "16px 16px 8px" },
  quickGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px" },
  quickCard: { background: COLORS.card, borderRadius: 14, padding: "16px", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all 0.2s", textAlign: "center" },
  quickIcon: { fontSize: 28, marginBottom: 8 },
  quickLabel: { fontSize: 13, fontWeight: 600, color: COLORS.textPrimary },
  quickSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  card: { background: COLORS.card, borderRadius: 14, margin: "0 16px 12px", padding: "16px", border: `1px solid ${COLORS.border}` },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: COLORS.textPrimary },
  badge: { fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 },
  badgeGreen: { background: "#E8F5EE", color: COLORS.primary },
  badgeOrange: { background: "#FEF3E2", color: "#B86A00" },
  badgeRed: { background: "#FDECEA", color: COLORS.danger },
  pspRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` },
  pspIcon: { width: 42, height: 42, borderRadius: 10, background: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  pspInfo: { flex: 1 },
  pspName: { fontSize: 14, fontWeight: 600, color: COLORS.textPrimary },
  pspDetail: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  stars: { color: COLORS.accent, fontSize: 12 },
  btn: { background: COLORS.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnOutline: { background: "transparent", color: COLORS.primary, border: `1.5px solid ${COLORS.primary}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" },
  btnAccent: { background: COLORS.accent, color: COLORS.primaryDark, border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", width: "100%" },
  walletCard: { background: `linear-gradient(135deg, #0F4023 0%, #1B6B3A 100%)`, borderRadius: 16, margin: "0 16px 12px", padding: "20px", color: "#fff" },
  walletBal: { fontSize: 32, fontWeight: 800, color: COLORS.accent, marginBottom: 4 },
  walletLabel: { fontSize: 13, opacity: 0.75 },
  walletActions: { display: "flex", gap: 10, marginTop: 16 },
  walletBtn: { flex: 1, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  txRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` },
  txIcon: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 13, fontWeight: 600, color: COLORS.textPrimary },
  txDate: { fontSize: 11, color: COLORS.textMuted },
  txAmount: { fontSize: 14, fontWeight: 700 },
  mapPlaceholder: { background: "linear-gradient(135deg, #E8F5EE, #D4EDD9)", borderRadius: 12, height: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" },
  mapPin: { fontSize: 32, marginBottom: 8 },
  mapLabel: { fontSize: 13, fontWeight: 600, color: COLORS.primary },
  mapPins: { position: "absolute", width: "100%", height: "100%" },
  reportCard: { background: COLORS.card, borderRadius: 14, margin: "0 16px 12px", padding: "16px", border: `1.5px solid ${COLORS.border}`, cursor: "pointer" },
  reportHeader: { display: "flex", gap: 12, alignItems: "flex-start" },
  reportImg: { width: 56, height: 56, borderRadius: 8, background: "#FFE082", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 },
  reportInfo: { flex: 1 },
  reportTitle: { fontSize: 14, fontWeight: 700, color: COLORS.textPrimary },
  reportLoc: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  reportReward: { fontSize: 12, color: COLORS.primary, fontWeight: 600, marginTop: 6 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 14, background: COLORS.surface, boxSizing: "border-box", outline: "none", color: COLORS.textPrimary },
  textarea: { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 14, background: COLORS.surface, boxSizing: "border-box", outline: "none", minHeight: 80, color: COLORS.textPrimary, resize: "none" },
  select: { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 14, background: COLORS.surface, boxSizing: "border-box", outline: "none", color: COLORS.textPrimary },
  sortBag: { borderRadius: 12, padding: "12px", display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" },
  sortBagLabel: { fontSize: 14, fontWeight: 600 },
  sortBagSub: { fontSize: 11, opacity: 0.8, marginTop: 1 },
  sortWeight: { marginLeft: "auto", textAlign: "right" },
  sortWeightVal: { fontSize: 16, fontWeight: 800 },
  sortWeightLabel: { fontSize: 10, opacity: 0.7 },
  ussdCard: { background: "#1A1A2E", borderRadius: 16, margin: "0 16px 12px", padding: "20px", fontFamily: "monospace", color: "#00FF41" },
  ussdTitle: { fontSize: 11, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 },
  ussdScreen: { background: "#0D0D1A", borderRadius: 10, padding: "16px", marginBottom: 14, minHeight: 120 },
  ussdText: { fontSize: 13, lineHeight: 1.8 },
  ussdInput: { display: "flex", gap: 8 },
  ussdField: { flex: 1, background: "#0D0D1A", border: "1px solid #00FF41", borderRadius: 8, padding: "10px", color: "#00FF41", fontSize: 14, fontFamily: "monospace", outline: "none" },
  ussdSend: { background: "#00FF41", color: "#0D0D1A", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 800, cursor: "pointer", fontSize: 14 },
  navBar: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 420, background: "#fff", borderTop: `1px solid ${COLORS.border}`, display: "flex", padding: "8px 0 12px", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 0" },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, fontWeight: 600 },
  scheduleSlot: { borderRadius: 10, padding: "12px 14px", border: `1.5px solid ${COLORS.border}`, marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" },
  scheduleSlotSelected: { borderColor: COLORS.primary, background: "#E8F5EE" },
  progressBar: { height: 6, borderRadius: 3, background: COLORS.border, overflow: "hidden", marginTop: 6 },
  progressFill: { height: "100%", borderRadius: 3, background: COLORS.accent },
  toast: { position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", background: COLORS.primary, color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, zIndex: 999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap" },
};

const PSP_DATA = [
  { id: 1, name: "AkiClean Services", area: "Ikeja / Ogba", rating: 4.5, price: "₦1,500/mo", trucks: 5, icon: "🚛", status: "active" },
  { id: 2, name: "GreenLagos PSP", area: "Agege / Ikeja", rating: 4.2, price: "₦1,200/mo", trucks: 3, icon: "♻️", status: "active" },
  { id: 3, name: "CleanCity Operators", area: "Ojodu / Maryland", rating: 3.8, price: "₦1,000/mo", trucks: 2, icon: "🗑️", status: "active" },
];

const TRANSACTIONS = [
  { id: 1, label: "SortPay — Plastic (2.3kg)", amount: "+₦161", date: "Today, 9:14 AM", icon: "♻️", color: "#E8F5EE", textColor: COLORS.success },
  { id: 2, label: "WhistleBlower Reward", amount: "+₦5,000", date: "Yesterday, 3:22 PM", icon: "🚨", color: "#FEF3E2", textColor: "#B86A00" },
  { id: 3, label: "Monthly Subscription", amount: "-₦1,500", date: "Aug 1, 2026", icon: "📅", color: "#FDECEA", textColor: COLORS.danger },
  { id: 4, label: "SortPay — Organic (4.1kg)", amount: "+₦82", date: "Jul 30, 2026", icon: "🌿", color: "#E8F5EE", textColor: COLORS.success },
];

const REPORTS = [
  { id: 1, title: "Illegal dump on Allen Avenue drainage", location: "Allen Avenue, Ikeja", status: "Under Review", reward: "Potential reward: ₦5,000–₦50,000", icon: "🗑️", statusColor: "badgeOrange" },
  { id: 2, title: "Open burning near Ogba market", location: "Ogba Market Road", status: "Verified", reward: "Reward credited: ₦8,500", icon: "🔥", statusColor: "badgeGreen" },
];

const USSD_FLOWS = {
  "": `Welcome to Dati\n*483*1#\n\n1. Schedule Pickup\n2. SortPay Balance\n3. Report Illegal Dump\n4. Find PSP Near Me\n5. Pay Subscription\n\nReply with option:`,
  "1": `Schedule Pickup\n\nNext available slots:\n1. Tomorrow 8:00 AM\n2. Tomorrow 11:00 AM\n3. Tomorrow 2:00 PM\n\nReply with slot number:`,
  "2": `SortPay Balance\n\nWallet: ₦7,243\nThis month earned: ₦1,243\nSortings: 8 verified\n\n1. Withdraw to bank\n2. Convert to airtime\n3. Back to menu`,
  "3": `Report Illegal Dump\n\nSend location as:\nStreet name + LGA\n\nExample:\n"Allen Ave, Ikeja"\n\nType location:`,
  "4": `PSPs Near You\n\n1. AkiClean — ₦1,500/mo ⭐4.5\n2. GreenLagos — ₦1,200/mo ⭐4.2\n3. CleanCity — ₦1,000/mo ⭐3.8\n\nReply number to connect:`,
  "5": `Pay Subscription\n\nCurrent plan: Standard\nAmount: ₦1,500\nDue: Sep 1, 2026\n\n1. Pay with airtime\n2. Pay with bank\n3. Cancel\n\nReply:`,
  "1-1": `✅ Pickup Scheduled!\n\nDate: Tomorrow\nTime: 8:00 AM\nPSP: AkiClean Services\n\nYou'll get SMS alert\n1hr before arrival.\n\nRef: WF-2026-0812`,
  "1-2": `✅ Pickup Scheduled!\n\nDate: Tomorrow\nTime: 11:00 AM\nPSP: AkiClean Services\n\nYou'll get SMS alert\n1hr before arrival.\n\nRef: WF-2026-0813`,
  "1-3": `✅ Pickup Scheduled!\n\nDate: Tomorrow\nTime: 2:00 PM\nPSP: AkiClean Services\n\nYou'll get SMS alert\n1hr before arrival.\n\nRef: WF-2026-0814`,
};

export default function HouseholdApp({ user = {} }) {
  const userName = user.name || "Guest";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const [screen, setScreen] = useState("home");
  const [ussdInput, setUssdInput] = useState("");
  const [ussdPath, setUssdPath] = useState("");
  const [ussdDisplay, setUssdDisplay] = useState(USSD_FLOWS[""]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reportStep, setReportStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [connectedPSP, setConnectedPSP] = useState(PSP_DATA[0]);
  const [sortWeights, setSortWeights] = useState({ plastic: 2.3, organic: 1.1, general: 0 });
  const [showFundModal, setShowFundModal] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [showModal, setShowModal] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleUssdSend = () => {
    if (!ussdInput.trim()) return;
    const newPath = ussdPath ? `${ussdPath}-${ussdInput.trim()}` : ussdInput.trim();
    const response = USSD_FLOWS[newPath] || USSD_FLOWS[ussdInput.trim()] || `Processing...\n\nThank you!\nRef: WF-${Date.now()}\n\nReply 0 for menu`;
    setUssdDisplay(response);
    setUssdPath(newPath);
    setUssdInput("");
  };

  const NavBar = () => (
    <div style={styles.navBar}>
      {[
        { id: "home", icon: "🏠", label: "Home" },
        { id: "collect", icon: "🚛", label: "Collect" },
        { id: "sort", icon: "♻️", label: "SortPay" },
        { id: "report", icon: "🚨", label: "Report" },
        { id: "map", icon: "🗺️", label: "WasteMap" },
      ].map(n => (
        <div key={n.id} style={styles.navItem} onClick={() => setScreen(n.id)}>
          <span style={{ ...styles.navIcon, opacity: screen === n.id ? 1 : 0.4 }}>{n.icon}</span>
          <span style={{ ...styles.navLabel, color: screen === n.id ? COLORS.primary : COLORS.textMuted }}>{n.label}</span>
        </div>
      ))}
    </div>
  );

  const HomeScreen = () => (
    <div>
      <div style={styles.heroCard}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroTitle}>Good morning 👋</div>
        <div style={styles.heroName}>{userName}</div>
        <div style={styles.heroStats}>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>₦7,243</div>
            <div style={styles.heroStatLabel}>Wallet</div>
          </div>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>8</div>
            <div style={styles.heroStatLabel}>Sortings</div>
          </div>
          <div style={styles.heroStat}>
            <div style={styles.heroStatVal}>3</div>
            <div style={styles.heroStatLabel}>Reports</div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.accent}` }}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>🚛 Next Collection</div>
          <span style={{ ...styles.badge, ...styles.badgeGreen }}>Tomorrow</span>
        </div>
        <div style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 10 }}>
          AkiClean Services · 8:00 AM<br />
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Allen Ave junction, Ikeja</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...styles.btn, flex: 1 }} onClick={() => showToast("✅ Reminder set for 7:00 AM")}>Set Reminder</button>
          <button style={{ ...styles.btnOutline, flex: 1 }} onClick={() => setScreen("collect")}>Reschedule</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Quick Actions</div>
      <div style={styles.quickGrid}>
        {[
          { icon: "📅", label: "Schedule", sub: "Book a pickup", screen: "collect" },
          { icon: "♻️", label: "SortPay", sub: "Earn from sorting", screen: "sort" },
          { icon: "🚨", label: "Report Dump", sub: "Earn from fines", screen: "report" },
          { icon: "📱", label: "USSD Mode", sub: "No internet needed", screen: "ussd" },
          { icon: "💳", label: "Add Funds", sub: "Top up wallet", screen: "addfunds" },
        ].map(q => (
          <div key={q.label} style={styles.quickCard} onClick={() => setScreen(q.screen)}>
            <div style={styles.quickIcon}>{q.icon}</div>
            <div style={styles.quickLabel}>{q.label}</div>
            <div style={styles.quickSub}>{q.sub}</div>
          </div>
        ))}
      </div>

      <div style={styles.sectionTitle}>Community Impact</div>
      <div style={styles.card}>
        {[
          { label: "Waste diverted this month", value: "12.4 tonnes", pct: 68 },
          { label: "Households active in Ikeja", value: "1,243", pct: 45 },
          { label: "Illegal dumps reported", value: "89 this week", pct: 30 },
        ].map(s => (
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

  const CollectScreen = () => (
    <div>
      <div style={styles.card}>
        <div style={{ ...styles.cardTitle, marginBottom: 12 }}>Your PSP Operator</div>
        <div style={styles.pspRow}>
          <div style={styles.pspIcon}>🚛</div>
          <div style={styles.pspInfo}>
            <div style={styles.pspName}>{connectedPSP.name}</div>
            <div style={styles.stars}>★★★★½ <span style={{ color: COLORS.textMuted }}>{connectedPSP.rating}</span></div>
            <div style={styles.pspDetail}>{connectedPSP.area} · {connectedPSP.price}</div>
          </div>
          <span style={{ ...styles.badge, ...styles.badgeGreen }}>Connected</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button style={{ ...styles.btn, flex: 1 }} onClick={() => showToast("📞 Calling AkiClean...")}>Call PSP</button>
          <button style={{ ...styles.btnOutline, flex: 1 }} onClick={() => setShowModal("switchPSP")}>Switch PSP</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Schedule a Pickup</div>
      <div style={styles.card}>
        {["Tomorrow · 8:00 AM", "Tomorrow · 11:00 AM", "Tomorrow · 2:00 PM", "Thursday · 8:00 AM"].map((slot, i) => (
          <div
            key={i}
            style={{ ...styles.scheduleSlot, ...(selectedSlot === i ? styles.scheduleSlotSelected : {}) }}
            onClick={() => setSelectedSlot(i)}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{slot}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>AkiClean · Estimated 20 min window</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selectedSlot === i ? COLORS.primary : COLORS.border}`, background: selectedSlot === i ? COLORS.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {selectedSlot === i && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
            </div>
          </div>
        ))}
        <button
          style={styles.btnAccent}
          onClick={() => { if (selectedSlot !== null) showToast("✅ Pickup booked! SMS confirmation sent"); else showToast("⚠️ Please select a time slot"); }}
        >
          Confirm Booking
        </button>
      </div>

      <div style={styles.sectionTitle}>Collection History</div>
      <div style={styles.card}>
        {[
          { date: "Aug 8, 2026", status: "Completed", rating: "★★★★★" },
          { date: "Aug 1, 2026", status: "Completed", rating: "★★★★☆" },
          { date: "Jul 25, 2026", status: "Missed", rating: "Reported" },
        ].map((h, i) => (
          <div key={i} style={{ ...styles.txRow, borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ fontSize: 20 }}>{h.status === "Completed" ? "✅" : "❌"}</div>
            <div style={styles.txInfo}>
              <div style={styles.txLabel}>{h.date}</div>
              <div style={styles.txDate}>{h.rating}</div>
            </div>
            <span style={{ ...styles.badge, ...(h.status === "Completed" ? styles.badgeGreen : styles.badgeRed) }}>{h.status}</span>
          </div>
        ))}
      </div>

      {showModal === "switchPSP" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 20, width: "100%", maxWidth: 420, margin: "0 auto" }}>
            <div style={{ ...styles.cardTitle, marginBottom: 14 }}>Switch PSP Operator</div>
            {PSP_DATA.map(psp => (
              <div key={psp.id} style={styles.pspRow} onClick={() => { setConnectedPSP(psp); setShowModal(null); showToast(`✅ Switched to ${psp.name}`); }}>
                <div style={styles.pspIcon}>{psp.icon}</div>
                <div style={styles.pspInfo}>
                  <div style={styles.pspName}>{psp.name}</div>
                  <div style={styles.pspDetail}>{psp.area} · {psp.price} · ⭐{psp.rating}</div>
                </div>
                {connectedPSP.id === psp.id && <span style={{ ...styles.badge, ...styles.badgeGreen }}>Active</span>}
              </div>
            ))}
            <button style={{ ...styles.btnOutline, marginTop: 14 }} onClick={() => setShowModal(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

  const SortPayScreen = () => (
    <div>
      <div style={styles.walletCard}>
        <div style={styles.walletLabel}>SortPay Wallet</div>
        <div style={styles.walletBal}>₦7,243</div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>+₦1,243 earned this month</div>
        <div style={styles.walletActions}>
          <button style={styles.walletBtn} onClick={() => showToast("💸 Withdraw initiated")}>Withdraw</button>
          <button style={styles.walletBtn} onClick={() => showToast("📱 Converting to airtime...")}>→ Airtime</button>
          <button style={styles.walletBtn} onClick={() => showToast("💳 Paying subscription...")}>Pay Sub</button>
          <button style={{ ...styles.walletBtn, background: "rgba(245,166,35,0.3)", color: "#F5A623", fontWeight: 700 }} onClick={() => setShowFundModal(true)}>➕ Add Funds</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Log Today's Sort</div>
      <div style={styles.card}>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14 }}>Enter the weight of each sorted bag. PSP verifies at collection.</div>
        {[
          { key: "plastic", label: "♻️ Recyclables", sub: "Plastic, metal, paper, glass", bg: "#E3F2FD", rate: "₦70/kg" },
          { key: "organic", label: "🌿 Organic Waste", sub: "Food, plantain, garden waste", bg: "#E8F5EE", rate: "₦20/kg" },
          { key: "general", label: "🗑️ General Waste", sub: "Mixed, non-recyclable", bg: "#F5F5F5", rate: "No reward" },
        ].map(bag => (
          <div key={bag.key} style={{ ...styles.sortBag, background: bag.bg }}>
            <div>
              <div style={styles.sortBagLabel}>{bag.label}</div>
              <div style={styles.sortBagSub}>{bag.sub}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.primary, marginTop: 3 }}>{bag.rate}</div>
            </div>
            <div style={styles.sortWeight}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${COLORS.border}`, background: "#fff", fontSize: 16, cursor: "pointer" }} onClick={() => setSortWeights(w => ({ ...w, [bag.key]: Math.max(0, parseFloat((w[bag.key] - 0.1).toFixed(1))) }))}>−</button>
                <div style={{ width: 44, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.textPrimary }}>{sortWeights[bag.key]}kg</div>
                </div>
                <button style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${COLORS.primary}`, background: COLORS.primary, color: "#fff", fontSize: 16, cursor: "pointer" }} onClick={() => setSortWeights(w => ({ ...w, [bag.key]: parseFloat((w[bag.key] + 0.1).toFixed(1)) }))}>+</button>
              </div>
              <div style={{ fontSize: 11, color: COLORS.primary, fontWeight: 600, marginTop: 4, textAlign: "center" }}>
                {bag.key === "plastic" ? `₦${(sortWeights.plastic * 70).toFixed(0)}` : bag.key === "organic" ? `₦${(sortWeights.organic * 20).toFixed(0)}` : "—"}
              </div>
            </div>
          </div>
        ))}
        <div style={{ background: COLORS.surface, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSecondary }}>Estimated Earnings</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary }}>₦{((sortWeights.plastic * 70) + (sortWeights.organic * 20)).toFixed(0)}</span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3 }}>Credited within 24hrs after PSP verification</div>
        </div>
        <button style={styles.btnAccent} onClick={() => showToast("📦 Sort logged! PSP will verify on pickup")}>Submit Sort Log</button>
      </div>

      <div style={styles.sectionTitle}>Transaction History</div>
      <div style={styles.card}>
        {TRANSACTIONS.map(tx => (
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

  const ReportScreen = () => (
    <div>
      <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.danger}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4 }}>🚨 WhistleBlower</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Report illegal dumping anonymously. Earn 10% of the fine paid by the offender. Your identity is never revealed.</div>
      </div>

      <div style={styles.sectionTitle}>File a Report</div>
      <div style={styles.card}>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Type of Violation</label>
          <select style={styles.select}>
            <option>Illegal dumping on roadside</option>
            <option>Dumping in drainage channel</option>
            <option>Open burning of waste</option>
            <option>Dumping at unauthorised site</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Location</label>
          <input style={styles.input} placeholder="e.g. Allen Avenue junction, Ikeja" />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>Description</label>
          <textarea style={styles.textarea} placeholder="Describe what you saw, when it happened, and any identifying details..." />
        </div>
        <div style={{ background: "#FEF3E2", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#B86A00" }}>💰 Potential Reward</div>
          <div style={{ fontSize: 12, color: "#8A5000", marginTop: 3 }}>If the offender is fined ₦50,000–₦500,000, you earn ₦5,000–₦50,000 credited to your wallet</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...styles.btn, flex: 1 }} onClick={() => showToast("📸 Camera opened — take a photo")}>📸 Add Photo</button>
          <button style={{ ...styles.btnAccent, flex: 1 }} onClick={() => showToast("🚨 Report submitted to LAWMA!")}>Submit Report</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>Your Reports</div>
      {REPORTS.map(r => (
        <div key={r.id} style={styles.reportCard}>
          <div style={styles.reportHeader}>
            <div style={styles.reportImg}>{r.icon}</div>
            <div style={styles.reportInfo}>
              <div style={styles.reportTitle}>{r.title}</div>
              <div style={styles.reportLoc}>📍 {r.location}</div>
              <div style={styles.reportReward}>{r.reward}</div>
            </div>
            <span style={{ ...styles.badge, ...styles[r.statusColor] }}>{r.status}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const MapScreen = () => (
    <div>
      <div style={{ ...styles.card, padding: 0, overflow: "hidden" }}>
        <div style={styles.mapPlaceholder}>
          <div style={{ position: "absolute", top: "20%", left: "30%", fontSize: 28 }}>📍</div>
          <div style={{ position: "absolute", top: "40%", left: "60%", fontSize: 22 }}>🚛</div>
          <div style={{ position: "absolute", top: "60%", left: "25%", fontSize: 22 }}>🗑️</div>
          <div style={{ position: "absolute", top: "30%", left: "70%", fontSize: 20 }}>♻️</div>
          <div style={{ position: "absolute", top: "55%", left: "50%", fontSize: 18 }}>⚠️</div>
          <div style={{ position: "absolute", bottom: 12, right: 12 }}>
            <div style={{ background: "#fff", borderRadius: 10, padding: "8px 12px", fontSize: 11 }}>
              📍 You · 🚛 PSP · 🗑️ Dumpsite · ⚠️ Hotspot
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
          <button style={{ ...styles.btn, flex: 1 }} onClick={() => showToast("🗺️ Showing PSPs near you")}>PSPs Near Me</button>
          <button style={{ ...styles.btnOutline, flex: 1 }} onClick={() => showToast("🗑️ Dumpsites loaded on map")}>Dumpsites</button>
        </div>
      </div>

      <div style={styles.sectionTitle}>PSP Operators Nearby</div>
      {PSP_DATA.map(psp => (
        <div key={psp.id} style={styles.card}>
          <div style={styles.pspRow}>
            <div style={styles.pspIcon}>{psp.icon}</div>
            <div style={styles.pspInfo}>
              <div style={styles.pspName}>{psp.name}</div>
              <div style={styles.stars}>{"★".repeat(Math.floor(psp.rating))}{"☆".repeat(5 - Math.floor(psp.rating))} {psp.rating}</div>
              <div style={styles.pspDetail}>{psp.area} · {psp.trucks} trucks · {psp.price}</div>
            </div>
            <button style={{ ...styles.btn, width: "auto", padding: "8px 14px" }} onClick={() => { setConnectedPSP(psp); showToast(`✅ Connected to ${psp.name}`); }}>Connect</button>
          </div>
        </div>
      ))}

      <div style={styles.sectionTitle}>Illegal Dump Hotspots</div>
      <div style={styles.card}>
        {[
          { loc: "Agege Market Road", reports: 12, level: "High" },
          { loc: "Ikeja Bus Stop Drainage", reports: 7, level: "Medium" },
          { loc: "Ogba Junction", reports: 4, level: "Low" },
        ].map((h, i) => (
          <div key={i} style={{ ...styles.txRow, borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ fontSize: 20 }}>⚠️</div>
            <div style={styles.txInfo}>
              <div style={styles.txLabel}>{h.loc}</div>
              <div style={styles.txDate}>{h.reports} reports this week</div>
            </div>
            <span style={{ ...styles.badge, ...(h.level === "High" ? styles.badgeRed : h.level === "Medium" ? styles.badgeOrange : styles.badgeGreen) }}>{h.level}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const USSDScreen = () => (
    <div>
      <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.primary}` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4 }}>📱 USSD Mode</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary }}>No internet? No problem. Use Dati on any phone via *483*1# — works on MTN, Airtel, Glo, and 9mobile.</div>
      </div>

      <div style={styles.sectionTitle}>USSD Simulator — *483*1#</div>
      <div style={styles.ussdCard}>
        <div style={styles.ussdTitle}>📱 Dati USSD Terminal</div>
        <div style={styles.ussdScreen}>
          <pre style={{ ...styles.ussdText, margin: 0, whiteSpace: "pre-wrap" }}>{ussdDisplay}</pre>
        </div>
        <div style={styles.ussdInput}>
          <input
            style={styles.ussdField}
            value={ussdInput}
            onChange={e => setUssdInput(e.target.value)}
            placeholder="Enter option..."
            onKeyDown={e => e.key === "Enter" && handleUssdSend()}
          />
          <button style={styles.ussdSend} onClick={handleUssdSend}>SEND</button>
        </div>
        <button style={{ ...styles.ussdField, marginTop: 8, cursor: "pointer", textAlign: "center", width: "100%", boxSizing: "border-box" }} onClick={() => { setUssdDisplay(USSD_FLOWS[""]); setUssdPath(""); setUssdInput(""); }}>
          🔄 RESET / BACK TO MENU
        </button>
      </div>

      <div style={styles.sectionTitle}>How to Use USSD</div>
      <div style={styles.card}>
        {[
          { step: "1", text: "Dial *483*1# on any mobile phone" },
          { step: "2", text: "Select your preferred language — English, Yoruba, or Pidgin" },
          { step: "3", text: "Choose from the menu — schedule, pay, report, or find PSP" },
          { step: "4", text: "Pay via airtime deduction — no bank account needed" },
          { step: "5", text: "Receive SMS confirmation for every action" },
        ].map(s => (
          <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, paddingTop: 4 }}>{s.text}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddFundsModal = () => showFundModal ? (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "24px 20px 36px", width: "100%", maxWidth: 420, margin: "0 auto", boxSizing: "border-box" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0F2419", marginBottom: 4 }}>💳 Add Funds</div>
        <div style={{ fontSize: 13, color: "#8AA698", marginBottom: 20 }}>Top up your Dati wallet instantly</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {["₦500", "₦1,000", "₦2,000", "₦5,000", "₦10,000", "₦20,000"].map(amt => (
            <div key={amt} onClick={() => setFundAmount(amt.replace("₦","").replace(",",""))} style={{ background: fundAmount === amt.replace("₦","").replace(",","") ? "#1B6B3A" : "#F7FAF8", color: fundAmount === amt.replace("₦","").replace(",","") ? "#fff" : "#0F2419", border: `1.5px solid ${fundAmount === amt.replace("₦","").replace(",","") ? "#1B6B3A" : "#DCE8E0"}`, borderRadius: 10, padding: "12px 6px", textAlign: "center", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{amt}</div>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#4A6355", marginBottom: 6 }}>Or enter custom amount (₦)</div>
          <input style={{ width: "100%", padding: "13px 14px", borderRadius: 10, border: "1.5px solid #DCE8E0", fontSize: 16, background: "#F7FAF8", boxSizing: "border-box", outline: "none", color: "#0F2419" }} type="number" placeholder="e.g. 3000" value={fundAmount} onChange={e => setFundAmount(e.target.value)} />
        </div>
        <div style={{ background: "#E8F5EE", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#1B6B3A" }}>💰 Amount to add: <strong>₦{fundAmount ? Number(fundAmount).toLocaleString() : "0"}</strong></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {[{ icon: "🏦", label: "Bank Transfer" }, { icon: "💳", label: "Card" }, { icon: "📱", label: "USSD" }, { icon: "📞", label: "Airtime" }].map(m => (
            <button key={m.label} style={{ background: "#F7FAF8", border: "1.5px solid #DCE8E0", borderRadius: 10, padding: "12px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#0F2419" }} onClick={() => { if (fundAmount) { showToast("✅ ₦" + Number(fundAmount).toLocaleString() + " added via " + m.label + "!"); setShowFundModal(false); setFundAmount(""); } else showToast("⚠️ Enter an amount first"); }}>{m.icon} {m.label}</button>
          ))}
        </div>
        <button style={{ width: "100%", background: "transparent", border: "1.5px solid #DCE8E0", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#8AA698" }} onClick={() => { setShowFundModal(false); setFundAmount(""); }}>Cancel</button>
      </div>
    </div>
  ) : null;

  const screens = { home: HomeScreen, collect: CollectScreen, sort: SortPayScreen, report: ReportScreen, map: MapScreen, ussd: USSDScreen, addfunds: SortPayScreen };
  const ActiveScreen = screens[screen] || HomeScreen;

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      {toast && <div style={styles.toast}>{toast}</div>}
      <div style={styles.header}>
        <div style={styles.logo}>Dat<span style={styles.logoAccent}>i</span></div>
        <div style={styles.headerRight}>
          <div style={{ fontSize: 22, cursor: "pointer", position: "relative" }} onClick={() => showToast("🔔 3 new notifications")}>
            🔔
            <div style={styles.notifBadge} />
          </div>
          <div style={styles.avatar}>{userInitials}</div>
        </div>
      </div>
      <div style={styles.content}>
        <ActiveScreen />
      </div>
      <AddFundsModal />
      <NavBar />
    </div>
  );
}
