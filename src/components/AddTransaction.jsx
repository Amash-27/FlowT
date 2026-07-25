import { useContext, useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";

function AddTransaction() {

 const {
  addTransaction,
  editingTransaction,
  updateTransaction,
} = useContext(TransactionContext);

  const [form, setForm] = useState({
    customer: "",
    amount: "",
    type: "Sale",
  });
  useEffect(() => {
  if (editingTransaction) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      customer: editingTransaction.customer,
      amount: editingTransaction.amount,
      type: editingTransaction.type,
    });
  }
}, [editingTransaction]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingTransaction) {
      updateTransaction({
        ...editingTransaction,
        customer: form.customer,
        amount: Number(form.amount),
        type: form.type,
      });
    } else {
      addTransaction({
        customer: form.customer,
        amount: Number(form.amount),
        type: form.type,
        date: new Date().toISOString().split("T")[0],
      });
    }

    setForm({
      customer: "",
      amount: "",
      type: "Sale",
    });
  }

  return (
    <div className="table-card">

      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option>Sale</option>
          <option>Expense</option>
        </select>

        <button type="submit">
  {editingTransaction ? "Update" : "Add"}
</button>

      </form>

    </div>
  );
}

export default AddTransaction;