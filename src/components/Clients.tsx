import React, { useState } from 'react';
import { Plus, Search, MoreVertical, User, Building, Mail, Phone, Calendar, TrendingUp } from 'lucide-react';

const clients = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    type: 'Individual',
    status: 'Active',
    transactions: 156,
    lastActivity: '2 days ago',
    totalValue: '$45,230.00',
    avatar: null
  },
  {
    id: 2,
    name: 'ABC Corporation',
    email: 'finance@abccorp.com',
    phone: '+1 (555) 987-6543',
    type: 'Business',
    status: 'Active',
    transactions: 342,
    lastActivity: '1 day ago',
    totalValue: '$128,450.00',
    avatar: null
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 456-7890',
    type: 'Individual',
    status: 'Inactive',
    transactions: 89,
    lastActivity: '2 weeks ago',
    totalValue: '$23,100.00',
    avatar: null
  },
  {
    id: 4,
    name: 'Tech Innovations LLC',
    email: 'admin@techinnovations.com',
    phone: '+1 (555) 321-0987',
    type: 'Business',
    status: 'Active',
    transactions: 278,
    lastActivity: '3 hours ago',
    totalValue: '$89,750.00',
    avatar: null
  }
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || client.type === filterType;
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Clients</h1>
          <p className="text-gray-600 mt-1 font-sans">Manage your clients and their crypto tax profiles</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option>All Types</option>
              <option>Individual</option>
              <option>Business</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  {client.type === 'Business' ? (
                    <Building className="h-6 w-6 text-gray-600" />
                  ) : (
                    <User className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 font-sans">{client.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${
                    client.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600 font-sans">
                <Mail className="h-4 w-4 mr-2" />
                {client.email}
              </div>
              <div className="flex items-center text-sm text-gray-600 font-sans">
                <Phone className="h-4 w-4 mr-2" />
                {client.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600 font-sans">
                <Calendar className="h-4 w-4 mr-2" />
                Last activity: {client.lastActivity}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-sans">Transactions</p>
                  <p className="text-lg font-semibold text-gray-900 font-sans">{client.transactions}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 font-sans">Total Value</p>
                  <p className="text-lg font-semibold text-gray-900 font-sans">{client.totalValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans">
                <TrendingUp className="h-4 w-4 mr-1 inline" />
                Transactions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-sans">No clients found</h3>
          <p className="text-gray-600 mb-4 font-sans">Try adjusting your search or filter criteria</p>
          <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}