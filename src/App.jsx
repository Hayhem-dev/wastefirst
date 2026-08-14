import { useState, useEffect } from "react";
import HouseholdApp from "./apps/HouseholdApp.jsx";
import PSPApp from "./apps/PSPApp.jsx";
import Auth from "./Auth.jsx";

const SESSION_KEY = "dati_session";

const wrap = {
  minHeight: "100vh",
  background: "#0F2419",
  paddingTop: 56,
};

const switcher = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 56,
  background: "#0F2419",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 14px",
  zIndex: 1000,
  borderBottom: "1px solid #1B6B3A",
};

const tabsWrap = { display: "flex", gap: 8, margin: "0 auto" };

const tab = (active) => ({
  padding: "8px 18px",
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
  background: active ? "#F5A623" : "transparent",
  color: active ? "#0F2419" : "#FDB94A",
});

const logoutBtn = {
  position: "absolute",
  right: 14,
  fontSize: 12,
  fontWeight: 600,
  color: "#FDB94A",
  background: "transparent",
  border: "1px solid rgba(253,185,74,0.4)",
  borderRadius: 16,
  padding: "6px 12px",
  cursor: "pointer",
};

export default function App() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [view, setView] = useState("household");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (saved) {
        setUser(saved);
        setView(saved.role === "psp" ? "psp" : "household");
      }
    } catch {
      // ignore corrupted session data
    }
    setChecked(true);
  }, []);

  const handleAuthed = (u) => {
    setUser(u);
    setView(u.role === "psp" ? "psp" : "household");
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  if (!checked) return null;

  if (!user) {
    return <Auth onAuthed={handleAuthed} />;
  }

  return (
    <div style={wrap}>
      <div style={switcher}>
        <div style={tabsWrap}>
          <button style={tab(view === "household")} onClick={() => setView("household")}>
            🧍 Household app
          </button>
          <button style={tab(view === "psp")} onClick={() => setView("psp")}>
            🚛 PSP interface
          </button>
        </div>
        <button style={logoutBtn} onClick={handleLogout}>Log out</button>
      </div>
      {view === "household" ? <HouseholdApp user={user} /> : <PSPApp user={user} />}
    </div>
  );
}
