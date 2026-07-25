import {
  createContext,
  useEffect,
  useState,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SalesContext =
  createContext();

function SalesProvider({
  children,
}) {

  const [sales, setSales] =
    useState(() => {

      const saved =
        localStorage.getItem("sales");

      return saved
        ? JSON.parse(saved)
        : [];

    });


  useEffect(() => {

    localStorage.setItem(
      "sales",
      JSON.stringify(sales)
    );

  }, [sales]);
    function addSale(newSale) {
    setSales((prev) => [
      ...prev,
      newSale,
    ]);
  }

  function deleteSale(id) {
    setSales((prev) =>
      prev.filter(
        (sale) => sale.id !== id
      )
    );
  }

  function clearSales() {
    setSales([]);
  }

  return (
    <SalesContext.Provider
      value={{
        sales,
        addSale,
        deleteSale,
        clearSales,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

export { SalesProvider };

export default SalesContext;