import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import { useContext } from "react";

import { InventoryContext } from "../context/InventoryContext";
import { SalesContext } from "../context/SalesContext";

import "../styles/dashboard.css";

function Dashboard() {
  const { products } = useContext(InventoryContext);
  const { sales } = useContext(SalesContext);

  const lowStockProducts = products.filter(
    (product) => Number(product.stock) <= 10
  );

  const recentSales = [...sales]
    .reverse()
    .slice(0, 5);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome to your Inventory & Sales Management System.</p>
      </div>

      <DashboardCards />

      <DashboardCharts />

      {/* Low Stock */}
      <div className="table-card" style={{ marginTop: "20px" }}>
        <h2>⚠️ Low Stock Products</h2>

        {lowStockProducts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStockProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {product.stock}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>✅ No low stock products.</p>
        )}
      </div>

      {/* Recent Sales */}
      <div className="table-card" style={{ marginTop: "20px" }}>
        <h2>🛒 Recent Sales</h2>

        {recentSales.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.invoice}</td>
                  <td>{sale.customer?.name}</td>
                  <td>{sale.product}</td>
                  <td>₹ {Number(sale.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sales yet.</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;