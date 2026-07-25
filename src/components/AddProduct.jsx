import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa6";

import { InventoryContext } from "../context/InventoryContext";

import "../styles/addproduct.css";


function AddProduct() {

  const {
    addProduct,
    updateProduct,
    editingProduct,
    clearEditing,
  } = useContext(InventoryContext);


  const [form,setForm] = useState({
    name:"",
    category:"",
    sku:"",
    supplier:"",
    price:"",
    stock:"",
    image:"",
  });


  const [preview,setPreview] = useState("");



  useEffect(()=>{

    if(editingProduct){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name:editingProduct.name || "",
        category:editingProduct.category || "",
        sku:editingProduct.sku || "",
        supplier:editingProduct.supplier || "",
        price:editingProduct.price || "",
        stock:editingProduct.stock || "",
        image:editingProduct.image || "",
      });

      setPreview(editingProduct.image || "");

    }

  },[editingProduct]);



  function handleChange(e){

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  }



  function handleImage(e){

    const file=e.target.files[0];

    if(!file)return;


    const reader=new FileReader();


    reader.onloadend=()=>{

      setPreview(reader.result);


      setForm(prev=>({
        ...prev,
        image:reader.result
      }));

    };


    reader.readAsDataURL(file);

  }



  function resetForm(){

    setForm({
      name:"",
      category:"",
      sku:"",
      supplier:"",
      price:"",
      stock:"",
      image:"",
    });


    setPreview("");

    clearEditing();

  }



  function handleSubmit(e){

    e.preventDefault();


    if(
      !form.name ||
      !form.category ||
      !form.sku ||
      !form.supplier ||
      !form.price ||
      !form.stock
    ){

      alert("Please fill all fields");

      return;

    }



    const product={

      ...form,

      price:Number(form.price),

      stock:Number(form.stock)

    };



    if(editingProduct){

      updateProduct({
        ...editingProduct,
        ...product
      });


    }else{

      addProduct(product);

    }



    resetForm();

  }




  return (

    <motion.form

      className="product-form"

      onSubmit={handleSubmit}

      initial={{
        opacity:0,
        y:20
      }}

      animate={{
        opacity:1,
        y:0
      }}

    >


      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
      />



      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >

        <option value="">
          Select Category
        </option>

        <option>Food</option>
        <option>Dairy</option>
        <option>Beverages</option>
        <option>Snacks</option>
        <option>Personal Care</option>
        <option>Household</option>
        <option>Electronics</option>
        <option>Stationery</option>


      </select>



      <input
        name="sku"
        placeholder="SKU"
        value={form.sku}
        onChange={handleChange}
      />



      <input
        name="supplier"
        placeholder="Supplier"
        value={form.supplier}
        onChange={handleChange}
      />



      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />



      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={form.stock}
        onChange={handleChange}
      />




      <label className="upload-box">

        <FaUpload />

        Upload Product Image


        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </label>




      {
        preview &&

        <div className="image-preview">

          <img
            src={preview}
            alt="preview"
          />

        </div>

      }





      <div className="form-actions">


        <button type="submit">

          {
            editingProduct
            ?
            "Update Product"
            :
            "Add Product"
          }

        </button>



        {
          editingProduct &&

          <button

            type="button"

            className="cancel-btn"

            onClick={resetForm}

          >

            Cancel

          </button>

        }


      </div>



    </motion.form>

  );

}


export default AddProduct;