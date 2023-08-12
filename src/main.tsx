import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";

import App from "./App.tsx";
import "./index.css";
import { setupStore } from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreProvider store={setupStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>
);
