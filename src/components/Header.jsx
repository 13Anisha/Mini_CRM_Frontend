import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, Search, User, ChevronDown, LogOut, Star } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    window.location.href = 'http://localhost:5000/api/auth/logout';
  };

  const getPageTitle = () => {
    const path = location.pathname.split("/")[1];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : "Home";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Star className="text-white" size={20} />
            </div>
            <Link to="/" className="ml-2 text-xl font-bold text-gray-900">
              MiniCRM
            </Link>
          </div>
          {user && (
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium ${location.pathname === "/dashboard" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/customers" 
                className={`text-sm font-medium ${location.pathname === "/customers" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
              >
                Customers
              </Link>
              <Link 
                to="/orders" 
                className={`text-sm font-medium ${location.pathname === "/orders" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
              >
                Orders
              </Link>
              <Link 
                to="/campaigns" 
                className={`text-sm font-medium ${location.pathname === "/campaigns" ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
              >
                Campaigns
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none w-64"
                />
              </div>
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell className="text-gray-600" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                  {user.photos && user.photos[0] ? (
                    <img 
                      src={user.photos[0].value} 
                      alt={user.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-indigo-600" size={18} />
                  )}
                </div>
                <span className="ml-2 hidden md:block text-sm font-medium">
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="ml-1 text-gray-500 hidden md:block" size={16} />
              </div>
              <button 
                onClick={handleLogout}
                className="hidden md:flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <LogOut size={16} className="mr-1" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/customers" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Customers
                </Link>
                <Link 
                  to="/orders" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  to="/campaigns" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Campaigns
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
