import { motion } from "framer-motion";

import AddProduct from "../components/AddProduct";
import ProductTable from "../components/ProductTable";
import InventoryStats from "../components/InventoryStats";
import LowStockAlert from "../components/LowStockAlert";
import ExportCSV from "../components/ExportCSV";
import ExportPDF from "../components/ExportPDF";
import InventoryAnalytics from "../components/InventoryAnalytics";

import "../styles/inventory.css";


function Inventory() {

  return (

    <motion.div
      className="dashboard inventory-page"

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:.4
      }}

    >


      <div className="page-header">

        <div>

          <h1>
            📦 Inventory Management
          </h1>

          <p>
            Manage products, stock levels and inventory performance.
          </p>

        </div>


        <div className="export-buttons">

          <ExportCSV />

          <ExportPDF />

        </div>


      </div>



      <InventoryAnalytics />



      <InventoryStats />



      <LowStockAlert />



      <div className="product-section">


        <div className="section-title">

          <h2>
            Add New Product
          </h2>

          <p>
            Create and manage your product catalogue.
          </p>

        </div>


        <AddProduct />


      </div>




      <div className="product-section">


        <div className="section-title">

          <h2>
            Product Inventory
          </h2>


          <p>
            View, search and update your products.
          </p>


        </div>


        <ProductTable />


      </div>


    </motion.div>

  );

}


export default Inventory;