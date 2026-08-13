import { useState } from "react";
import HouseholdApp from "./apps/HouseholdApp.jsx";
import PSPApp from "./apps/PSPApp.jsx";

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
  justifyContent: "center",
  gap: 8,
  zIndex: 1000,
  borderBottom: "1px solid #1B6B3A",
};

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

export default function App() {
  const [view, setView] = useState("household");

  return (
    <div style={wrap}>
      <div style={switcher}>
        <button style={tab(view === "household")} onClick={() => setView("household")}>
          🧍 Household app
        </button>
        <button style={tab(view === "psp")} onClick={() => setView("psp")}>
          🚛 PSP interface
        </button>
      </div>
      {view === "household" ? <HouseholdApp /> : <PSPApp />}
    </div>
  );
}
