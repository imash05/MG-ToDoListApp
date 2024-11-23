import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import global_it from "./translations/it/global.json";
import global_en from "./translations/en/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./ThemeContext"; // Usa il tuo ThemeContext!

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    it: {
      global: global_it,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
