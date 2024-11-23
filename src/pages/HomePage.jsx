import React from "react";
import { useTheme } from "../ThemeContext";
import themeColors from "../assets/styles/themeColors";

const HomePage = () => {
  //theme context
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
      <div style={{ display: "flex", gap: "10px" }}>
        {themeColors.map((theme) => (
          <button
            key={theme.name}
            onClick={() => switchTheme(theme.name)}
            style={{
              backgroundColor: theme.primaryColor,
              color: "#fff",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {theme.emoji} {theme.name}
          </button>
        ))}
      </div>


    </div>
  );
};

export default HomePage;
