import { useContext } from "react";
import { motion } from "framer-motion";
import { FaTriangleExclamation } from "react-icons/fa6";

import { InventoryContext } from "../context/InventoryContext";

import "../styles/lowStock.css";


function LowStockAlert() {


  const { products } =
    useContext(InventoryContext);



  const lowStockProducts =
    products.filter(
      product =>
      product.stock <= 10
    );



  return (

    <motion.div

      className="low-stock-card"

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

    >


      <div className="low-stock-header">


        <div className="alert-icon">

          <FaTriangleExclamation />

        </div>



        <div>

          <h2>
            Low Stock Alert
          </h2>


          <p>
            Products that need restocking
          </p>

        </div>


      </div>




      {
        lowStockProducts.length > 0 ?

        (

        <div className="stock-list">


        {
          lowStockProducts.map(product=>(


          <div

            className="stock-item"

            key={product.id}

          >


            <div>

              <h4>
                {product.name}
              </h4>


              <span>
                {product.category}
              </span>

            </div>



            <div className="stock-number">

              {product.stock}

              <small>
                left
              </small>

            </div>



          </div>


          ))

        }


        </div>


        )


        :


        (

        <div className="safe-stock">

          ✅ All products have sufficient stock

        </div>

        )

      }



    </motion.div>

  );

}


export default LowStockAlert;