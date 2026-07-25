import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionContext = createContext();

function TransactionProvider({ children }) {

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        customer: "Rahul",
        amount: 2500,
        type: "Sale",
        date: "2026-07-23",
      },
      {
        id: 2,
        customer: "Aman",
        amount: 800,
        type: "Expense",
        date: "2026-07-23",
      },
    ];
  });
    const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function addTransaction(transaction)
   {
    setTransactions((prev) => [
      ...prev,
      {
        ...transaction,
        id: Date.now(),
      },
    ]);
  }
function deleteTransaction(id) {
  setTransactions((prev) =>
    prev.filter((transaction) => transaction.id !== id)
  );
}
function updateTransaction(updatedTransaction) {
  setTransactions((prev) =>
    prev.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction
    )
  );

  setEditingTransaction(null);
}
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        editingTransaction,
        setEditingTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionProvider };