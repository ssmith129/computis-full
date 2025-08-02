import React, { useState } from 'react';
import { Plus, Search, MoreVertical, User, Building, Mail, Phone, Calendar, TrendingUp } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';
import InteractiveButton from './InteractiveButton';
import AnimatedCard from './AnimatedCard';
import ActionMenu from './ActionMenu';
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

export default function Clients({ onClientSelect, onWorkflowOpen }: ClientsProps) {
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddClientDialog, setShowAddClientDialog] = useState(false);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || client.type === filterType;
    const matchesStatus = filterStatus === 'All' || client.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddClient = () => {
    setShowAddClientDialog(true);
  };

  const confirmAddClient = async () => {
    setIsAddingClient(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addNotification({
      type: 'success',
      title: 'Client Added',
      message: 'New client has been successfully created.',
      duration: 4000
    });
    
    setIsAddingClient(false);
    setShowAddClientDialog(false);
  };

  const handleClientAction = (clientId: number, action: string) => {
    const client = clients.find(c => c.id === clientId);
    
    switch (action) {
      case 'view':
        addNotification({
          type: 'info',
          title: 'Loading Client Details',
          message: `Opening ${client?.name}'s profile...`,
          duration: 2000
        });
        break;
      case 'transactions':
        addNotification({
          type: 'info',
          title: 'Loading Transactions',
          message: `Fetching ${client?.name}'s transaction history...`,
          duration: 2000
        });
        break;
    }
  };

  const getClientActionMenu = (client: any) => [
    {
      label: 'View Profile',
      icon: User,
      onClick: () => handleClientAction(client.id, 'view')
    },
    {
      label: 'View Transactions',
      icon: TrendingUp,
      onClick: () => handleClientAction(client.id, 'transactions')
    },
    {
      label: 'Generate Report',
      icon: FileText,
      onClick: () => handleClientAction(client.id, 'report')
    },
    {
      label: 'Edit Client',
      icon: Building,
      onClick: () => handleClientAction(client.id, 'edit')
    }
  ];
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Clients</h1>
          <p className="text-lg text-gray-600 mt-2 font-sans">Manage your clients and their crypto tax profiles</p>
        </div>
        <InteractiveButton 
          variant="primary" 
          size="lg" 
          icon={Plus}
          tooltip="Add a new client to your portfolio"
        >
          Add Client
        </InteractiveButton>
      </div>

      {/* Filters */}
      <AnimatedCard className="p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-300 font-sans text-lg hover:scale-105"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-300 font-sans text-base hover:scale-105"
            >
              <option>All Types</option>
              <option>Individual</option>
              <option>Business</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-all duration-300 font-sans text-base hover:scale-105"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </AnimatedCard>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClients.map((client) => (
          <AnimatedCard 
            key={client.id} 
            className="p-8 cursor-pointer group" 
            hover
            glow={client.status === 'Active'}
            onMouseEnter={() => setHoveredClient(client.id)}
            onMouseLeave={() => setHoveredClient(null)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 animate-float">
                  {client.type === 'Business' ? (
                    <Building className="h-8 w-8 text-gray-600" />
                  ) : (
                    <User className="h-8 w-8 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 font-display">{client.name}</h3>
                  <div className="mt-2">
                    <StatusIndicator 
                      status={client.status === 'Active' ? 'success' : 'pending'} 
                      label={client.status}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ActionMenu actions={getClientActionMenu(client)} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-base text-gray-600 font-sans">
                <Mail className="h-5 w-5 mr-3" />
                {client.email}
              </div>
              <div className="flex items-center text-base text-gray-600 font-sans">
                <Phone className="h-5 w-5 mr-3" />
                {client.phone}
              </div>
              <div className="flex items-center text-base text-gray-600 font-sans">
                <Calendar className="h-5 w-5 mr-3" />
                Last activity: {client.lastActivity}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base text-gray-600 font-sans">Transactions</p>
                  <p className="text-xl font-semibold text-gray-900 font-display">{client.transactions}</p>
                </div>
                <div className="text-right">
                  <p className="text-base text-gray-600 font-sans">Total Value</p>
                  <p className="text-xl font-semibold text-gray-900 font-display">{client.totalValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <InteractiveButton 
                variant="secondary" 
                size="md" 
                className="flex-1"
                tooltip="View detailed client profile"
              >
                View Details
              </InteractiveButton>
              <InteractiveButton 
                variant="primary" 
                size="md" 
                icon={TrendingUp}
                className="flex-1"
                tooltip="View client transactions"
              >
                Transactions
              </InteractiveButton>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <AnimatedCard className="text-center py-16">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-6 animate-float" />
          <h3 className="text-2xl font-medium text-gray-900 mb-4 font-display">No clients found</h3>
          <p className="text-lg text-gray-600 mb-8 font-sans">Try adjusting your search or filter criteria</p>
          <InteractiveButton variant="primary" size="lg">
            Clear Filters
          </InteractiveButton>
        </AnimatedCard>
      )}

      {/* Add Client Dialog */}
      <ConfirmDialog
        isOpen={showAddClientDialog}
        onClose={() => setShowAddClientDialog(false)}
        onConfirm={confirmAddClient}
        title="Add New Client"
        message="This will create a new client profile. You can add details after creation."
        type="success"
        confirmText="Create Client"
        isLoading={isAddingClient}
      />
    </div>
  );
}