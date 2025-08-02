import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, Plus, Trash2 } from 'lucide-react';

interface ImportTransactionsWorkflowProps {
  onBack: () => void;
}

const ImportTransactionsWorkflow: React.FC<ImportTransactionsWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const dataSources = [
    {
      id: 'coinbase',
      name: 'Coinbase',
      icon: '🏦',
      description: 'Import from Coinbase Pro/Exchange',
      supported: ['CSV', 'API'],
      popularity: 'Most Popular'
    },
    {
      id: 'binance',
      name: 'Binance',
      icon: '⚡',
      description: 'Import from Binance exchange',
      supported: ['CSV', 'API'],
      popularity: 'Popular'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Import from MetaMask wallet',
      supported: ['CSV', 'Address Sync'],
      popularity: 'Popular'
    },
    {
      id: 'ledger',
      name: 'Ledger',
      icon: '🔒',
      description: 'Import from Ledger hardware wallet',
      supported: ['CSV', 'Ledger Live'],
      popularity: 'Secure'
    },
    {
      id: 'kraken',
      name: 'Kraken',
      icon: '🐙',
      description: 'Import from Kraken exchange',
      supported: ['CSV', 'API'],
      popularity: 'Popular'
    },
    {
      id: 'custom',
      name: 'Custom CSV',
      icon: '📄',
      description: 'Upload custom CSV file',
      supported: ['CSV'],
      popularity: 'Flexible'
    }
  ];

  const steps = [
    { number: 1, title: 'Select Source', description: 'Choose your data source' },
    { number: 2, title: 'Configure Import', description: 'Set up import parameters' },
    { number: 3, title: 'Upload Data', description: 'Upload or connect your data' },
    { number: 4, title: 'Review & Process', description: 'Review and import transactions' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startImport = async () => {
    setIsProcessing(true);
    setImportProgress(0);

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Select Data Source</h2>
              <p className="text-lg text-gray-600 font-sans">Choose where you want to import transactions from</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources.map((source) => (
                <div
                  key={source.id}
                  className={`relative p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedSource === source.id
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {source.popularity && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium font-sans">
                        {source.popularity}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">{source.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{source.name}</h3>
                    <p className="text-gray-600 mb-4 font-sans">{source.description}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      {source.supported.map((type) => (
                        <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-sans">
                          {type}
                        </span>
                      ))}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Configure Import</h2>
              <p className="text-lg text-gray-600 font-sans">Set up your import parameters</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Import Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        defaultValue="2023-01-01"
                      />
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        defaultValue="2023-12-31"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Import Type</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans">
                      <option>All Transactions</option>
                      <option>Trades Only</option>
                      <option>Deposits/Withdrawals Only</option>
                      <option>Custom Selection</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Auto-classify transactions</label>
                        <p className="text-xs text-gray-500 font-sans">Use AI to automatically classify imported transactions</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 translate-x-6" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Skip duplicates</label>
                        <p className="text-xs text-gray-500 font-sans">Automatically skip transactions that already exist</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 translate-x-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Upload Data</h2>
              <p className="text-lg text-gray-600 font-sans">Upload your transaction files</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-yellow-400 transition-colors duration-300">
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
                  Drop your files here
                </h3>
                <p className="text-gray-600 mb-6 font-sans">
                  Supports CSV, Excel, and JSON files up to 50MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.json"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg cursor-pointer hover:bg-yellow-300 transition-colors duration-200 font-sans font-medium"
                >
                  Choose Files
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h4 className="text-lg font-bold text-gray-900 font-display">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900 font-sans">{file.name}</p>
                          <p className="text-sm text-gray-500 font-sans">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800 hover:scale-110 transition-all duration-200">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Review & Process</h2>
              <p className="text-lg text-gray-600 font-sans">Review your import and start processing</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Import Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 font-display">1,247</div>
                    <div className="text-sm text-gray-600 font-sans">Total Transactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 font-display">1,189</div>
                    <div className="text-sm text-gray-600 font-sans">Valid Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 font-display">58</div>
                    <div className="text-sm text-gray-600 font-sans">Duplicates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 font-display">12</div>
                    <div className="text-sm text-gray-600 font-sans">Errors</div>
                  </div>
                </div>

                {isProcessing && (
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-2 font-sans">
                      <span>Processing transactions...</span>
                      <span>{importProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-yellow-400 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${importProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Date</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Type</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Asset</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Amount</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-600 font-sans">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', status: 'valid' },
                        { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', status: 'valid' },
                        { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', status: 'duplicate' },
                        { date: '2023-12-12', type: 'Receive', asset: 'SOL', amount: '50', status: 'error' }
                      ].map((tx, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-900 font-sans">{tx.date}</td>
                          <td className="py-3 text-sm text-gray-900 font-sans">{tx.type}</td>
                          <td className="py-3 text-sm text-gray-900 font-sans">{tx.asset}</td>
                          <td className="py-3 text-sm text-gray-900 font-sans">{tx.amount}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                              tx.status === 'valid' ? 'bg-green-100 text-green-800' :
                              tx.status === 'duplicate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
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
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">Import Transactions</h1>
              <p className="text-gray-600 font-sans">Import crypto transactions from exchanges and wallets</p>
            </div>
          </div>
          
          {currentStep === 4 && !isProcessing && (
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-sans font-medium">
              Start Import
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="mt-8">
          <div className="flex items-center justify-between max-w-4xl">
            {steps.map((step, index) => (
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
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-12">
        {renderStepContent()}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-8 py-6">
        <div className="flex justify-between">
          <button
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans"
          >
            Previous
          </button>
          
          <button
            disabled={currentStep === 4}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium"
          >
            {currentStep === 4 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportTransactionsWorkflow;