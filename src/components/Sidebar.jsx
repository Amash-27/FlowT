import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li>
          <NavLink to="/">🏠 Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/inventory">📦 Inventory</NavLink>
        </li>

        <li>
          <NavLink to="/sales">🛒 Sales</NavLink>
        </li>

        <li>
          <NavLink to="/customers">👥 Customers</NavLink>
        </li>

        <li>
          <NavLink to="/suppliers">🚚 Suppliers</NavLink>
        </li>

        <li>
          <NavLink to="/reports">📊 Reports</NavLink>
        </li>

        <li>
          <NavLink to="/settings">⚙️ Settings</NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;