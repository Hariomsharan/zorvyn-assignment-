import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRole } from "./store/financeSlice";
import {
  LayoutDashboard,
  ReceiptText,
  UserCircle,
  PieChart as ChartIcon,
} from "lucide-react";
import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";
import DashboardCharts from "./components/DashboardCharts";
import MobileHeader from "./components/MobileHeader";

function App() {
  const { role } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 font-bold text-2xl text-blue-600">FinDash</div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<ReceiptText size={20} />} label="Transactions" />
          <NavItem icon={<ChartIcon size={20} />} label="Insights" />
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <UserCircle size={18} className="text-gray-400" />
            <span className="text-sm font-medium">{role}</span>
          </div>
          <button
            onClick={() => dispatch(setRole(role === "Admin" ? "Viewer" : "Admin"))}
            className="w-full text-xs py-1.5 border rounded hover:bg-gray-50"
          >
            Switch Role
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <MobileHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="hidden md:flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Financial Overview
            </h2>
            <div className="text-sm text-gray-500">Welcome, {role}!</div>
          </header>

          <SummaryCards />
          <DashboardCharts />
          
          <div className="grid grid-cols-1 gap-8 mt-8">
            <TransactionTable />
          </div>
        </main>
      </div>
    </div>

  );
}

const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default App;
