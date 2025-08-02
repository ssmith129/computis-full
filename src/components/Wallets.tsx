import React, { useState } from 'react';
import { Plus, Upload, Wallet, ExternalLink, AlertTriangle, CheckCircle, Clock, MoreVertical } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';
import InteractiveButton from './InteractiveButton';
import AnimatedCard from './AnimatedCard';
import StatusIndicator from './StatusIndicator';
import ActionMenu from './ActionMenu';

const wallets = [
  {
    id: 1,
    name: 'Coinbase Pro',
    type: 'Exchange',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    balance: '2.45 BTC',
    usdValue: '$52,340.00',
    transactions: 156,
    lastSync: '2 hours ago',
    status: 'Connected',
    icon: '🏦'
  },
  {
    id: 2,
    name: 'MetaMask Wallet',
    type: 'Software',
    address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
    balance: '15.8 ETH',
    usdValue: '$28,440.00',
    transactions: 89,
    lastSync: '1 day ago',
    status: 'Connected',
    icon: '🦊'
  },
  {
    id: 3,
    name: 'Ledger Hardware',
    type: 'Hardware',
    address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    balance: '0.75 BTC',
    usdValue: '$16,050.00',
    transactions: 34,
    lastSync: '5 days ago',
    status: 'Sync Required',
    icon: '🔒'
  },
  {
    id: 4,
    name: 'Binance Account',
    type: 'Exchange',
    address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
    balance: '1,250 BNB',
    usdValue: '$312,500.00',
    transactions: 278,
    lastSync: '30 minutes ago',
    status: 'Connected',
    icon: '⚡'
  }
];

const importHistory = [
  {
    id: 1,
    filename: 'coinbase_transactions_2023.csv',
    date: '2023-12-15',
    records: 156,
    status: 'Completed',
    errors: 0
  },
  {
    id: 2,
    filename: 'metamask_export.csv',
    date: '2023-12-14',
    records: 89,
    status: 'Completed',
    errors: 2
  },
  {
    id: 3,
    filename: 'binance_history.csv',
    date: '2023-12-13',
    records: 278,
    status: 'Processing',
    errors: 0
  }
];

interface WalletsProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Wallets({ onWorkflowOpen }: WalletsProps) {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('wallets');
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<number | null>(null);

  const handleConnectWallet = () => {
    setShowConnectDialog(true);
  };

