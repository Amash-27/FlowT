import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function useTransactions() {
    return useContext(TransactionContext);
}