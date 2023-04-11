import { createRoot } from "react-dom/client";

import "app/styles/index.scss";

import { App } from "app/App";
import { QueryProvider } from "app/providers/QueryProvider";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Container was not found. React app couldn't be mounted.");
}

const root = createRoot(container);

root.render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