  const confirmConnectWallet = async () => {
    setIsConnecting(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    addNotification({
      type: 'success',
      title: 'Wallet Connected',
      message: 'Successfully connected to MetaMask wallet.',
      duration: 4000
    });
    
    setIsConnecting(false);
    setShowConnectDialog(false);
  };

  const handleWalletAction = (walletId: number, action: string) => {
    const wallet = wallets.find(w => w.id === walletId);
    
    switch (action) {
      case 'sync':
        addNotification({
          type: 'info',
          title: 'Syncing Wallet',
          message: `Syncing ${wallet?.name}...`,
          duration: 3000
        });
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'Sync Complete',
            message: `${wallet?.name} has been synchronized successfully.`,
            duration: 3000
          });
        }, 3000);
        break;
      case 'view':
        addNotification({
          type: 'info',
          title: 'Loading Transactions',
          message: `Fetching transactions from ${wallet?.name}...`,
          duration: 2000
        });
        break;
    }
  };

  const getWalletActionMenu = (wallet: any) => [
    {
      label: 'Sync Now',
      icon: CheckCircle,
      onClick: () => handleWalletAction(wallet.id, 'sync')
    },
    {
      label: 'View Transactions',
      icon: ExternalLink,
      onClick: () => handleWalletAction(wallet.id, 'view')
    },
    {
      label: 'Edit Settings',
      icon: AlertTriangle,
      onClick: () => handleWalletAction(wallet.id, 'edit')
    },
    {
      label: 'Disconnect',
      icon: AlertTriangle,
      onClick: () => handleWalletAction(wallet.id, 'disconnect'),
      variant: 'danger' as const
    }
  ];
  const handleImportCSV = () => {
    addNotification({
      type: 'info',
      title: 'Import Started',
      message: 'Processing CSV file...',
      duration: 3000
    });
    
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Import Complete',
        message: 'Successfully imported 156 transactions from CSV.',
        duration: 4000
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Wallets & Data Sources</h1>
          <p className="text-lg text-gray-600 mt-2 font-sans">Connect wallets and import transaction data</p>
        </div>
        <div className="flex space-x-4">
          <InteractiveButton 
            variant="secondary" 
            size="lg" 
            icon={Upload}
            tooltip="Import transaction data from CSV files"
          >
            Import CSV
          </InteractiveButton>
          <InteractiveButton 
            variant="primary" 
            size="lg" 
            icon={Plus}
            tooltip="Connect a new wallet or exchange"
          >
            Connect Wallet
          </InteractiveButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-10">
          <button
            onClick={() => setActiveTab('wallets')}
            className={`py-3 px-2 border-b-4 font-medium text-lg transition-all duration-300 font-display hover:scale-105 ${
              activeTab === 'wallets'
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Connected Wallets
          </button>
          <button
            onClick={() => setActiveTab('imports')}
            className={`py-3 px-2 border-b-4 font-medium text-lg transition-all duration-300 font-display hover:scale-105 ${
              activeTab === 'imports'
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Import History
          </button>
        </nav>
      </div>

      {activeTab === 'wallets' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedCard className="p-8" hover glow>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-6 hover:scale-110 transition-transform duration-200 animate-pulse-glow">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-600 font-sans">Connected Wallets</p>
                  <p className="text-3xl font-bold text-gray-900 font-display">4</p>
                </div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="p-8" hover>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-6 hover:scale-110 transition-transform duration-200 animate-float">
                  <Wallet className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-600 font-sans">Total Balance</p>
                  <p className="text-3xl font-bold text-gray-900 font-display">$409,330</p>
                </div>
              </div>
            </AnimatedCard>
            <AnimatedCard className="p-8" hover>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mr-6 hover:scale-110 transition-transform duration-200 animate-pulse">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-600 font-sans">Total Transactions</p>
                  <p className="text-3xl font-bold text-gray-900 font-display">557</p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Wallets List */}
          <AnimatedCard className="overflow-hidden" hover>
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 font-display">Connected Wallets</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {wallets.map((wallet) => (
                <div 
                  key={wallet.id} 
                  className="p-8 hover:bg-gray-50 transition-all duration-300 group hover:scale-105"
                  onMouseEnter={() => setHoveredWallet(wallet.id)}
                  onMouseLeave={() => setHoveredWallet(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-3xl hover:scale-110 transition-transform duration-200 animate-float">
                        {wallet.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 font-display">{wallet.name}</h3>
                        <p className="text-base text-gray-600 font-sans">{wallet.type}</p>
                        <p className="text-sm text-gray-500 font-mono mt-2">{wallet.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900 font-display">{wallet.balance}</p>
                        <p className="text-base text-gray-600 font-sans">{wallet.usdValue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base text-gray-600 font-sans">{wallet.transactions} transactions</p>
                        <p className="text-sm text-gray-500 font-sans">Last sync: {wallet.lastSync}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <StatusIndicator 
                          status={wallet.status === 'Connected' ? 'success' : 'warning'} 
                          label={wallet.status}
                          size="md"
                        />
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ActionMenu actions={getWalletActionMenu(wallet)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <InteractiveButton 
                      variant="secondary" 
                      size="sm"
                      tooltip="Sync wallet transactions now"
                    >
                      Sync Now
                    </InteractiveButton>
                    <InteractiveButton 
                      variant="secondary" 
                      size="sm" 
                      icon={ExternalLink}
                      tooltip="View all transactions from this wallet"
                    >
                      View Transactions
                    </InteractiveButton>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      )}

      {activeTab === 'imports' && (
        <div className="space-y-8">
          {/* Import History */}
          <AnimatedCard className="overflow-hidden" hover>
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 font-display">Recent Imports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      File
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      Date
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      Records
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      Status
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      Errors
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider font-display">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {importHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900 font-sans">{item.filename}</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-600 font-sans">{item.date}</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-900 font-sans">{item.records}</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <StatusIndicator 
                          status={
                            item.status === 'Completed' ? 'success' :
                            item.status === 'Processing' ? 'loading' :
                            'error'
                          }
                          label={item.status}
                          size="md"
                        />
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className={`text-base font-sans ${item.errors > 0 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`}>
                          {item.errors}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <InteractiveButton variant="secondary" size="sm">
                          View Details
                        </InteractiveButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedCard>

          {/* Upload Area */}
          <AnimatedCard className="p-12 text-center" hover glow>
            <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6 hover:scale-110 transition-transform duration-200 animate-float" />
            <h3 className="text-2xl font-medium text-gray-900 mb-4 font-display">Import Transaction Data</h3>
            <p className="text-lg text-gray-600 mb-8 font-sans">
              Upload CSV files from exchanges, wallets, or other sources
            </p>
            <div className="flex justify-center space-x-4">
              <InteractiveButton 
                variant="primary" 
                size="lg"
                tooltip="Upload CSV files from your computer"
              >
                Choose File
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="lg"
                tooltip="Download CSV templates for different exchanges"
              >
                View Templates
              </InteractiveButton>
            </div>
          </AnimatedCard>
        </div>
      )}

      {/* Connect Wallet Dialog */}
      <ConfirmDialog
        isOpen={showConnectDialog}
        onClose={() => setShowConnectDialog(false)}
        onConfirm={confirmConnectWallet}
        title="Connect New Wallet"
        message="This will connect a new wallet and sync all transactions. Make sure your wallet is unlocked."
        type="info"
        confirmText="Connect Wallet"
        isLoading={isConnecting}
      />
    </div>
  );
}