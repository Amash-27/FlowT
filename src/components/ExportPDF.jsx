import { useContext } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InventoryContext } from "../context/InventoryContext";

function ExportPDF() {
  const { products } = useContext(InventoryContext);

  function exportPDF() {
    if (products.length === 0) {
      alert("No products available");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(
      "Inventory Report",
      14,
      20
    );

    doc.setFontSize(11);
    doc.text(
      `Generated Date: ${new Date().toLocaleDateString()}`,
      14,
      30
    );

   const tableData = products.map((product) => [
  product.name,
  product.category,
  product.sku || "-",
  product.supplier || "-",
  `Rs. ${Number(product.price).toFixed(2)}`,
  Number(product.stock),
  product.stock === 0
    ? "Out of Stock"
    : product.stock <= 10
    ? "Low Stock"
    : "In Stock",
]);
    autoTable(doc, {
  startY: 40,

  head: [
    [
      "Product",
      "Category",
      "SKU",
      "Supplier",
      "Price",
      "Stock",
      "Status",
    ],
  ],

  body: tableData,

  theme: "grid",

  styles: {
    fontSize: 9,
  },

  columnStyles: {
    4: {
      halign: "right",
    },
    5: {
      halign: "center",
    },
  },
});

    doc.save(
      "inventory-report.pdf"
    );
  }

  return (
    <button
      onClick={exportPDF}
      style={{
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginLeft: "10px",
        marginBottom: "20px",
      }}
    >
      📄 Export PDF
    </button>
  );
}

export default ExportPDF;