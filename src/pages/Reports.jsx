import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { SalesContext } from "../context/SalesContext";

function Reports() {
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

  const totalRevenue = sales.reduce(
    (sum, sale) =>
      sum + Number(sale.amount),
    0
  );

  const totalSales = sales.length;

  return (
    <div className="dashboard">

      <h1>📊 Reports</h1>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Total Stock</h3>
          <p>{totalStock}</p>
        </div>

        <div className="stat-card">
          <h3>Inventory Value</h3>
          <p>₹ {inventoryValue.toFixed(2)}</p>
        </div>

        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹ {totalRevenue.toFixed(2)}</p>
        </div>

      </div>

      <div
        className="table-card"
        style={{ marginTop: "20px" }}
      >

        <h2>Sales Report</h2>

        <table>

          <thead>

            <tr>

              <th>Invoice</th>

              <th>Customer</th>

              <th>Product</th>

              <th>Quantity</th>

              <th>Amount</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>

                  <td>{sale.invoice}</td>

                  <td>{sale.customer?.name}</td>

                  <td>{sale.product}</td>

                  <td>{sale.quantity}</td>

                  <td>
                    ₹ {Number(sale.amount).toFixed(2)}
                  </td>

                  <td>{sale.date}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center" }}
                >
                  No sales available.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <div
        className="table-card"
        style={{ marginTop: "20px" }}
      >

        <h2>Inventory Report</h2>

        <table>

          <thead>

            <tr>

              <th>Product</th>

              <th>Category</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Value</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product.id}>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹ {product.price}</td>

                <td>{product.stock}</td>

                <td>
                  ₹{" "}
                  {(
                    Number(product.price) *
                    Number(product.stock)
                  ).toFixed(2)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;