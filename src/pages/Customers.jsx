import { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMoneyBillTrendUp,
  FaCartShopping,
} from "react-icons/fa6";

import { SalesContext } from "../context/SalesContext";

import "../styles/customers.css";


function Customers() {


const { sales } =
useContext(SalesContext);



const [search,setSearch]=useState("");



const customers = useMemo(()=>{


const customerMap={};



sales.forEach((sale)=>{


const phone =
sale.customer?.phone;



if(!phone)
return;



if(!customerMap[phone]){


customerMap[phone]={

name:sale.customer.name,

phone:sale.customer.phone,

email:sale.customer.email || "-",

purchases:0,

totalSpent:0,

lastPurchase:sale.date

};


}



customerMap[phone].purchases +=1;


customerMap[phone].totalSpent +=
Number(sale.amount);



customerMap[phone].lastPurchase =
sale.date;



});



return Object.values(customerMap);



},[sales]);






const filteredCustomers =
customers.filter(customer=>

(
customer.name+
" "+
customer.phone

)
.toLowerCase()

.includes(
search.toLowerCase()
)

);






const totalRevenue =
customers.reduce(

(sum,c)=>
sum+c.totalSpent,

0

);







return(


<div className="dashboard">


<div className="page-title">

<h1>
👥 Customers
</h1>


<p>
Manage customer relationships and purchase history
</p>

</div>





<div className="customer-stats">



<motion.div

className="customer-card"

whileHover={{
y:-6
}}

>


<FaUsers/>


<div>

<h3>
Total Customers
</h3>

<p>
{customers.length}
</p>

</div>


</motion.div>





<motion.div

className="customer-card"

whileHover={{
y:-6
}}

>


<FaCartShopping/>


<div>

<h3>
Total Purchases
</h3>


<p>
{sales.length}
</p>

</div>


</motion.div>





<motion.div

className="customer-card"

whileHover={{
y:-6
}}

>


<FaMoneyBillTrendUp/>


<div>

<h3>
Customer Revenue
</h3>


<p>
₹ {totalRevenue.toLocaleString()}
</p>


</div>


</motion.div>




</div>







<div className="table-card customer-table">


<div className="customer-header">

<h2>
Customer List
</h2>



<input

placeholder="🔍 Search customer..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</div>






<table>


<thead>

<tr>

<th>
Name
</th>

<th>
Phone
</th>

<th>
Email
</th>

<th>
Purchases
</th>

<th>
Total Spent
</th>

<th>
Last Purchase
</th>


</tr>

</thead>



<tbody>


{
filteredCustomers.length>0


?


filteredCustomers.map(customer=>(


<motion.tr

key={customer.phone}

initial={{
opacity:0
}}

animate={{
opacity:1
}}

>


<td>
{customer.name}
</td>


<td>
{customer.phone}
</td>


<td>
{customer.email}
</td>


<td>
{customer.purchases}
</td>


<td>

₹ {customer.totalSpent.toFixed(2)}

</td>


<td>
{customer.lastPurchase}
</td>


</motion.tr>


))


:


<tr>

<td colSpan="6">

No customers found

</td>

</tr>


}



</tbody>


</table>


</div>




</div>


);


}


export default Customers;