import { useContext } from "react";
import { motion } from "framer-motion";

import {
  FaBoxOpen,
  FaMoneyBillTrendUp,
  FaTriangleExclamation,
  FaLayerGroup,
} from "react-icons/fa6";

import { InventoryContext } from "../context/InventoryContext";

import "../styles/inventoryStats.css";


function InventoryStats() {


  const { products } = useContext(InventoryContext);



  const totalProducts =
    products.length;



  const totalStockValue =
    products.reduce(
      (total, product) =>
        total +
        Number(product.price) *
        Number(product.stock),
      0
    );



  const lowStockProducts =
    products.filter(
      product =>
      product.stock <= 10
    ).length;



  const totalCategories =
    [
      ...new Set(
        products.map(
          product =>
          product.category
        )
      )
    ].length;




  const stats = [

    {
      title:"Total Products",
      value:totalProducts,
      icon:<FaBoxOpen/>
    },


    {
      title:"Stock Value",
      value:`₹ ${totalStockValue.toLocaleString()}`,
      icon:<FaMoneyBillTrendUp/>
    },


    {
      title:"Low Stock",
      value:lowStockProducts,
      icon:<FaTriangleExclamation/>
    },


    {
      title:"Categories",
      value:totalCategories,
      icon:<FaLayerGroup/>
    }

  ];





return (

<div className="stats-container">


{
stats.map((item,index)=>(


<motion.div

className="stat-card"

key={item.title}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index * 0.1
}}



whileHover={{
y:-6
}}

>


<div className="stat-icon">

{item.icon}

</div>



<div>

<h3>
{item.title}
</h3>


<p>
{item.value}
</p>


</div>



</motion.div>


))

}



</div>

);


}


export default InventoryStats;