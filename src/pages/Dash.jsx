import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  Menu, X, Home, Users, Layers, Settings, BarChart3, Package, 
  Star, TrendingUp, Calendar, Users as UsersIcon, MessageSquare
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import apiClient from "../utils/apiClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dash() {
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const [dashboardData, setDashboardData] = useState({
    stats: {
      activeCampaigns: 0,
      totalCustomers: 0,
      totalOrders: 0,
      deliveryRate: 0
    },
    changes: {
      campaignsChange: 0,
      customersChange: 0,
      ordersChange: 0
    },
    recentCampaigns: [],
    customerGrowth: [],
    campaignStatus: {
      sent: 0,
      failed: 0,
      pending: 0
    }
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/dashboard');
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const menus = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Campaigns", icon: <BarChart3 size={20} />, path: "/campaigns" },
    { name: "Orders", icon: <Package size={20} />, path: "/orders" },
    { name: "Customers", icon: <Users size={20} />, path: "/customers" },
    { name: "Segments", icon: <Layers size={20} />, path: "/segments" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  const widgets = [
    { 
      title: "Active Campaigns", 
      value: loading ? "..." : dashboardData.stats.activeCampaigns, 
      change: loading ? "..." : `${dashboardData.changes.campaignsChange > 0 ? '+' : ''}${dashboardData.changes.campaignsChange}`, 
      changeType: dashboardData.changes.campaignsChange >= 0 ? "positive" : "negative",
      icon: <BarChart3 className="text-indigo-500" size={24} />,
      color: "bg-indigo-100"
    },
    { 
      title: "Total Customers", 
      value: loading ? "..." : dashboardData.stats.totalCustomers, 
      change: loading ? "..." : `${dashboardData.changes.customersChange > 0 ? '+' : ''}${dashboardData.changes.customersChange}`, 
      changeType: dashboardData.changes.customersChange >= 0 ? "positive" : "negative",
      icon: <Users className="text-green-500" size={24} />,
      color: "bg-green-100"
    },
    { 
      title: "Orders", 
      value: loading ? "..." : dashboardData.stats.totalOrders, 
      change: loading ? "..." : `${dashboardData.changes.ordersChange > 0 ? '+' : ''}${dashboardData.changes.ordersChange}`, 
      changeType: dashboardData.changes.ordersChange >= 0 ? "positive" : "negative",
      icon: <Package className="text-blue-500" size={24} />,
      color: "bg-blue-100"
    },
    {
      title: "Delivery Rate",
      value: loading ? "..." : `${dashboardData.stats.deliveryRate}%`,
      change: loading ? "..." : "+2.4%",
      changeType: "positive",
      icon: <MessageSquare className="text-purple-500" size={24} />,
      color: "bg-purple-100"
    }
  ];

  const campaignsChartData = {
    labels: dashboardData.recentCampaigns.map(campaign => campaign.name),
    datasets: [
      {
        label: 'Audience Size',
        data: dashboardData.recentCampaigns.map(campaign => campaign.audienceSize),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  const customerGrowthData = {
    labels: dashboardData.customerGrowth.map(growth => growth.month),
    datasets: [
      {
        label: 'New Customers',
        data: dashboardData.customerGrowth.map(growth => growth.count),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const campaignStatusData = {
    labels: ['Sent', 'Failed', 'Pending'],
    datasets: [
      {
        data: [
          dashboardData.campaignStatus.sent,
          dashboardData.campaignStatus.failed,
          dashboardData.campaignStatus.pending
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recent Campaigns' },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Customer Growth' },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Campaign Status' },
    },
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="md:hidden fixed top-16 left-4 z-40">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div 
        className={`${open ? "w-64" : "w-20"} ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static h-full bg-white shadow-lg z-30 transition-all duration-300 ease-in-out flex flex-col mt-16 md:mt-0`}
      >
        <div className="flex justify-end items-center p-5 border-b">
          <button 
            onClick={() => setOpen(!open)} 
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <ul className="mt-6 flex-1 overflow-y-auto">
          {menus.map((menu, i) => (
            <li key={i} className="mb-1">
              <Link
                to={menu.path}
                className={`flex items-center gap-3 p-3 mx-2 rounded-lg transition-colors ${
                  location.pathname === menu.path 
                    ? "bg-indigo-50 text-indigo-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center justify-center w-6">
                  {menu.icon}
                </span>
                <span className={`${!open && "hidden"} text-sm`}>
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden mt-16 md:mt-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              
            </div>
            <Link 
              to="/campaigns/new"
              className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
            >
              <span>+ New Campaign</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {widgets.map((widget, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{widget.title}</p>
                    <p className="text-3xl font-bold mt-1">{widget.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${widget.color}`}>
                    {widget.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`inline-flex items-center text-sm font-medium ${
                    widget.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {widget.changeType === 'positive' ? 
                      <TrendingUp className="w-4 h-4 mr-1" /> : 
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    }
                    {widget.change} from last week
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Campaigns</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last 7 days
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <Bar options={barChartOptions} data={campaignsChartData} />
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Customer Growth</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Monthly trend
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <Line options={lineChartOptions} data={customerGrowthData} />
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Campaign Status</h2>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <Pie options={pieChartOptions} data={campaignStatusData} />
              )}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.recentCampaigns.slice(0, 5).map((campaign, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                          <BarChart3 className="text-indigo-600" size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'SENT' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'FAILED' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
