import { useGetTransactionsQuery } from '../store/apiSlice';
import { Wallet, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

const SummaryCards = () => {
  const { data: transactions = [], isLoading } = useGetTransactionsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10 col-span-3">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  // Logic to calculate totals
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Total Balance" 
        amount={balance} 
        icon={<Wallet className="text-blue-600" />} 
        bgColor="bg-blue-50" 
      />
      <Card 
        title="Total Income" 
        amount={income} 
        icon={<TrendingUp className="text-green-600" />} 
        bgColor="bg-green-50" 
      />
      <Card 
        title="Total Expenses" 
        amount={expenses} 
        icon={<TrendingDown className="text-red-600" />} 
        bgColor="bg-red-50" 
      />
    </div>
  );
};

const Card = ({ title, amount, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">
        ${amount.toLocaleString()}
      </h3>
    </div>
    <div className={`p-3 rounded-xl ${bgColor}`}>
      {icon}
    </div>
  </div>
);

export default SummaryCards;