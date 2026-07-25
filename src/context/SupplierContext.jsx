import { createContext, useEffect, useState } from "react";

export const SupplierContext = createContext();

export function SupplierProvider({ children }) {
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem("suppliers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "suppliers",
      JSON.stringify(suppliers)
    );
  }, [suppliers]);

  function addSupplier(supplier) {
    setSuppliers((prev) => [
      ...prev,
      {
        ...supplier,
        id: Date.now(),
      },
    ]);
  }

  function updateSupplier(updatedSupplier) {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === updatedSupplier.id
          ? updatedSupplier
          : supplier
      )
    );
  }

  function deleteSupplier(id) {
    setSuppliers((prev) =>
      prev.filter(
        (supplier) => supplier.id !== id
      )
    );
  }

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}