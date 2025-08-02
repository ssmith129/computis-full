import React, { useState } from 'react';
import { Plus, Upload, Wallet, ExternalLink, AlertTriangle, CheckCircle, Clock, MoreVertical } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';

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

export default function Wallets() {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('wallets');
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Wallets & Data Sources</h1>
          <p className="text-gray-600 mt-1 font-sans">Connect wallets and import transaction data</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          <button className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans">
            onClick={handleConnectWallet}
            <Plus className="w-4 h-4 mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('wallets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 font-sans ${
              activeTab === 'wallets'
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Connected Wallets
          </button>
          <button
            onClick={() => setActiveTab('imports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 font-sans ${
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
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-4 hover:scale-110 transition-transform duration-200">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 font-sans">Connected Wallets</p>
                  <p className="text-2xl font-bold text-gray-900 font-sans">4</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4 hover:scale-110 transition-transform duration-200">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 font-sans">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900 font-sans">$409,330</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-4 hover:scale-110 transition-transform duration-200">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 font-sans">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900 font-sans">557</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wallets List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 font-sans">Connected Wallets</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="p-6 hover:bg-gray-50 transition-colors duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl hover:scale-110 transition-transform duration-200">
                        {wallet.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 font-sans">{wallet.name}</h3>
                        <p className="text-sm text-gray-600 font-sans">{wallet.type}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">{wallet.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900 font-sans">{wallet.balance}</p>
                        <p className="text-sm text-gray-600 font-sans">{wallet.usdValue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 font-sans">{wallet.transactions} transactions</p>
                        <p className="text-xs text-gray-500 font-sans">Last sync: {wallet.lastSync}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${
                          wallet.status === 'Connected' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {wallet.status}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button 
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
                    >
                      Sync Now
                    </button>
                    <button 
                      className="px-3 py-1 text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans"
                    >
                      <ExternalLink className="h-3 w-3 mr-1 inline" />
                      View Transactions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'imports' && (
        <div className="space-y-6">
          {/* Import History */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 font-sans">Recent Imports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Records
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Errors
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {importHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 font-sans">{item.filename}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 font-sans">{item.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-sans">{item.records}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${
                          item.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : item.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-sans ${item.errors > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {item.errors}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 hover:scale-105 transition-all duration-200 font-sans">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow duration-300">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4 hover:scale-110 transition-transform duration-200" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-sans">Import Transaction Data</h3>
            <p className="text-gray-600 mb-4 font-sans">
              Upload CSV files from exchanges, wallets, or other sources
            </p>
            <div className="flex justify-center space-x-3">
              <button 
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans"
              >
                Choose File
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                View Templates
              </button>
            </div>
          </div>
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