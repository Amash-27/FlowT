import { useContext, useEffect, useState } from "react";
import { SupplierContext } from "../context/SupplierContext";

function Supplier() {
  const {
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  } = useContext(SupplierContext);

  const [editingSupplier, setEditingSupplier] =
    useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (editingSupplier) {
      setForm({
        name: editingSupplier.name,
        company: editingSupplier.company,
        phone: editingSupplier.phone,
        email: editingSupplier.email,
        address: editingSupplier.address,
      });
    }
  }, [editingSupplier]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function resetForm() {
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      address: "",
    });

    setEditingSupplier(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.company ||
      !form.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingSupplier) {
      updateSupplier({
        ...editingSupplier,
        ...form,
      });

      alert("Supplier updated.");
    } else {
      addSupplier(form);

      alert("Supplier added.");
    }

    resetForm();
  }

  const filteredSuppliers =
    suppliers.filter((supplier) =>
      (
        supplier.name +
        supplier.company +
        supplier.phone +
        supplier.email
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="dashboard">

      <h1>🚚 Supplier Management</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <button type="submit">
          {editingSupplier
            ? "Update Supplier"
            : "Add Supplier"}
        </button>
      </form>

      <div className="table-card">

        <h2>Supplier List</h2>

        <input
          type="text"
          placeholder="Search Supplier..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            marginBottom: "15px",
            width: "100%",
          }}
        />

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Company</th>

              <th>Phone</th>

              <th>Email</th>

              <th>Address</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>
                      {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>

                  <td>{supplier.company}</td>

                  <td>{supplier.phone}</td>

                  <td>{supplier.email}</td>

                  <td>{supplier.address}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setEditingSupplier(
                          supplier
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Delete this supplier?"
                          )
                        ) {
                          deleteSupplier(
                            supplier.id
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
          </div>
  );
}

export default Supplier;