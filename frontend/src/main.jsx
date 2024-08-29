import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ButtonProvider } from "./components/ButtonContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ButtonProvider>
      <App />
    </ButtonProvider>
  </StrictMode>
);
