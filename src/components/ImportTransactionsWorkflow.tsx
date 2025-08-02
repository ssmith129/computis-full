import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, X, ArrowRight } from 'lucide-react';

interface ImportTransactionsWorkflowProps {
  onBack: () => void;
}

const ImportTransactionsWorkflow: React.FC<ImportTransactionsWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const steps = [
    { number: 1, title: 'Choose Source', description: 'Select data source' },
    { number: 2, title: 'Upload & Validate', description: 'Upload and check data' },
    { number: 3, title: 'Review & Import', description: 'Final review and import' },
    { number: 4, title: 'Complete', description: 'Import finished' }
  ];

  const dataSources = [
    { 
      id: 'coinbase', 
      name: 'Coinbase', 
      icon: '🏦', 
      description: 'Import from Coinbase Pro/Exchange',
      category: 'Exchange',
      difficulty: 'Beginner',
      badge: 'Most Popular'
    },
    { 
      id: 'binance', 
      name: 'Binance', 
      icon: '⚡', 
      description: "World's largest crypto exchange",
      category: 'Exchange',
      difficulty: 'Beginner',
      badge: 'Popular'
    },
    { 
      id: 'metamask', 
      name: 'MetaMask', 
      icon: '🦊', 
      description: 'Popular Ethereum wallet',
      category: 'Wallet',
      difficulty: 'Intermediate',
      badge: 'Common'
    },
    { 
      id: 'ledger', 
      name: 'Ledger', 
      icon: '🔒', 
      description: 'Hardware wallet for security',
      category: 'Hardware',
      difficulty: 'Intermediate',
      badge: 'Secure'
    },
    { 
      id: 'csv', 
      name: 'Custom CSV', 
      icon: '📄', 
      description: 'Upload a custom CSV file',
      category: 'Custom',
      difficulty: 'Beginner',
      badge: 'Flexible'
    },
    { 
      id: 'other', 
      name: 'Other Platform', 
      icon: '🔗', 
      description: 'Kraken, KuCoin, and more',
      category: 'Exchange',
      difficulty: 'Intermediate',
      badge: 'Various'
    }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-start px-6 pt-12 pb-6">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">Import Transaction Data</h1>
                <p className="text-gray-600 font-sans">Securely import crypto transactions from exchanges and wallets</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-yellow-400 border-yellow-400 text-gray-900' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-medium text-sm">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 font-display">{step.title}</p>
                    <p className="text-xs text-gray-500 font-sans">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-8 transition-all duration-500 ${
                      currentStep > step.number ? 'bg-yellow-400' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg">
          <div className="px-8 py-12">
            {currentStep === 1 && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Import Your Transaction Data</h2>
                  <p className="text-lg text-gray-600 font-sans mb-8">
                    Choose your data source to get started. We'll guide you through each step to ensure your data is imported correctly.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 font-display">50+</div>
                      <div className="text-sm text-gray-600 font-sans">Supported Platforms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 font-display">10M+</div>
                      <div className="text-sm text-gray-600 font-sans">Transactions Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 font-display">99.9%</div>
                      <div className="text-sm text-gray-600 font-sans">Accuracy Rate</div>
                    </div>
                  </div>
                </div>

                {/* Data Source Selection */}
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Select Your Data Source</h3>
                    <p className="text-gray-600 font-sans">Choose the platform where your transaction data is located</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataSources.map((source) => (
                      <div
                        key={source.id}
                        onClick={() => setSelectedSource(source.id)}
                        className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedSource === source.id
                            ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                            : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
                        }`}
                      >
                        {/* Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${
                            source.badge === 'Most Popular' ? 'bg-green-100 text-green-800' :
                            source.badge === 'Popular' ? 'bg-yellow-100 text-yellow-800' :
                            source.badge === 'Common' ? 'bg-orange-100 text-orange-800' :
                            source.badge === 'Secure' ? 'bg-blue-100 text-blue-800' :
                            source.badge === 'Flexible' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {source.badge}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="text-center">
                          <div className="text-3xl mb-4">{source.icon}</div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2 font-display">{source.name}</h4>
                          <p className="text-sm text-gray-600 mb-4 font-sans">{source.description}</p>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-sans">Category:</span>
                              <span className="font-medium text-gray-700 font-sans">{source.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500 font-sans">Difficulty:</span>
                              <span className={`font-medium font-sans ${
                                source.difficulty === 'Beginner' ? 'text-green-600' :
                                source.difficulty === 'Intermediate' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {source.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Upload & Validate</h2>
                  <p className="text-lg text-gray-600 font-sans">Upload your transaction file for processing</p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-300 transition-colors duration-300">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">
                      {uploadedFile ? uploadedFile.name : 'Drop your file here'}
                    </h3>
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
                      className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg cursor-pointer hover:bg-yellow-300 transition-colors duration-200 font-sans font-medium"
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
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Review & Import</h2>
                  <p className="text-lg text-gray-600 font-sans">Review your data before importing</p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">Import Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900 font-display">156</div>
                        <div className="text-sm text-gray-600 font-sans">Transactions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 font-display">5</div>
                        <div className="text-sm text-gray-600 font-sans">Assets</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900 font-display">2</div>
                        <div className="text-sm text-gray-600 font-sans">Warnings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Import Complete!</h2>
                  <p className="text-lg text-gray-600 font-sans">Your transaction data has been successfully imported</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <div className="text-sm text-gray-600 font-sans">
                Step {currentStep} of {steps.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentStep === 4}
                className="flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium"
              >
                {currentStep === 4 ? 'Complete' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportTransactionsWorkflow;