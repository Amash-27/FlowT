import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { InventoryProvider } from "./context/InventoryContext";
import { TransactionProvider } from "./context/TransactionContext";
import { SalesProvider } from "./context/SalesContext";
import { SupplierProvider } from "./context/SupplierContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionProvider>
      <InventoryProvider>
        <SalesProvider>
          <SupplierProvider>
            <App />
          </SupplierProvider>
        </SalesProvider>
      </InventoryProvider>
    </TransactionProvider>
  </React.StrictMode>
);