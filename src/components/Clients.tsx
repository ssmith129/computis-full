import React, { useState } from 'react';
import { Plus, Search, Filter, Users, Building, Mail, Phone, Calendar, TrendingUp, FileText, MoreVertical, User, Eye, Edit, Trash2, Star } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import InteractiveButton from './InteractiveButton';
import AnimatedCard from './AnimatedCard';
import StatusIndicator from './StatusIndicator';

interface ClientsProps {
  onClientSelect?: (clientId: string) => void;
  onWorkflowOpen?: (workflow: string) => void;
}

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
    joinDate: '2023-01-15',
    tags: ['High Value', 'Regular Trader'],
    priority: 'high',
    avatar: null,
    riskLevel: 'Low',
    yearToDateGains: '$12,450.00'
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
    joinDate: '2022-08-20',
    tags: ['Enterprise', 'DeFi'],
    priority: 'high',
    avatar: null,
    riskLevel: 'Medium',
    yearToDateGains: '$28,750.00'
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
    joinDate: '2023-03-10',
    tags: ['New Investor'],
    priority: 'medium',
    avatar: null,
    riskLevel: 'Low',
    yearToDateGains: '$3,200.00'
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
    joinDate: '2022-11-05',
    tags: ['Startup', 'NFTs'],
    priority: 'high',
    avatar: null,
    riskLevel: 'High',
    yearToDateGains: '$15,680.00'
  }
];

