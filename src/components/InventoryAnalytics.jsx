import { useContext, useMemo } from "react";
import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { FaChartPie } from "react-icons/fa6";

import { InventoryContext } from "../context/InventoryContext";

import "../styles/inventoryAnalytics.css";


function InventoryAnalytics() {


  const { products } =
    useContext(InventoryContext);



  const inventoryValue =
    products.reduce(
      (sum, product)=>
      sum +
      Number(product.price) *
      Number(product.stock),

      0
    );




  const categoryData = useMemo(()=>{


    const data={};



    products.forEach(product=>{


      if(data[product.category]){

        data[product.category]
        += Number(product.stock);

      }

      else{

        data[product.category]
        =
        Number(product.stock);

      }


    });



    return Object.keys(data).map(
      category=>({

        name:category,

        value:data[category]

      })
    );


  },[products]);





  const COLORS=[

    "#4f46e5",

    "#7c3aed",

    "#2563eb",

    "#16a34a",

    "#f59e0b",

    "#dc2626"

  ];





return (

<motion.div

className="analytics-card"


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}

>



<div className="analytics-header">


<div>

<h2>

<FaChartPie/>

 Stock Distribution

</h2>


<p>
Inventory quantity by category
</p>

</div>



<div className="value-box">

<span>
Inventory Value
</span>


<strong>

₹ {inventoryValue.toLocaleString()}

</strong>


</div>


</div>





<div className="pie-container">


{
categoryData.length > 0 ?


<ResponsiveContainer

width="100%"

height={350}

>


<PieChart>


<Pie

data={categoryData}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius={120}

label

>


{
categoryData.map(
(entry,index)=>(

<Cell

key={`cell-${index}`}

fill={
COLORS[
index % COLORS.length
]
}

/>

)

)
}



</Pie>


<Tooltip/>


<Legend/>




</PieChart>


</ResponsiveContainer>


:


<div className="no-data">

No inventory data available

</div>

}


</div>



</motion.div>

);


}


export default InventoryAnalytics;