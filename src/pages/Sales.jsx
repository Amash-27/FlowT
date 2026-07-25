import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";

import InvoiceButton from "../components/InvoiceButton";

import { InventoryContext } from "../context/InventoryContext";
import { SalesContext } from "../context/SalesContext";

import "../styles/sales.css";


function Sales() {


const {products,setProducts}
=
useContext(InventoryContext);


const {sales,addSale}
=
useContext(SalesContext);



const [customer,setCustomer]=useState({

name:"",
phone:"",
email:""

});



const [sale,setSale]=useState({

productId:"",
quantity:1

});




const selectedProduct =
products.find(
product =>
product.id === Number(sale.productId)
);




const total =
selectedProduct
?
Number(selectedProduct.price)
*
Number(sale.quantity)
:
0;




function handleSale(e){

e.preventDefault();



if(!customer.name || !customer.phone){

alert("Enter customer details");

return;

}



if(!selectedProduct){

alert("Select product");

return;

}




if(Number(sale.quantity)>Number(selectedProduct.stock)){

alert("Not enough stock");

return;

}




const newSale={

id:uuidv4(),

invoice:"INV-"+Date.now(),


customer,

productId:selectedProduct.id,

product:selectedProduct.name,

quantity:Number(sale.quantity),

amount:Number(total),

date:new Date().toLocaleString()

};



addSale(newSale);



setProducts(

products.map(product=>

product.id===selectedProduct.id

?

{

...product,

stock:
Number(product.stock)
-
Number(sale.quantity)

}

:

product

)

);



setCustomer({

name:"",
phone:"",
email:""

});


setSale({

productId:"",
quantity:1

});


alert("Sale completed");

}





return(


<motion.div

className="dashboard"

initial={{opacity:0}}

animate={{opacity:1}}

>



<div className="sales-header">


<h1>

<FaCartShopping/>

 Sales Management

</h1>


<p>
Create sales, manage customers and generate invoices.
</p>


</div>





<div className="sales-card">


<h2>
New Sale
</h2>



<form onSubmit={handleSale}>


<input

placeholder="Customer Name"

value={customer.name}

onChange={(e)=>
setCustomer({
...customer,
name:e.target.value
})
}

/>



<input

placeholder="Phone Number"

value={customer.phone}

onChange={(e)=>
setCustomer({
...customer,
phone:e.target.value
})
}

/>



<input

type="email"

placeholder="Email"

value={customer.email}

onChange={(e)=>
setCustomer({
...customer,
email:e.target.value
})
}

/>





<select

value={sale.productId}

onChange={(e)=>
setSale({
...sale,
productId:e.target.value
})
}

>


<option value="">
Select Product
</option>


{
products.map(product=>(

<option

key={product.id}

value={product.id}

disabled={product.stock===0}

>

{product.name}
-
Stock:
{product.stock}

</option>

))

}


</select>




<input

type="number"

min="1"

value={sale.quantity}

onChange={(e)=>
setSale({
...sale,
quantity:e.target.value
})
}

/>



<div className="sale-total">

Total:

<strong>
₹ {total.toFixed(2)}
</strong>


</div>




<button>

Complete Sale

</button>



</form>



</div>





<div className="table-card">


<h2>
Sales History
</h2>


<table>

<thead>

<tr>

<th>Invoice</th>
<th>Customer</th>
<th>Product</th>
<th>Qty</th>
<th>Amount</th>
<th>Date</th>
<th></th>

</tr>

</thead>



<tbody>


{
sales.length>0

?

sales.map(item=>(


<tr key={item.id}>


<td>
{item.invoice}
</td>


<td>

{item.customer.name}

</td>


<td>
{item.product}
</td>


<td>
{item.quantity}
</td>


<td>
₹ {item.amount.toFixed(2)}
</td>


<td>
{item.date}
</td>


<td>

<InvoiceButton sale={item}/>

</td>


</tr>


))


:

<tr>

<td colSpan="7">

No sales available

</td>

</tr>


}



</tbody>


</table>


</div>




</motion.div>


);


}


export default Sales;