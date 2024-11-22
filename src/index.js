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
  // {
  //   path: "/",
  //   element: <GG />,  << When the site is under maintance >>
  // },
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();

// TODO Puoi fornire una UX decisamente migliore di questa quando la tua app genera errori fornendone una tua ErrorBoundaryO errorElementsostegno sul tuo percorso.
