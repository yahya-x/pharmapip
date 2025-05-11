import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, AlertTriangle } from 'lucide-react';
import MedicationCard from '../components/inventory/MedicationCard';
import { Medication } from '../types';

const Inventory: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would be an API call
    const fetchMedications = () => {
      // Mock data
      const today = new Date();
      const mockMedications: Medication[] = [
        {
          id: 1,
          name: 'Paracetamol 500mg',
          genericName: 'Acetaminophen',
          category: 'Analgesic',
          description: 'Pain reliever and fever reducer',
          dosage: '500mg',
          manufacturer: 'Generic Pharma',
          batchNumber: 'BAT123456',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 4, 15), // 4 months from now
          stock: 150,
          price: 5.99,
          costPrice: 3.50,
          minimumStock: 50,
          location: 'Shelf A-1',
          createdAt: new Date(today.getFullYear() - 1, 5, 10),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Amoxicillin 250mg',
          genericName: 'Amoxicillin',
          category: 'Antibiotic',
          description: 'Antibiotic used to treat bacterial infections',
          dosage: '250mg',
          manufacturer: 'Medica Labs',
          batchNumber: 'BAT789012',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 8, 20), // 8 months from now
          stock: 75,
          price: 12.50,
          costPrice: 7.25,
          minimumStock: 30,
          location: 'Shelf B-3',
          createdAt: new Date(today.getFullYear() - 1, 8, 15),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Loratadine 10mg',
          genericName: 'Loratadine',
          category: 'Antihistamine',
          description: 'Antihistamine for allergy relief',
          dosage: '10mg',
          manufacturer: 'AllergyCare',
          batchNumber: 'BAT345678',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 10, 5), // 10 months from now
          stock: 200,
          price: 8.99,
          costPrice: 4.50,
          minimumStock: 60,
          location: 'Shelf C-2',
          createdAt: new Date(today.getFullYear() - 1, 3, 22),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Metformin 500mg',
          genericName: 'Metformin Hydrochloride',
          category: 'Antidiabetic',
          description: 'Oral diabetes medicine to control blood sugar levels',
          dosage: '500mg',
          manufacturer: 'DiabeteCare',
          batchNumber: 'BAT901234',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 2, 10), // 2 months from now
          stock: 45,
          price: 15.75,
          costPrice: 9.25,
          minimumStock: 50,
          location: 'Shelf B-5',
          createdAt: new Date(today.getFullYear() - 1, 1, 5),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Atorvastatin 20mg',
          genericName: 'Atorvastatin Calcium',
          category: 'Statin',
          description: 'Lowers cholesterol and triglycerides in the blood',
          dosage: '20mg',
          manufacturer: 'HeartCare Pharma',
          batchNumber: 'BAT567890',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 1, 10), // 1 month from now
          stock: 90,
          price: 18.99,
          costPrice: 10.50,
          minimumStock: 40,
          location: 'Shelf A-4',
          createdAt: new Date(today.getFullYear() - 1, 6, 12),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Omeprazole 20mg',
          genericName: 'Omeprazole',
          category: 'Proton Pump Inhibitor',
          description: 'Decreases the amount of acid produced in the stomach',
          dosage: '20mg',
          manufacturer: 'GastroHealth',
          batchNumber: 'BAT654321',
          expiryDate: new Date(today.getFullYear(), today.getMonth() + 6, 15), // 6 months from now
          stock: 25,
          price: 14.50,
          costPrice: 7.75,
          minimumStock: 30,
          location: 'Shelf D-1',
          createdAt: new Date(today.getFullYear() - 1, 7, 18),
          updatedAt: new Date(),
        },
      ];

      setMedications(mockMedications);
      setFilteredMedications(mockMedications);
      setIsLoading(false);
    };

    fetchMedications();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = medications;

    // Apply search term
    if (searchTerm) {
      results = results.filter(
        med => 
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(med => med.category === categoryFilter);
    }

    // Apply stock filter
    if (stockFilter !== 'all') {
      if (stockFilter === 'low') {
        results = results.filter(med => med.stock <= med.minimumStock);
      } else if (stockFilter === 'expiring') {
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
        results = results.filter(med => new Date(med.expiryDate) <= threeMonthsFromNow);
      }
    }

    setFilteredMedications(results);
  }, [searchTerm, categoryFilter, stockFilter, medications]);

  const handleEditMedication = (id: number) => {
    // In a real implementation, this would navigate to an edit form or open a modal
    console.log(`Editing medication with ID: ${id}`);
  };

  const handleDeleteMedication = (id: number) => {
    // In a real implementation, this would show a confirmation dialog and delete upon confirmation
    console.log(`Deleting medication with ID: ${id}`);
    setMedications(medications.filter(med => med.id !== id));
  };

  const categories = ['all', ...new Set(medications.map(med => med.category))];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Count low stock and expiring medications
  const today = new Date();
  const threeMonthsFromNow = new Date(today);
  threeMonthsFromNow.setMonth(today.getMonth() + 3);
  
  const lowStockCount = medications.filter(med => med.stock <= med.minimumStock).length;
  const expiringCount = medications.filter(med => new Date(med.expiryDate) <= threeMonthsFromNow).length;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medication Inventory</h1>
          <p className="text-gray-600">Manage your pharmacy inventory and stock levels</p>
        </div>
        <button className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <Plus size={20} className="mr-2" />
          Add Medication
        </button>
      </div>

      {/* Alert banners */}
      {(lowStockCount > 0 || expiringCount > 0) && (
        <div className="mb-6 space-y-3">
          {lowStockCount > 0 && (
            <div className="bg-warning-500 bg-opacity-10 border-l-4 border-warning-500 text-warning-700 p-4 rounded-r-lg">
              <div className="flex">
                <AlertTriangle className="flex-shrink-0 h-5 w-5 mr-2" />
                <span className="font-medium">
                  {lowStockCount} {lowStockCount === 1 ? 'medication' : 'medications'} below minimum stock level
                </span>
              </div>
            </div>
          )}
          
          {expiringCount > 0 && (
            <div className="bg-danger-500 bg-opacity-10 border-l-4 border-danger-500 text-danger-700 p-4 rounded-r-lg">
              <div className="flex">
                <AlertTriangle className="flex-shrink-0 h-5 w-5 mr-2" />
                <span className="font-medium">
                  {expiringCount} {expiringCount === 1 ? 'medication' : 'medications'} expiring within 3 months
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-400 mr-2" />
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Stock</option>
              <option value="low">Low Stock</option>
              <option value="expiring">Expiring Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medications grid */}
      {filteredMedications.length === 0 ? (
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <p className="text-gray-500">No medications found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedications.map(medication => (
            <MedicationCard
              key={medication.id}
              medication={medication}
              onEdit={handleEditMedication}
              onDelete={handleDeleteMedication}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;