import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRouter from "./router/AppRouter.jsx";
import AuthContextProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AppRouter>
        <App />
      </AppRouter>
    </AuthContextProvider>
  </StrictMode>
);
