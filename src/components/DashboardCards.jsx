import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { SalesContext } from "../context/SalesContext";

function DashboardCards() {
  const { products } = useContext(InventoryContext);
  const { sales } = useContext(SalesContext);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock),
    0
  );

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.price) *
      Number(product.stock),
    0
  );

  const totalSales = sales.length;

  const revenue = sales.reduce(
    (sum, sale) =>
      sum + Number(sale.amount),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.stock) <= 10
  ).length;

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: "📦",
      color: "#2563eb",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: "📚",
      color: "#16a34a",
    },
    {
      title: "Inventory Value",
      value: `₹${inventoryValue.toFixed(2)}`,
      icon: "💰",
      color: "#9333ea",
    },
    {
      title: "Total Sales",
      value: totalSales,
      icon: "🛒",
      color: "#ea580c",
    },
    {
      title: "Revenue",
      value: `₹${revenue.toFixed(2)}`,
      icon: "📈",
      color: "#0f766e",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: "⚠️",
      color: "#dc2626",
    },
  ];

  return (
    <div className="stats-container">
      {cards.map((card) => (
        <div
          key={card.title}
          className="stat-card"
          style={{
            borderTop: `5px solid ${card.color}`,
          }}
        >
          <h2>{card.icon}</h2>

          <h3>{card.title}</h3>

          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;