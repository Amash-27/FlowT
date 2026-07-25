import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import useTransactions from "../hooks/useTransactions";
import "../styles/chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Chart() {
  const { transactions } = useTransactions();

  // Days of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create an array for weekly sales
  const weeklySales = [0, 0, 0, 0, 0, 0, 0];

  transactions.forEach((transaction) => {
    if (transaction.type === "Sale") {
      const day = new Date(transaction.date).getDay();
      weeklySales[day] += transaction.amount;
    }
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: "Weekly Sales",
        data: weeklySales,
        backgroundColor: "#2563eb",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <h2>Weekly Sales</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;