export default function Clients({ onClientSelect, onWorkflowOpen }: ClientsProps) {
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'All' || client.type === filterType;
      const matchesStatus = filterStatus === 'All' || client.status === filterStatus;
      const matchesPriority = filterPriority === 'All' || client.priority === filterPriority;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return parseFloat(b.totalValue.replace(/[$,]/g, '')) - parseFloat(a.totalValue.replace(/[$,]/g, ''));
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case 'transactions':
          return b.transactions - a.transactions;
        default:
          return 0;
      }
    });

  const handleAddClient = () => {
    onWorkflowOpen?.('add-client');
    addNotification({
      type: 'info',
      title: 'Opening Add Client',
      message: 'Starting client creation workflow...',
      duration: 2000
    });
  };

  const handleClientAction = (clientId: number, action: string) => {
    if (!clientId || typeof clientId !== 'number') {
      addNotification({
        type: 'error',
        title: 'Invalid Client',
        message: 'Unable to process client action',
        duration: 3000
      });
      return;
    }
    
    const client = clients.find(c => c.id === clientId);
    
    if (!client) {
      addNotification({
        type: 'error',
        title: 'Client Not Found',
        message: 'The selected client could not be found',
        duration: 3000
      });
      return;
    }
    
    switch (action) {
      case 'view':
        if (onClientSelect) {
          onClientSelect(clientId.toString());
        }
        addNotification({
          type: 'info',
          title: 'Loading Client Details',
          message: `Opening ${client.name}'s profile...`,
          duration: 2000
        });
        break;
      case 'transactions':
        addNotification({
          type: 'info',
          title: 'Loading Transactions',
          message: `Fetching ${client.name}'s transaction history...`,
          duration: 2000
        });
        break;
      case 'report':
        if (onWorkflowOpen) {
          onWorkflowOpen('generate-report');
        }
        addNotification({
          type: 'info',
          title: 'Generate Report',
          message: `Opening report generation for ${client.name}...`,
          duration: 2000
        });
        break;
      default:
        addNotification({
          type: 'error',
          title: 'Unknown Action',
          message: 'The requested action is not supported',
          duration: 3000
        });
    }
  };

  const getClientIcon = (client: any) => {
    if (client.type === 'Business') {
      return <Building className="h-6 w-6 text-blue-600" />;
    }
    return <User className="h-6 w-6 text-green-600" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Enhanced Header Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 font-display">Crypto Tax Client Management</h2>
            <p className="text-lg text-gray-600 font-sans">
              Manage cryptocurrency tax clients and track portfolio performance
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500 font-sans">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {clients.length} Total Clients
              </span>
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {clients.filter(c => c.status === 'Active').length} Active
              </span>
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {clients.reduce((sum, c) => sum + c.transactions, 0)} Total Transactions
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <InteractiveButton 
              variant="secondary" 
              size="md" 
              icon={FileText}
              onClick={() => onWorkflowOpen?.('generate-report')}
            >
              Bulk Report
            </InteractiveButton>
            <InteractiveButton 
              variant="primary" 
              size="md" 
              icon={Plus}
              onClick={handleAddClient}
            >
              Add New Client
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="space-y-6">
          {/* Primary Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, email, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-200 font-sans"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 font-sans">Filters:</span>
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-200 font-sans text-sm"
              >
                <option value="All">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-200 font-sans text-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-200 font-sans text-sm"
              >
                <option value="All">All Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-200 font-sans text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="value">Sort by Value</option>
                <option value="activity">Sort by Activity</option>
                <option value="transactions">Sort by Transactions</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 font-sans">View:</span>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm transition-all duration-200 font-sans ${
                    viewMode === 'grid' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm transition-all duration-200 font-sans ${
                    viewMode === 'list' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || filterType !== 'All' || filterStatus !== 'All' || filterPriority !== 'All') && (
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600 font-sans">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium font-sans">
                  Search: "{searchTerm}"
                </span>
              )}
              {filterType !== 'All' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium font-sans">
                  Type: {filterType}
                </span>
              )}
              {filterStatus !== 'All' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium font-sans">
                  Status: {filterStatus}
                </span>
              )}
              {filterPriority !== 'All' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium font-sans">
                  Priority: {filterPriority}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('All');
                  setFilterStatus('All');
                  setFilterPriority('All');
                }}
                className="text-sm text-red-600 hover:text-red-800 font-sans hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 font-sans">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
        <div className="text-sm text-gray-500 font-sans">
          Sorted by {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
        </div>
      </div>

      {/* Client Display */}
      {viewMode === 'grid' ? (
        /* Enhanced Grid View */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-8">
          {filteredClients.map((client) => (
            <AnimatedCard 
              key={client.id} 
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 h-full"
              hover
            >
              {/* Card Header with Priority Indicator */}
              <div className="relative p-4 md:p-6 pb-3 md:pb-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                {client.priority === 'high' && (
                  <div className="absolute top-3 md:top-4 right-3 md:right-4">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm">
                      {getClientIcon(client)}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                      client.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 font-display truncate group-hover:text-blue-600 transition-colors duration-200">
                      {client.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                        client.type === 'Business' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {client.type}
                      </span>
                      <StatusIndicator 
                        status={client.status === 'Active' ? 'success' : 'warning'} 
                        label={client.status}
                        size="sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Client Tags */}
                <div className="flex flex-wrap gap-1 mt-2 md:mt-3">
                  {client.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body - Contact & Metrics */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-1 flex flex-col">
                {/* Contact Information */}
                <div className="space-y-2 md:space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-600 font-sans">
                    <Mail className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-sans">
                    <Phone className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 font-sans">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span>Joined {new Date(client.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg md:text-xl font-bold text-blue-600 font-display">{client.transactions}</div>
                    <div className="text-xs text-blue-700 font-sans uppercase tracking-wide">Transactions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg md:text-xl font-bold text-green-600 font-display">{client.totalValue}</div>
                    <div className="text-xs text-green-700 font-sans uppercase tracking-wide">Portfolio</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm font-sans">
                  <div className="flex justify-between">
                    <span className="text-gray-600">YTD Gains:</span>
                    <span className="font-medium text-green-600">{client.yearToDateGains}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-medium ${getRiskColor(client.riskLevel)}`}>
                      {client.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 font-sans pt-2 md:pt-2 border-t border-gray-100">
                  Last activity: {client.lastActivity}
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-4 md:px-6 pb-4 md:pb-6 mt-auto">
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  <InteractiveButton 
                    variant="secondary" 
                    size="sm" 
                    icon={Eye}
                    className="text-xs w-full justify-center"
                    onClick={() => handleClientAction(client.id, 'view')}
                  >
                    View
                  </InteractiveButton>
                  <InteractiveButton 
                    variant="secondary" 
                    size="sm" 
                    icon={TrendingUp}
                    className="text-xs w-full justify-center"
                    onClick={() => handleClientAction(client.id, 'transactions')}
                  >
                    Transactions
                  </InteractiveButton>
                  <InteractiveButton 
                    variant="primary" 
                    size="sm" 
                    icon={FileText}
                    className="text-xs w-full justify-center"
                    onClick={() => handleClientAction(client.id, 'report')}
                  >
                    Report
                  </InteractiveButton>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      ) : (
        /* Enhanced List View */
        <AnimatedCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-display">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-display">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-display">Portfolio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-display">Activity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 font-display">Risk</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 font-display">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            {getClientIcon(client)}
                          </div>
                          {client.priority === 'high' && (
                            <Star className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 font-display">{client.name}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              client.type === 'Business' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {client.type}
                            </span>
                            <StatusIndicator 
                              status={client.status === 'Active' ? 'success' : 'warning'} 
                              label={client.status}
                              size="sm"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm font-sans">
                        <div className="flex items-center text-gray-900">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          {client.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-3 w-3 mr-2 text-gray-400" />
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-sm font-sans">
                        <div className="font-semibold text-gray-900">{client.totalValue}</div>
                        <div className="text-green-600">+{client.yearToDateGains} YTD</div>
                        <div className="text-gray-500">{client.transactions} transactions</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 font-sans">
                        {client.lastActivity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium font-sans ${
                        client.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        client.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {client.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <InteractiveButton 
                          variant="secondary" 
                          size="sm" 
                          icon={Eye}
                          onClick={() => handleClientAction(client.id, 'view')}
                          tooltip="View Profile"
                        />
                        <InteractiveButton 
                          variant="secondary" 
                          size="sm" 
                          icon={TrendingUp}
                          onClick={() => handleClientAction(client.id, 'transactions')}
                          tooltip="View Transactions"
                        />
                        <InteractiveButton 
                          variant="primary" 
                          size="sm" 
                          icon={FileText}
                          onClick={() => handleClientAction(client.id, 'report')}
                          tooltip="Generate Report"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCard>
      )}

      {/* Enhanced Empty State */}
      {filteredClients.length === 0 && (
        <AnimatedCard className="text-center py-16">
          <div className="max-w-md mx-auto space-y-6">
            <div className="h-24 w-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900 font-display">
                {searchTerm || filterType !== 'All' || filterStatus !== 'All' || filterPriority !== 'All' 
                  ? 'No clients match your criteria'
                  : 'No clients yet'
                }
              </h3>
              <p className="text-gray-600 font-sans text-lg">
                {searchTerm || filterType !== 'All' || filterStatus !== 'All' || filterPriority !== 'All' 
                  ? 'Try adjusting your search terms or filters to find clients.'
                  : 'Get started by adding your first client to begin managing crypto tax services.'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(searchTerm || filterType !== 'All' || filterStatus !== 'All' || filterPriority !== 'All') && (
                <InteractiveButton 
                  variant="secondary" 
                  size="md"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('All');
                    setFilterStatus('All');
                    setFilterPriority('All');
                  }}
                >
                  Clear All Filters
                </InteractiveButton>
              )}
              <InteractiveButton 
                variant="primary" 
                size="md" 
                icon={Plus}
                onClick={handleAddClient}
              >
                {filteredClients.length === 0 && !searchTerm ? 'Add First Client' : 'Add New Client'}
              </InteractiveButton>
            </div>
          </div>
        </AnimatedCard>
      )}

      {/* Pagination (if needed) */}
      {filteredClients.length > 12 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600 font-sans">
            Showing 1-12 of {filteredClients.length} clients
          </div>
          <div className="flex space-x-2">
            <InteractiveButton variant="secondary" size="sm" disabled>
              Previous
            </InteractiveButton>
            <InteractiveButton variant="primary" size="sm">
              1
            </InteractiveButton>
            <InteractiveButton variant="secondary" size="sm">
              2
            </InteractiveButton>
            <InteractiveButton variant="secondary" size="sm">
              Next
            </InteractiveButton>
          </div>
        </div>
      )}
    </div>
  );
}