import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole, setActiveTab } from '../store/financeSlice';
import { Menu, X, UserCircle, LayoutDashboard, ReceiptText, PieChart } from 'lucide-react';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, activeTab } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  const menuItems = [
    { id: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { id: 'Transactions', icon: <ReceiptText size={20}/> },
    { id: 'Insights', icon: <PieChart size={20}/> },
  ];

  const handleNav = (id) => {
    dispatch(setActiveTab(id));
    setIsOpen(false);
  };

  return (
    <nav className="md:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl text-blue-600 italic">FinDash</div>
        
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-xl p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.id}</span>
              </button>
            ))}
          </div>

          {/* Role Switcher Section */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <UserCircle size={20} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-700">{role}</span>
              </div>
              <button 
                onClick={() => dispatch(setRole(role === 'Admin' ? 'Viewer' : 'Admin'))}
                className="text-xs font-bold text-blue-600 underline"
              >
                Switch Role
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileHeader;