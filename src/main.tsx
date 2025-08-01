import "@/styles/animations.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { AppProvider } from "./app/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </MantineProvider>
  </StrictMode>
);
