import { HashRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Sales from "./pages/Sales";
import Supplier from "./pages/Supplier";
import FloatingAssistant from "./components/FloatingAssistant";
import Flowy from "./components/Flowy";

function App() {
  return (
    <HashRouter>
      <div className="app">

        <Sidebar />

        <div className="main-content">
          <Navbar />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Supplier />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/flowy" element={<Flowy />} />
          </Routes>

        </div>

      </div>

    </HashRouter>
  );
}

export default App;