import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Alert } from '../../types';

interface AlertCardProps {
  alerts: Alert[];
  title: string;
  icon?: React.ReactNode;
}

const AlertCard: React.FC<AlertCardProps> = ({ 
  alerts, 
  title, 
  icon = <AlertTriangle size={18} className="text-warning-500" />
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No alerts to display</div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !alert.isRead ? 'border-l-4 border-warning-500' : ''
              }`}
            >
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-700">{alert.medicationName || 'System Alert'}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : alert.severity === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Clock size={14} />
                <span className="ml-1">
                  {new Date(alert.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="p-2 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-2 text-sm text-primary-500 hover:text-primary-600 font-medium">
            View all alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertCard;