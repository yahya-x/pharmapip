import React from 'react';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { Medication } from '../../types';

interface MedicationCardProps {
  medication: Medication;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onEdit, onDelete }) => {
  // Calculate days until expiry
  const today = new Date();
  const expiryDate = new Date(medication.expiryDate);
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine stock status
  const isLowStock = medication.stock <= medication.minimumStock;
  const isExpiringSoon = daysUntilExpiry <= 90; // 3 months

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-800">{medication.name}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(medication.id)}
              className="p-1 text-gray-500 hover:text-primary-500"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={() => onDelete(medication.id)}
              className="p-1 text-gray-500 hover:text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">{medication.genericName}</p>
        
        <div className="flex items-center mt-3">
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {medication.category}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            {medication.manufacturer}
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-sm font-medium">${medication.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Stock</p>
            <div className="flex items-center">
              <p className={`text-sm font-medium ${isLowStock ? 'text-warning-500' : 'text-gray-700'}`}>
                {medication.stock} units
              </p>
              {isLowStock && (
                <AlertCircle size={16} className="ml-1 text-warning-500" />
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Batch</p>
            <p className="text-sm">{medication.batchNumber}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expires</p>
            <div className="flex items-center">
              <p className={`text-sm ${
                daysUntilExpiry <= 30 
                  ? 'text-danger-500' 
                  : daysUntilExpiry <= 90 
                  ? 'text-warning-500' 
                  : 'text-gray-700'
              }`}>
                {expiryDate.toLocaleDateString()}
              </p>
              {isExpiringSoon && (
                <AlertCircle size={16} className="ml-1 text-warning-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`px-4 py-2 text-xs font-medium ${
        isLowStock && isExpiringSoon
          ? 'bg-red-100 text-red-700'
          : isLowStock
          ? 'bg-yellow-100 text-yellow-700'
          : isExpiringSoon
          ? 'bg-orange-100 text-orange-700'
          : 'bg-green-100 text-green-700'
      }`}>
        {isLowStock && isExpiringSoon
          ? 'Low Stock & Expiring Soon'
          : isLowStock
          ? 'Low Stock'
          : isExpiringSoon
          ? 'Expiring Soon'
          : 'In Stock'}
      </div>
    </div>
  );
};

export default MedicationCard;