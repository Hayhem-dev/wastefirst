import { useState } from "react";

const COLORS = {
  primary: "#1B6B3A",
  primaryLight: "#2D8A4E",
  primaryDark: "#0F4023",
  accent: "#F5A623",
  accentLight: "#FDB94A",
  surface: "#F7FAF8",
  card: "#FFFFFF",
  border: "#DCE8E0",
  textPrimary: "#0F2419",
  textSecondary: "#4A6355",
  textMuted: "#8AA698",
  danger: "#E53935",
};

const styles = {
  wrap: {
    minHeight: "100vh",
    background: `linear-gradient(160deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    padding: 20,
    boxSizing: "border-box",
  },
  card: {
    background: COLORS.card,
    borderRadius: 20,
    padding: "32px 28px",
    width: "100%",
    maxWidth: 380,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  },
  logo: { fontSize: 24, fontWeight: 800, color: COLORS.primaryDark, marginBottom: 4, textAlign: "center" },
  logoAccent: { color: COLORS.accent },
  tagline: { fontSize: 13, color: COLORS.textMuted, textAlign: "center", marginBottom: 24 },
  tabs: { display: "flex", background: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 22 },
  tab: (active) => ({
    flex: 1,
    textAlign: "center",
    padding: "9px 0",
    borderRadius: 9,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    background: active ? COLORS.card : "transparent",
    color: active ? COLORS.primary : COLORS.textMuted,
    boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
  }),
  label: { fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 6, display: "block" },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 10,
    border: `1.5px solid ${COLORS.border}`,
    fontSize: 14,
    background: COLORS.surface,
    boxSizing: "border-box",
    outline: "none",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  inputError: { border: `1.5px solid ${COLORS.danger}` },
  btn: {
    width: "100%",
    background: COLORS.accent,
    color: COLORS.primaryDark,
    border: "none",
    borderRadius: 10,
    padding: "13px 0",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  errorText: { color: COLORS.danger, fontSize: 12.5, marginTop: -10, marginBottom: 14 },
  codeBox: {
    background: "#E8F5EE",
    border: `1.5px dashed ${COLORS.primary}`,
    borderRadius: 12,
    padding: "14px",
    textAlign: "center",
    marginBottom: 18,
  },
  codeLabel: { fontSize: 11.5, color: COLORS.textSecondary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 },
  codeDigits: { fontSize: 26, fontWeight: 800, letterSpacing: 6, color: COLORS.primary, fontFamily: "monospace" },
  codeNote: { fontSize: 11, color: COLORS.textMuted, marginTop: 6 },
  backLink: { textAlign: "center", fontSize: 12.5, color: COLORS.textSecondary, marginTop: 16, cursor: "pointer" },
  betaNote: {
    marginTop: 18,
    fontSize: 11.5,
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 1.5,
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: 14,
  },
};

const USERS_KEY = "dati_users";
const SESSION_KEY = "dati_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function genCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function Auth({ onAuthed }) {
  const [mode, setMode] = useState("signup"); // signup | login
  const [step, setStep] = useState("form"); // form | verify
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("household"); // household | psp
  const [enteredCode, setEnteredCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [error, setError] = useState("");

  const resetForm = (m) => {
    setMode(m);
    setStep("form");
    setName("");
    setPhone("");
    setEnteredCode("");
    setError("");
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Enter your name.");
    if (!/^\d{10,11}$/.test(phone.replace(/\s/g, ""))) return setError("Enter a valid phone number (digits only).");
    const users = loadUsers();
    if (users.some((u) => u.phone === phone)) {
      return setError("This number is already registered — try logging in instead.");
    }
    // Sync with backend API
    try {
      await fetch("https://wastefirst.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, email: phone + "@dati.ng", role }),
      });
    } catch (_) { /* continue even if API is offline */ }
    const code = genCode();
    setSentCode(code);
    setStep("verify");
  };

  const submitVerify = (e) => {
    e.preventDefault();
    setError("");
    if (enteredCode !== sentCode) {
      return setError("That code doesn't match — check and try again.");
    }
    const users = loadUsers();
    const newUser = { name: name.trim(), phone, role };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    onAuthed(newUser);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    const users = loadUsers();
    const found = users.find((u) => u.phone === phone.replace(/\s/g, ""));
    if (!found) return setError("No account found on this device — sign up first.");
    // Sync with backend API
    try {
      const res = await fetch("https://wastefirst.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\s/g, "") }),
      });
      const data = await res.json();
      if (data.status === "success" && data.data && data.data.user) {
        const apiUser = { ...found, ...data.data.user };
        localStorage.setItem(SESSION_KEY, JSON.stringify(apiUser));
        onAuthed(apiUser);
        return;
      }
    } catch (_) { /* fallback to local */ }
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    onAuthed(found);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logo}>
          Dat<span style={styles.logoAccent}>i</span>
        </div>
        <div style={styles.tagline}>Closed beta — thanks for testing with us</div>

        {step === "form" && (
          <>
            <div style={styles.tabs}>
              <div style={styles.tab(mode === "signup")} onClick={() => resetForm("signup")}>Sign up</div>
              <div style={styles.tab(mode === "login")} onClick={() => resetForm("login")}>Log in</div>
            </div>

            {mode === "signup" ? (
              <form onSubmit={submitSignup}>
                <label style={styles.label}>Full name</label>
                <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Tolu Adebayo" />

                <label style={styles.label}>Phone number</label>
                <input style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="080XXXXXXXX" inputMode="numeric" />

                <label style={styles.label}>I'm testing as</label>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {[
                    { id: "household", label: "🧍 Household" },
                    { id: "psp", label: "🚛 PSP operator" },
                  ].map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "10px 6px",
                        borderRadius: 10,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: `1.5px solid ${role === r.id ? COLORS.primary : COLORS.border}`,
                        background: role === r.id ? "#E8F5EE" : COLORS.surface,
                        color: role === r.id ? COLORS.primary : COLORS.textSecondary,
                      }}
                    >
                      {r.label}
                    </div>
                  ))}
                </div>

                {error && <div style={styles.errorText}>{error}</div>}
                <button type="submit" style={styles.btn}>Get verification code</button>
              </form>
            ) : (
              <form onSubmit={submitLogin}>
                <label style={styles.label}>Phone number</label>
                <input style={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="080XXXXXXXX" inputMode="numeric" />
                {error && <div style={styles.errorText}>{error}</div>}
                <button type="submit" style={styles.btn}>Log in</button>
              </form>
            )}
          </>
        )}

        {step === "verify" && (
          <form onSubmit={submitVerify}>
            <div style={styles.codeBox}>
              <div style={styles.codeLabel}>Demo verification code</div>
              <div style={styles.codeDigits}>{sentCode}</div>
              <div style={styles.codeNote}>No SMS is sent in this beta — this is the code you'd normally receive by text.</div>
            </div>
            <label style={styles.label}>Enter the code above</label>
            <input
              style={styles.input}
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="0000"
              inputMode="numeric"
              maxLength={4}
            />
            {error && <div style={styles.errorText}>{error}</div>}
            <button type="submit" style={styles.btn}>Verify &amp; create account</button>
            <div style={styles.backLink} onClick={() => setStep("form")}>← Back</div>
          </form>
        )}

        <div style={styles.betaNote}>
          This is an early beta build for Dati — data you enter stays on
          this device only and may be reset as we keep testing.
        </div>
      </div>
    </div>
  );
}
