import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  TruckIcon, 
  AlertTriangle, 
  Clock,
  Calendar,
  TrendingUp,
  Package
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AlertCard from '../components/dashboard/AlertCard';
import ChartCard from '../components/dashboard/ChartCard';
import { Alert, DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [lowStockAlerts, setLowStockAlerts] = useState<Alert[]>([]);
  const [expiryAlerts, setExpiryAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would be an API call
    const fetchDashboardData = () => {
      // Mock data
      const mockStats: DashboardStats = {
        totalSales: 24680,
        totalPurchases: 18450,
        lowStockCount: 12,
        expiringMedicationsCount: 8,
        salesChart: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          data: [4500, 5200, 4800, 5800, 6000, 5600, 6200],
        },
        topSellingMedications: [
          { name: 'Paracetamol 500mg', quantity: 320 },
          { name: 'Amoxicillin 250mg', quantity: 245 },
          { name: 'Lisinopril 10mg', quantity: 180 },
          { name: 'Metformin 500mg', quantity: 156 },
          { name: 'Atorvastatin 20mg', quantity: 140 },
        ],
      };

      const mockLowStockAlerts: Alert[] = [
        {
          id: 1,
          type: 'low-stock',
          severity: 'high',
          message: 'Stock level is critically low (5 units remaining)',
          medicationId: 1,
          medicationName: 'Amoxicillin 500mg',
          isRead: false,
          createdAt: new Date(),
        },
        {
          id: 2,
          type: 'low-stock',
          severity: 'medium',
          message: 'Stock below minimum level (15 units remaining)',
          medicationId: 2,
          medicationName: 'Paracetamol 500mg',
          isRead: false,
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
        },
        {
          id: 3,
          type: 'low-stock',
          severity: 'medium',
          message: 'Stock below minimum level (12 units remaining)',
          medicationId: 3,
          medicationName: 'Lisinopril 10mg',
          isRead: true,
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
        },
      ];

      const mockExpiryAlerts: Alert[] = [
        {
          id: 4,
          type: 'expiry',
          severity: 'high',
          message: 'Expires in 15 days (Batch: B12345)',
          medicationId: 4,
          medicationName: 'Insulin Glargine',
          isRead: false,
          createdAt: new Date(),
        },
        {
          id: 5,
          type: 'expiry',
          severity: 'medium',
          message: 'Expires in 45 days (Batch: C54321)',
          medicationId: 5,
          medicationName: 'Metformin 500mg',
          isRead: false,
          createdAt: new Date(Date.now() - 43200000), // 12 hours ago
        },
      ];

      setStats(mockStats);
      setLowStockAlerts(mockLowStockAlerts);
      setExpiryAlerts(mockExpiryAlerts);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Prepare chart data
  const salesChartData = {
    labels: stats?.salesChart.labels || [],
    datasets: [
      {
        label: 'Sales',
        data: stats?.salesChart.data || [],
        backgroundColor: 'rgba(0, 160, 160, 0.2)',
        borderColor: 'rgba(0, 160, 160, 1)',
        borderWidth: 2,
      },
    ],
  };

  const topSellingData = {
    labels: stats?.topSellingMedications.map(item => item.name) || [],
    datasets: [
      {
        label: 'Units Sold',
        data: stats?.topSellingMedications.map(item => item.quantity) || [],
        backgroundColor: [
          'rgba(0, 160, 160, 0.7)',
          'rgba(0, 121, 255, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your pharmacy today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Sales"
          value={`$${stats?.totalSales.toLocaleString()}`}
          icon={<ShoppingCart size={24} className="text-primary-500" />}
          change={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Purchases"
          value={`$${stats?.totalPurchases.toLocaleString()}`}
          icon={<TruckIcon size={24} className="text-secondary-500" />}
          change={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.lowStockCount || 0}
          icon={<AlertTriangle size={24} className="text-warning-500" />}
          change={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Expiring Soon"
          value={stats?.expiringMedicationsCount || 0}
          icon={<Clock size={24} className="text-danger-500" />}
          change={{ value: 0, isPositive: true }}
        />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Sales Performance"
            chartType="line"
            data={salesChartData}
          />
        </div>
        <div>
          <ChartCard
            title="Top Selling Medications"
            chartType="doughnut"
            data={topSellingData}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertCard
          alerts={lowStockAlerts}
          title="Low Stock Alerts"
          icon={<Package size={18} className="text-warning-500" />}
        />
        <AlertCard
          alerts={expiryAlerts}
          title="Expiration Alerts"
          icon={<Calendar size={18} className="text-danger-500" />}
        />
      </div>

      {/* Recent Activities */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Activities</h2>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                <ShoppingCart size={16} className="text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">New sale completed - Invoice #INV-2023-05-24</p>
                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                <TruckIcon size={16} className="text-secondary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Received purchase order - PO#2023-00042</p>
                <p className="text-xs text-gray-500">Today, 9:15 AM</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center mr-3">
                <TrendingUp size={16} className="text-success-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Inventory count completed</p>
                <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center mr-3">
                <AlertTriangle size={16} className="text-warning-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">New low stock alert - Paracetamol 500mg</p>
                <p className="text-xs text-gray-500">Yesterday, 2:45 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;