import React from "react";
import { useTheme } from "../ThemeContext";
import themeColors from "../assets/styles/themeColors";

const HomePage = () => {
  // theme context
  const { currentTheme, switchTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.primaryColor,
      }}
      className="app"
    >
      <h1>
        Tema Corrente: {currentTheme.name} {currentTheme.emoji}
      </h1>
      <p style={{ color: currentTheme.secondaryTextColor }}>
        Questo è un esempio di testo secondario.
      </p>

      <h2>Cambia Tema:</h2>
      <div style={{ width: "200px" }}>
        <select
          value={currentTheme.name}
          onChange={(e) => switchTheme(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {themeColors.map((theme) => (
            <option
              key={theme.name}
              value={theme.name}
              style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
            >
              {theme.emoji} {theme.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HomePage;
