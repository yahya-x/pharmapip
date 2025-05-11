import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  TruckIcon, 
  Users, 
  User, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  Pill
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/inventory', name: 'Inventory', icon: <Package size={20} /> },
    { path: '/sales', name: 'Sales', icon: <ShoppingCart size={20} /> },
    { path: '/purchases', name: 'Purchases', icon: <TruckIcon size={20} /> },
    { path: '/suppliers', name: 'Suppliers', icon: <Users size={20} /> },
    { path: '/customers', name: 'Customers', icon: <User size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart2 size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed bottom-4 right-4 z-50 md:hidden bg-primary-500 text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for desktop */}
      <div
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <Pill size={28} className="text-primary-500" />
            {!isCollapsed && <span className="ml-2 font-bold text-xl text-gray-800">PharmaSys</span>}
          </div>
          <button
            onClick={toggleSidebar}
            className={`text-gray-500 hover:text-gray-700 ${isCollapsed ? 'hidden' : ''}`}
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="flex-1">
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="px-2 py-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'hover:bg-gray-100'
                      } ${isCollapsed ? 'justify-center' : ''}`
                    }
                  >
                    <span className="text-center">{item.icon}</span>
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {user?.fullName?.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={toggleMobileSidebar}></div>
        
        <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform ease-in-out duration-300 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Pill size={28} className="text-primary-500" />
              <span className="ml-2 font-bold text-xl text-gray-800">PharmaSys</span>
            </div>
            <button onClick={toggleMobileSidebar} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col flex-1 py-4 overflow-y-auto">
            <nav className="flex-1">
              <ul>
                {navItems.map((item) => (
                  <li key={item.path} className="px-2 py-1">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'hover:bg-gray-100'
                        }`
                      }
                      onClick={toggleMobileSidebar}
                    >
                      <span>{item.icon}</span>
                      <span className="ml-3">{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {user?.fullName?.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;