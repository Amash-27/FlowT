import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPen,
  FaTrash,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import { InventoryContext } from "../context/InventoryContext";
import Pagination from "./Pagination";

import "../styles/producttable.css";


function ProductTable() {

  const {
    products,
    deleteProduct,
    setEditingProduct,
  } = useContext(InventoryContext);



  const [search,setSearch] = useState("");

  const [category,setCategory] = useState("All");

  const [sortBy,setSortBy] = useState("name-asc");



  const [currentPage,setCurrentPage] = useState(1);

  const productsPerPage = 10;



  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);

  },[
    search,
    category,
    sortBy
  ]);



  const categories = useMemo(()=>{

    return [
      "All",
      ...new Set(
        products.map(
          product=>product.category
        )
      )
    ];

  },[products]);




  const filteredProducts = useMemo(()=>{


    let data=[...products];



    data=data.filter(product=>

      (
        product.name+
        " "+
        (product.sku || "")+
        " "+
        (product.supplier || "")

      )
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );



    if(category !== "All"){

      data=data.filter(
        product=>
        product.category===category
      );

    }



    switch(sortBy){

      case "name-asc":

      data.sort((a,b)=>
        a.name.localeCompare(b.name)
      );

      break;


      case "name-desc":

      data.sort((a,b)=>
        b.name.localeCompare(a.name)
      );

      break;



      case "price-low":

      data.sort((a,b)=>
        a.price-b.price
      );

      break;



      case "price-high":

      data.sort((a,b)=>
        b.price-a.price
      );

      break;



      case "stock-low":

      data.sort((a,b)=>
        a.stock-b.stock
      );

      break;



      case "stock-high":

      data.sort((a,b)=>
        b.stock-a.stock
      );

      break;


      default:
      break;

    }


    return data;


  },[
    products,
    search,
    category,
    sortBy
  ]);




  const totalPages=Math.ceil(
    filteredProducts.length /
    productsPerPage
  );



  const lastIndex =
    currentPage *
    productsPerPage;


  const firstIndex =
    lastIndex -
    productsPerPage;



  const currentProducts =
    filteredProducts.slice(
      firstIndex,
      lastIndex
    );




  function getStatus(stock){


    if(stock===0)

      return(
        <span className="badge danger">
          Out Of Stock
        </span>
      );



    if(stock<=10)

      return(
        <span className="badge warning">
          Low Stock
        </span>
      );



    return(

      <span className="badge success">
        In Stock
      </span>

    );

  }





return(


<motion.div

className="table-card"

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<div className="table-header">


<div>

<h2>
Product Inventory
</h2>

<p>
Manage your products and stock
</p>

</div>




<div className="inventory-search">

<FaMagnifyingGlass/>

<input

type="text"

placeholder="Search product, SKU, supplier"

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>

</div>



</div>





<div className="filter-row">


<select

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

>

{
categories.map(cat=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

))
}

</select>




<select

value={sortBy}

onChange={(e)=>
setSortBy(e.target.value)
}

>

<option value="name-asc">
Name A-Z
</option>

<option value="name-desc">
Name Z-A
</option>

<option value="price-low">
Price Low-High
</option>

<option value="price-high">
Price High-Low
</option>

<option value="stock-low">
Stock Low-High
</option>

<option value="stock-high">
Stock High-Low
</option>


</select>


</div>






<div className="table-wrapper">

<table>


<thead>

<tr>

<th>
Image
</th>

<th>
Product
</th>

<th>
Category
</th>

<th>
SKU
</th>

<th>
Supplier
</th>

<th>
Price
</th>

<th>
Stock
</th>

<th>
Status
</th>

<th>
Actions
</th>

</tr>


</thead>



<tbody>


{
currentProducts.length > 0 ?


currentProducts.map(product=>(


<tr key={product.id}>


<td>

{
product.image ?

<img

src={product.image}

alt={product.name}

className="product-image"

/>

:

"No Image"

}

</td>



<td>
{product.name}
</td>



<td>
<span className="category-badge">
{product.category}
</span>
</td>



<td>
{product.sku || "-"}
</td>



<td>
{product.supplier || "-"}
</td>



<td>
₹ {product.price}
</td>



<td>
{product.stock}
</td>



<td>
{getStatus(product.stock)}
</td>



<td>


<button

className="icon-btn edit"

onClick={()=>
setEditingProduct(product)
}

>

<FaPen/>

</button>




<button

className="icon-btn delete"

onClick={()=>
deleteProduct(product.id)
}

>

<FaTrash/>

</button>


</td>


</tr>


))


:


<tr>

<td

colSpan="9"

className="empty"

>

No products found

</td>

</tr>


}


</tbody>


</table>


</div>





<div className="pagination-area">


<p>

Showing 

<b>
{
filteredProducts.length===0
?0
:firstIndex+1
}

</b>

-

<b>
{
Math.min(
lastIndex,
filteredProducts.length
)
}

</b>

of

<b>
{filteredProducts.length}
</b>

products

</p>



<Pagination

currentPage={currentPage}

totalPages={totalPages}

setCurrentPage={setCurrentPage}

/>


</div>



</motion.div>


);


}


export default ProductTable;