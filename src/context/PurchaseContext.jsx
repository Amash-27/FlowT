import { createContext, useEffect, useState } from "react";

export const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem("purchases");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "purchases",
      JSON.stringify(purchases)
    );
  }, [purchases]);

  function addPurchase(purchase) {
    setPurchases((prev) => [
      ...prev,
      {
        ...purchase,
        id: Date.now(),
      },
    ]);
  }

  function deletePurchase(id) {
    setPurchases((prev) =>
      prev.filter(
        (purchase) => purchase.id !== id
      )
    );
  }

  function clearPurchases() {
    setPurchases([]);
  }

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        addPurchase,
        deletePurchase,
        clearPurchases,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}