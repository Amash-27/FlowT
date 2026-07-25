function Settings() {
  function clearInventory() {
    if (window.confirm("Clear all inventory data?")) {
      localStorage.removeItem("products");
      alert("Inventory cleared. Refresh the page.");
    }
  }

  function clearSales() {
    if (window.confirm("Clear all sales data?")) {
      localStorage.removeItem("sales");
      alert("Sales cleared. Refresh the page.");
    }
  }

  function clearSuppliers() {
    if (window.confirm("Clear all supplier data?")) {
      localStorage.removeItem("suppliers");
      alert("Suppliers cleared. Refresh the page.");
    }
  }

  function clearAll() {
    if (
      window.confirm(
        "This will remove all application data. Continue?"
      )
    ) {
      localStorage.clear();
      alert("All data cleared. Refresh the page.");
    }
  }

  return (
    <div className="dashboard">

      <h1>⚙️ Settings</h1>

      <div
        className="table-card"
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <button onClick={clearInventory}>
          📦 Clear Inventory
        </button>

        <button onClick={clearSales}>
          🛒 Clear Sales
        </button>

        <button onClick={clearSuppliers}>
          🚚 Clear Suppliers
        </button>

        <button
          onClick={clearAll}
          style={{
            background: "#dc2626",
            color: "#fff",
          }}
        >
          🗑️ Reset Entire Application
        </button>
      </div>

    </div>
  );
}

export default Settings;