import { motion } from "framer-motion";
import {
  FaIndianRupeeSign,
  FaChartLine,
  FaBoxesStacked,
  FaWallet,
} from "react-icons/fa6";

function Card({ title, amount }) {
  const getIcon = () => {
    switch (title) {
      case "Today's Sales":
        return <FaIndianRupeeSign />;

      case "Expenses":
        return <FaWallet />;

      case "Profit":
        return <FaChartLine />;

      default:
        return <FaBoxesStacked />;
    }
  };

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <div className="card-top">
        <div className="card-icon">
          {getIcon()}
        </div>
      </div>

      <h4>{title}</h4>

      <h2>
        {typeof amount === "number"
          ? `₹ ${amount.toLocaleString()}`
          : amount}
      </h2>

      <span className="card-growth">
        ↑ 12% from last month
      </span>
    </motion.div>
  );
}

export default Card;