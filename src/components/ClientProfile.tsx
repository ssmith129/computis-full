import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Building, Calendar, TrendingUp, FileText, Edit, Save, X } from 'lucide-react';

interface ClientProfileProps {
  clientId: string;
  onBack: () => void;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [clientData, setClientData] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Smith Investments LLC',
    address: '123 Main Street, New York, NY 10001',
    taxId: '12-3456789',
    joinDate: '2023-01-15',
    status: 'Active',
    notes: 'High-volume trader, prefers quarterly reports'
  });

  const stats = [
    { label: 'Total Transactions', value: '1,247', change: '+12%', color: 'text-blue-600' },
    { label: 'Portfolio Value', value: '$245,680', change: '+8.5%', color: 'text-green-600' },
    { label: 'Realized Gains', value: '$45,230', change: '+15.2%', color: 'text-purple-600' },
    { label: 'Tax Liability', value: '$9,046', change: '+15.2%', color: 'text-red-600' }
  ];

  const recentTransactions = [
    { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.5', value: '$21,500', status: 'Confirmed' },
    { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '2.0', value: '$4,800', status: 'Confirmed' },
    { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', value: '$1,000', status: 'Pending' },
    { date: '2023-12-12', type: 'Receive', asset: 'SOL', amount: '50', value: '$3,500', status: 'Confirmed' }
  ];

  const reports = [
    { name: 'Q4 2023 Tax Report', type: 'IRS 8949', date: '2023-12-15', status: 'Completed' },
    { name: 'Annual Summary 2023', type: 'Schedule D', date: '2023-12-10', status: 'Completed' },
    { name: 'Q3 2023 Tax Report', type: 'IRS 8949', date: '2023-09-30', status: 'Completed' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">{clientData.name}</h1>
            <p className="text-gray-600 font-sans">{clientData.company}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-sans">
                <X className="w-4 h-4 mr-2 inline" />
                Cancel
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
                <Save className="w-4 h-4 mr-2 inline" />
                Save Changes
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
              <Edit className="w-4 h-4 mr-2 inline" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600 font-sans">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2 font-display">{stat.value}</p>
            <p className={`text-sm mt-1 font-sans ${stat.color}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'transactions', 'reports', 'documents'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 font-sans ${
                activeTab === tab
                  ? 'border-yellow-400 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-display">Client Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-sans">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={clientData.name}
                        onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 font-sans">{clientData.name}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-sans">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 font-sans">{clientData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-sans">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={clientData.phone}
                        onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 font-sans">{clientData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-sans">Company</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={clientData.company}
                        onChange={(e) => setClientData(prev => ({ ...prev, company: e.target.value }))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 font-sans">{clientData.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600 font-sans">Client Since</p>
                    <p className="font-medium text-gray-900 font-sans">{clientData.joinDate}</p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Notes</label>
                  <textarea
                    value={clientData.notes}
                    onChange={(e) => setClientData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-display">Recent Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Type</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Asset</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Amount</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Value</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-sm text-gray-900 font-sans">{tx.date}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                            tx.type === 'Buy' ? 'bg-green-100 text-green-800' :
                            tx.type === 'Sell' ? 'bg-red-100 text-red-800' :
                            tx.type === 'Swap' ? 'bg-purple-100 text-purple-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-900 font-sans">{tx.asset}</td>
                        <td className="py-3 text-sm text-gray-900 font-sans">{tx.amount}</td>
                        <td className="py-3 text-sm text-gray-900 font-sans">{tx.value}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                            tx.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 font-display">Generated Reports</h3>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 font-sans">{report.name}</p>
                        <p className="text-sm text-gray-600 font-sans">{report.type} • {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium font-sans">
                        {report.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium font-sans">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 font-display">All Transactions</h3>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-sans">
                Filter
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
                Export
              </button>
            </div>
          </div>
          <p className="text-gray-600 font-sans">Transaction history and details would be displayed here...</p>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 font-display">Tax Reports</h3>
            <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
              Generate New Report
            </button>
          </div>
          <p className="text-gray-600 font-sans">Tax reports and documents would be displayed here...</p>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 font-display">Documents</h3>
            <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
              Upload Document
            </button>
          </div>
          <p className="text-gray-600 font-sans">Client documents and files would be displayed here...</p>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;