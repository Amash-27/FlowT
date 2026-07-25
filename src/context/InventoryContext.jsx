import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const InventoryContext = createContext();

function InventoryProvider({ children }) {
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      return JSON.parse(savedProducts);
    }

    return [
      {
        id: 1,
        name: "Rice",
        category: "Food",
        sku: "FOOD001",
        supplier: "ABC Traders",
        price: 60,
        stock: 50,
        image: "",
      },
      {
        id: 2,
        name: "Milk",
        category: "Dairy",
        sku: "DAIRY001",
        supplier: "Fresh Dairy",
        price: 30,
        stock: 20,
        image: "",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  function addProduct(product) {
    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      sku: product.sku,
      supplier: product.supplier,
      price: Number(product.price),
      stock: Number(product.stock),
      image: product.image || "",
    };

    setProducts((prev) => [...prev, newProduct]);
  }

  function deleteProduct(id) {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  }

  function updateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id
          ? {
              ...updatedProduct,
              price: Number(updatedProduct.price),
              stock: Number(updatedProduct.stock),
            }
          : product
      )
    );

    setEditingProduct(null);
  }
    function clearEditing() {
    setEditingProduct(null);
  }

  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total + product.price * product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  );

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  );

  return (
    <InventoryContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        deleteProduct,
        updateProduct,

        editingProduct,
        setEditingProduct,
        clearEditing,

        totalProducts,
        totalInventoryValue,
        lowStockProducts,
        outOfStockProducts,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export { InventoryProvider };