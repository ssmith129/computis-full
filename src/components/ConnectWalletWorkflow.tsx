import React, { useState } from 'react';
import { ArrowLeft, Wallet, Shield, Zap, CheckCircle, AlertTriangle, ExternalLink, Copy } from 'lucide-react';

interface ConnectWalletWorkflowProps {
  onBack: () => void;
}

const ConnectWalletWorkflow: React.FC<ConnectWalletWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [connectionMethod, setConnectionMethod] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [walletData, setWalletData] = useState({
    address: '',
    apiKey: '',
    apiSecret: '',
    passphrase: ''
  });

  const walletTypes = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum wallet browser extension',
      icon: '🦊',
      type: 'Software Wallet',
      supported: ['ETH', 'ERC-20 tokens'],
      security: 'Medium',
      methods: ['Browser Extension', 'Address Import']
    },
    {
      id: 'ledger',
      name: 'Ledger',
      description: 'Hardware wallet for maximum security',
      icon: '🔒',
      type: 'Hardware Wallet',
      supported: ['BTC', 'ETH', '100+ coins'],
      security: 'High',
      methods: ['Ledger Live', 'Address Import']
    },
    {
      id: 'coinbase',
      name: 'Coinbase',
      description: 'Leading cryptocurrency exchange',
      icon: '🏦',
      type: 'Exchange',
      supported: ['BTC', 'ETH', '200+ coins'],
      security: 'High',
      methods: ['API Connection', 'CSV Import']
    },
    {
      id: 'binance',
      name: 'Binance',
      description: 'World\'s largest crypto exchange',
      icon: '⚡',
      type: 'Exchange',
      supported: ['BTC', 'ETH', '500+ coins'],
      security: 'High',
      methods: ['API Connection', 'CSV Import']
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      description: 'Mobile-first multi-coin wallet',
      icon: '📱',
      type: 'Mobile Wallet',
      supported: ['BTC', 'ETH', 'BNB', '160+ coins'],
      security: 'Medium',
      methods: ['Address Import', 'WalletConnect']
    },
    {
      id: 'exodus',
      name: 'Exodus',
      description: 'Desktop and mobile wallet',
      icon: '🚀',
      type: 'Software Wallet',
      supported: ['BTC', 'ETH', '100+ coins'],
      security: 'Medium',
      methods: ['Address Import', 'CSV Export']
    }
  ];

  const steps = [
    { number: 1, title: 'Select Wallet', description: 'Choose wallet type' },
    { number: 2, title: 'Connection Method', description: 'How to connect' },
    { number: 3, title: 'Authenticate', description: 'Provide credentials' },
    { number: 4, title: 'Sync Data', description: 'Import transactions' }
  ];

  const startConnection = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);

    // Simulate connection process
    const interval = setInterval(() => {
      setConnectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConnecting(false);
          setCurrentStep(4);
          return 100;
        }
        return prev + 12;
      });
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Select Wallet Type</h2>
              <p className="text-lg text-gray-600 font-sans">Choose the wallet or exchange you want to connect</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {walletTypes.map((wallet) => (
                <div
                  key={wallet.id}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedWallet === wallet.id
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-4">{wallet.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{wallet.name}</h3>
                    <p className="text-gray-600 mb-4 font-sans text-sm">{wallet.description}</p>
                    
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-sans">Type:</span>
                        <span className="font-medium text-gray-700 font-sans">{wallet.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-sans">Security:</span>
                        <span className={`font-medium font-sans ${
                          wallet.security === 'High' ? 'text-green-600' :
                          wallet.security === 'Medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {wallet.security}
                        </span>
                      </div>
                      <div className="text-left">
                        <span className="text-gray-500 font-sans">Supports:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {wallet.supported.slice(0, 2).map((coin, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                              {coin}
                            </span>
                          ))}
                          {wallet.supported.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                              +{wallet.supported.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Connection Method</h2>
              <p className="text-lg text-gray-600 font-sans">
                How would you like to connect your {walletTypes.find(w => w.id === selectedWallet)?.name}?
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {walletTypes.find(w => w.id === selectedWallet)?.methods.map((method) => (
                <div
                  key={method}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    connectionMethod === method
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {method.includes('API') ? (
                        <Zap className="h-6 w-6 text-gray-600" />
                      ) : method.includes('Address') ? (
                        <Wallet className="h-6 w-6 text-gray-600" />
                      ) : method.includes('Extension') ? (
                        <ExternalLink className="h-6 w-6 text-gray-600" />
                      ) : (
                        <Shield className="h-6 w-6 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 font-display">{method}</h3>
                      <p className="text-gray-600 font-sans">
                        {method.includes('API') && 'Secure API connection for real-time sync'}
                        {method.includes('Address') && 'Import using wallet address (read-only)'}
                        {method.includes('Extension') && 'Connect via browser extension'}
                        {method.includes('CSV') && 'Upload transaction history file'}
                        {method.includes('Live') && 'Connect via Ledger Live application'}
                        {method.includes('WalletConnect') && 'Secure mobile wallet connection'}
                      </p>
                    </div>
                    <div className="text-right">
                      {method.includes('API') && (
                        <div className="flex items-center space-x-1">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600 font-sans">Secure</span>
                        </div>
                      )}
                      {method.includes('Address') && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-xs text-blue-600 font-sans">Easy</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Authentication</h2>
              <p className="text-lg text-gray-600 font-sans">
                Provide the required information to connect your wallet
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-2xl">
                    {walletTypes.find(w => w.id === selectedWallet)?.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-display">
                      {walletTypes.find(w => w.id === selectedWallet)?.name}
                    </h3>
                    <p className="text-gray-600 font-sans">{connectionMethod}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {connectionMethod?.includes('API') ? (
                    <>
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-900 font-sans">API Security Notice</h4>
                            <p className="text-sm text-yellow-700 font-sans">
                              Your API credentials are encrypted and stored securely. We recommend using read-only API keys.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">API Key</label>
                        <input
                          type="text"
                          value={walletData.apiKey}
                          onChange={(e) => setWalletData(prev => ({ ...prev, apiKey: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-sm"
                          placeholder="Enter your API key"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">API Secret</label>
                        <input
                          type="password"
                          value={walletData.apiSecret}
                          onChange={(e) => setWalletData(prev => ({ ...prev, apiSecret: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-sm"
                          placeholder="Enter your API secret"
                        />
                      </div>

                      {selectedWallet === 'coinbase' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Passphrase</label>
                          <input
                            type="password"
                            value={walletData.passphrase}
                            onChange={(e) => setWalletData(prev => ({ ...prev, passphrase: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-sm"
                            placeholder="Enter your passphrase"
                          />
                        </div>
                      )}
                    </>
                  ) : connectionMethod?.includes('Address') ? (
                    <>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 font-sans">Address Import</h4>
                            <p className="text-sm text-blue-700 font-sans">
                              We'll import transaction history using your wallet address. This is read-only and secure.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Wallet Address</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={walletData.address}
                            onChange={(e) => setWalletData(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-mono text-sm"
                            placeholder="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4"
                          />
                          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                            <Copy className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="h-8 w-8 text-gray-600" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2 font-sans">Browser Extension Required</h4>
                      <p className="text-gray-600 font-sans">
                        Please install the {walletTypes.find(w => w.id === selectedWallet)?.name} browser extension and unlock your wallet.
                      </p>
                      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-sans">
                        Install Extension
                      </button>
                    </div>
                  )}

                  {!isConnecting && (connectionMethod?.includes('API') || connectionMethod?.includes('Address')) && (
                    <button 
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-sans font-medium"
                    >
                      Connect Wallet
                    </button>
                  )}

                  {isConnecting && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600 font-sans">
                        <span>Connecting to wallet...</span>
                        <span>{connectionProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${connectionProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 text-center font-sans">
                        Establishing secure connection and syncing transaction data...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Wallet Connected Successfully!</h2>
              <p className="text-lg text-gray-600 font-sans">
                Your {walletTypes.find(w => w.id === selectedWallet)?.name} wallet has been connected and synced
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Connection Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 font-display">1,247</div>
                    <div className="text-sm text-gray-600 font-sans">Transactions Imported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 font-display">8</div>
                    <div className="text-sm text-gray-600 font-sans">Assets Detected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 font-display">$45,230</div>
                    <div className="text-sm text-gray-600 font-sans">Total Portfolio Value</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Wallet Type:</span>
                    <span className="text-gray-900 font-sans">
                      {walletTypes.find(w => w.id === selectedWallet)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Connection Method:</span>
                    <span className="text-gray-900 font-sans">{connectionMethod}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Last Sync:</span>
                    <span className="text-gray-900 font-sans">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="font-medium text-gray-700 font-sans">Auto-Sync:</span>
                    <span className="text-green-600 font-sans">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Next Steps</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 font-sans">Review Transactions</h4>
                      <p className="text-sm text-blue-700 font-sans">
                        Check imported transactions for accuracy and completeness
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900 font-sans">AI Classification</h4>
                      <p className="text-sm text-yellow-700 font-sans">
                        Let AI automatically classify transactions for tax purposes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 font-sans">Generate Reports</h4>
                      <p className="text-sm text-green-700 font-sans">
                        Create tax forms and compliance reports
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-sans font-medium">
                    View Transactions
                  </button>
                  <button className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-sans">
                    Connect Another Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-start px-6 pt-12 pb-6">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">Connect Wallet</h1>
              <p className="text-gray-600 font-sans">Connect your crypto wallet or exchange account</p>
            </div>
          </div>
          
          {currentStep === 3 && !isConnecting && (connectionMethod?.includes('API') || connectionMethod?.includes('Address')) && (
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-sans font-medium">
              Connect Wallet
            </button>
          )}
          </div>
        </div>

          {/* Progress Steps */}
          {currentStep < 4 && (
            <div className="mt-8">
              <div className="flex items-center justify-between max-w-4xl">
                {steps.slice(0, 3).map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number 
                        ? 'bg-yellow-400 border-yellow-400 text-gray-900' 
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-medium">{step.number}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 font-display">{step.title}</p>
                      <p className="text-xs text-gray-500 font-sans">{step.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="flex-1 h-px bg-gray-300 mx-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white px-8 py-12">
          {renderStepContent()}
        </div>

        {/* Footer */}
        {currentStep < 4 && currentStep !== 3 && (
          <div className="bg-white border-t border-gray-200 px-8 py-6 rounded-b-2xl shadow-lg">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between">
                <button
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans"
                >
                  Previous
                </button>
                
                <button
                  disabled={
                    (currentStep === 1 && !selectedWallet) ||
                    (currentStep === 2 && !connectionMethod)
                  }
                  className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ConnectWalletWorkflow;