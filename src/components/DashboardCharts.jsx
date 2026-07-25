import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function DashboardCharts() {
  const { products } = useContext(InventoryContext);

  // Products by Category
  const categoryMap = {};

  products.forEach((product) => {
    categoryMap[product.category] =
      (categoryMap[product.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // Stock Chart
  const stockData = products.map((product) => ({
    name: product.name,
    Stock: Number(product.stock),
  }));

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#ea580c",
    "#9333ea",
    "#dc2626",
    "#0891b2",
    "#ca8a04",
    "#4f46e5",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {/* Category Chart */}

      <div className="table-card">
        <h2>Products by Category</h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stock Chart */}

      <div className="table-card">
        <h2>Current Stock</h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="Stock" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;