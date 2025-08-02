import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface ImportWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportWizard: React.FC<ImportWizardProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [mappingConfig, setMappingConfig] = useState({
    date: '',
    type: '',
    asset: '',
    amount: '',
    price: ''
  });

  const steps = [
    { number: 1, title: 'Select Source', description: 'Choose your data source' },
    { number: 2, title: 'Upload File', description: 'Upload your transaction file' },
    { number: 3, title: 'Map Columns', description: 'Map CSV columns to fields' },
    { number: 4, title: 'Review & Import', description: 'Review and confirm import' }
  ];

  const dataSources = [
    { id: 'coinbase', name: 'Coinbase', icon: '🏦', description: 'Import from Coinbase Pro/Exchange' },
    { id: 'binance', name: 'Binance', icon: '⚡', description: 'Import from Binance exchange' },
    { id: 'metamask', name: 'MetaMask', icon: '🦊', description: 'Import from MetaMask wallet' },
    { id: 'ledger', name: 'Ledger', icon: '🔒', description: 'Import from Ledger hardware wallet' },
    { id: 'csv', name: 'Custom CSV', icon: '📄', description: 'Upload custom CSV file' },
    { id: 'api', name: 'API Connection', icon: '🔗', description: 'Connect via API keys' }
  ];

  const sampleData = [
    { date: '2023-12-01', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000' },
    { date: '2023-12-02', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800' },
    { date: '2023-12-03', type: 'Receive', asset: 'BTC', amount: '0.1', price: '41500' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 font-display">Import Transaction Data</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
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
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 font-display">{step.title}</p>
                      <p className="text-xs text-gray-500 font-sans">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-gray-300 mx-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-6 min-h-96">
            {/* Step 1: Select Source */}
            {currentStep === 1 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6 font-display">Select Data Source</h4>
                <div className="grid grid-cols-2 gap-4">
                  {dataSources.map((source) => (
                    <div
                      key={source.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedSource === source.id
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{source.icon}</span>
                        <div>
                          <h5 className="font-medium text-gray-900 font-display">{source.name}</h5>
                          <p className="text-sm text-gray-600 font-sans">{source.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Upload File */}
            {currentStep === 2 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6 font-display">Upload Transaction File</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h5 className="text-lg font-medium text-gray-900 mb-2 font-display">
                    {uploadedFile ? uploadedFile.name : 'Drop your file here'}
                  </h5>
                  <p className="text-gray-600 mb-4 font-sans">
                    {uploadedFile 
                      ? `File size: ${(uploadedFile.size / 1024).toFixed(1)} KB`
                      : 'Supports CSV, Excel, and JSON files up to 10MB'
                    }
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg cursor-pointer hover:bg-yellow-300 transition-colors duration-200 font-sans"
                  >
                    Choose File
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-800 font-medium font-sans">File uploaded successfully!</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Map Columns */}
            {currentStep === 3 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6 font-display">Map CSV Columns</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-4 font-display">CSV Columns</h5>
                    <div className="space-y-2">
                      {['Date', 'Transaction Type', 'Asset', 'Amount', 'Price USD'].map((column) => (
                        <div key={column} className="p-3 bg-gray-50 rounded-lg font-sans">
                          {column}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-4 font-display">Map to Fields</h5>
                    <div className="space-y-4">
                      {Object.entries(mappingConfig).map(([field, value]) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-sans capitalize">
                            {field}
                          </label>
                          <select
                            value={value}
                            onChange={(e) => setMappingConfig(prev => ({ ...prev, [field]: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                          >
                            <option value="">Select column...</option>
                            <option value="date">Date</option>
                            <option value="type">Transaction Type</option>
                            <option value="asset">Asset</option>
                            <option value="amount">Amount</option>
                            <option value="price">Price USD</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Import */}
            {currentStep === 4 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-6 font-display">Review & Import</h4>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h5 className="font-medium text-gray-900 mb-3 font-display">Import Summary</h5>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 font-display">156</p>
                      <p className="text-sm text-gray-600 font-sans">Transactions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 font-display">5</p>
                      <p className="text-sm text-gray-600 font-sans">Assets</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 font-display">2</p>
                      <p className="text-sm text-gray-600 font-sans">Warnings</p>
                    </div>
                  </div>
                </div>

                <h5 className="font-medium text-gray-900 mb-3 font-display">Sample Data Preview</h5>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-sans">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-sans">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-sans">Asset</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-sans">Amount</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 font-sans">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-2 text-sm text-gray-900 font-sans">{row.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 font-sans">{row.type}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 font-sans">{row.asset}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 font-sans">{row.amount}</td>
                          <td className="px-4 py-2 text-sm text-gray-900 font-sans">${row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-yellow-800 font-medium font-sans">2 transactions have missing price data</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between">
            <button
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              <ArrowLeft className="w-4 h-4 mr-2 inline" />
              Previous
            </button>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-sans">
                Cancel
              </button>
              {currentStep < 4 ? (
                <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2 inline" />
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-sans">
                  Import Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportWizard;