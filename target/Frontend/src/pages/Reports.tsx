import React from 'react';

function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Reports Dashboard</h2>
          <p className="text-gray-600">Select a report type to generate detailed insights about your pharmacy operations.</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;