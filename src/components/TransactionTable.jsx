import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPen,
  FaTrash,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import { TransactionContext } from "../context/TransactionContext";
import "../styles/table.css";

function TransactionTable() {

  const [search, setSearch] = useState("");

  const {
    transactions,
    deleteTransaction,
    setEditingTransaction,
  } = useContext(TransactionContext);


  const filteredTransactions =
    transactions.filter((item) =>
      item.customer
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  return (

    <motion.div
      className="table-card"
      initial={{
        opacity:0,
        y:30
      }}
      animate={{
        opacity:1,
        y:0
      }}
    >

      <div className="table-header">

        <div>
          <h2>
            Recent Transactions
          </h2>

          <p>
            Track your latest business activity
          </p>
        </div>


        <div className="search-box">

          <FaMagnifyingGlass />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
          />

        </div>


      </div>



      <div className="table-wrapper">

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>

        </thead>


        <tbody>


        {
          filteredTransactions.length > 0 ?

          filteredTransactions.map((item)=>(

            <tr key={item.id}>

              <td>
                {item.date}
              </td>


              <td>
                {item.customer}
              </td>


              <td>

                <span
                  className={
                    item.type === "Sale"
                    ? "badge sale"
                    : "badge expense"
                  }
                >

                  {item.type}

                </span>

              </td>


              <td className="amount">

                ₹ {item.amount.toLocaleString()}

              </td>



              <td>


                <button

                  className="icon-btn edit"

                  onClick={()=>
                    setEditingTransaction(item)
                  }

                >

                  <FaPen />

                </button>



                <button

                  className="icon-btn delete"

                  onClick={()=>
                    deleteTransaction(item.id)
                  }

                >

                  <FaTrash />

                </button>


              </td>


            </tr>

          ))

          :

          <tr>

            <td
              colSpan="5"
              className="empty"
            >
              No transactions found.
            </td>

          </tr>

        }


        </tbody>


      </table>

      </div>


    </motion.div>

  );
}


export default TransactionTable;