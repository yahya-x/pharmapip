export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'pharmacist' | 'cashier';
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
}

export interface Medication {
  id: number;
  name: string;
  genericName: string;
  category: string;
  description: string;
  dosage: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  stock: number;
  price: number;
  costPrice: number;
  minimumStock: number;
  location: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Sale {
  id: number;
  invoiceNumber: string;
  customerId?: number;
  customerName?: string;
  items: SaleItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  paymentMethod: 'cash' | 'card' | 'insurance';
  paymentStatus: 'paid' | 'pending' | 'partial';
  staffId: number;
  staffName: string;
  createdAt: Date;
}

export interface SaleItem {
  id: number;
  medicationId: number;
  medicationName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  subtotal: number;
}

export interface Purchase {
  id: number;
  purchaseNumber: string;
  supplierId: number;
  supplierName: string;
  items: PurchaseItem[];
  totalAmount: number;
  status: 'ordered' | 'received' | 'partially-received' | 'cancelled';
  orderDate: Date;
  receivedDate?: Date;
  staffId: number;
  staffName: string;
}

export interface PurchaseItem {
  id: number;
  medicationId: number;
  medicationName: string;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  createdAt: Date;
}

export interface Alert {
  id: number;
  type: 'low-stock' | 'expiry' | 'system';
  severity: 'low' | 'medium' | 'high';
  message: string;
  medicationId?: number;
  medicationName?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  lowStockCount: number;
  expiringMedicationsCount: number;
  salesChart: {
    labels: string[];
    data: number[];
  };
  topSellingMedications: {
    name: string;
    quantity: number;
  }[];
}