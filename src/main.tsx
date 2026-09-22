import "@/styles/animations.css";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Site from "./app/Site.tsx";
import "./index.css";

hydrateRoot(document.getElementById("root")!,
  <StrictMode>
    <Site />
  </StrictMode>
);
