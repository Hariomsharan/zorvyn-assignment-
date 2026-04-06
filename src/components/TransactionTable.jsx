import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
} from "../store/apiSlice";
import { setSearchQuery, setSortBy } from "../store/financeSlice";
import { ArrowUpDown, Plus, Search, Trash2 } from "lucide-react";
import AddTransactionModal from "./AddTransactionModal";

const TransactionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [deleteTransaction] = useDeleteTransactionMutation();

  const { role, filters } = useSelector((state) => state.finance);
  const { data: transactions = [], isLoading } = useGetTransactionsQuery();

  const filteredTransactions = transactions.filter((tx) =>
    tx.category.toLowerCase().includes(filters.searchQuery.toLowerCase()),
  );

  let displayData = transactions.filter((tx) =>
    tx.category.toLowerCase().includes(filters.searchQuery.toLowerCase()),
  );

  displayData = [...displayData].sort((a, b) => {
    if (filters.sortBy === "amount-high") return b.amount - a.amount;
    if (filters.sortBy === "amount-low") return a.amount - b.amount;
    if (filters.sortBy === "date-new")
      return new Date(b.date) - new Date(a.date);
    if (filters.sortBy === "date-old")
      return new Date(a.date) - new Date(b.date);
    return 0;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id).unwrap();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 border rounded-xl px-3 py-2 bg-gray-50">
            <ArrowUpDown size={16} />
            <select
              className="bg-transparent focus:outline-none cursor-pointer font-medium"
              value={filters.sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <option value="date-old">Oldest First</option>
              <option value="date-new">Newest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none"
              value={filters.searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>

          {role === "Admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {role === "Admin" && (
                <th className="px-6 py-4 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayData.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {tx.category}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td
                  className={`px-6 py-4 text-sm font-bold text-right ${
                    tx.type === "income" ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {tx.type === "expense" ? "-" : "+"}$
                  {tx.amount.toLocaleString()}
                </td>
                {role === "Admin" && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(tx.id)} // 3. Attach the click handler
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTransactions.length === 0 && !isLoading && (
          <div className="p-12 text-center text-gray-500">
            No transactions found for "{filters.searchQuery}"
          </div>
        )}
      </div>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TransactionTable;
