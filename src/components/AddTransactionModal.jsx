import { useState } from 'react';
import { useAddTransactionMutation } from '../store/apiSlice';
import { X, Loader2 } from 'lucide-react';

const AddTransactionModal = ({ isOpen, onClose }) => {
  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction({ 
        ...formData, 
        amount: Number(formData.amount),
        id: Date.now().toString() 
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to add:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">New Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input 
              required type="number" 
              className="w-full p-3 border rounded-xl"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              required type="text" placeholder="e.g. Groceries"
              className="w-full p-3 border rounded-xl"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                className="w-full p-3 border rounded-xl"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" className="w-full p-3 border rounded-xl"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          <button 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;