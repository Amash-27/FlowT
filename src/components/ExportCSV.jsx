import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";

function ExportCSV() {
  const { products } = useContext(InventoryContext);

  function exportCSV() {
    if (products.length === 0) {
      alert("No products available");
      return;
    }

    const headers = [
      "Name",
      "Category",
      "SKU",
      "Supplier",
      "Price",
      "Stock",
      "Status",
    ];

    const rows = products.map((product) => [
      product.name,
      product.category,
      product.sku || "",
      product.supplier || "",
      product.price,
      product.stock,
      product.stock === 0
        ? "Out of Stock"
        : product.stock <= 10
        ? "Low Stock"
        : "In Stock",
    ]);

    const csvData = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvData],
      { type: "text/csv" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "inventory-report.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCSV}
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginBottom: "20px",
      }}
    >
      📄 Export CSV
    </button>
  );
}

export default ExportCSV;