import "./../styles/navbar.css";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="navbar">

      <div className="logo">
        <FaBoxesStacked className="logo-icon" />
        <div>
          <h2>FlowT</h2>
          <small>Smart Inventory Dashboard</small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <div>{today}</div>
          <small>{time}</small>
        </div>

        <FaBell
          size={20}
          style={{ cursor: "pointer" }}
        />

        <FaUserCircle size={34} />
      </div>

    </nav>
  );
}

export default Navbar;