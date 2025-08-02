import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, X, Eye, AlertCircle, Clock, Zap, Shield } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import ProgressIndicator from './ProgressIndicator';
import { useNotifications } from './NotificationSystem';

interface ImportTransactionsWorkflowProps {
  onBack: () => void;
}

const ImportTransactionsWorkflow: React.FC<ImportTransactionsWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSource, setSelectedSource] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { addNotification } = useNotifications();

  const dataSources = [
    {
      id: 'coinbase',
      name: 'Coinbase',
      icon: '🏦',
      description: 'Import from Coinbase Pro/Exchange',
      popularity: 'Most Popular',
      security: 'High',
      formats: ['CSV', 'API'],
      estimatedTime: '2-5 min'
    },
    {
      id: 'binance',
      name: 'Binance',
      icon: '⚡',
      description: 'Import from Binance exchange',
      popularity: 'Popular',
      security: 'High',
      formats: ['CSV', 'API'],
      estimatedTime: '2-5 min'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Import from MetaMask wallet',
      popularity: 'Popular',
      security: 'Medium',
      formats: ['CSV', 'Address'],
      estimatedTime: '1-3 min'
    },
    {
      id: 'ledger',
      name: 'Ledger',
      icon: '🔒',
      description: 'Import from Ledger hardware wallet',
      popularity: 'Secure',
      security: 'High',
      formats: ['CSV', 'Ledger Live'],
      estimatedTime: '3-7 min'
    },
    {
      id: 'custom',
      name: 'Custom CSV',
      icon: '📄',
      description: 'Upload custom CSV file',
      popularity: 'Flexible',
      security: 'Medium',
      formats: ['CSV', 'Excel'],
      estimatedTime: '1-2 min'
    },
    {
      id: 'api',
      name: 'API Connection',
      icon: '🔗',
      description: 'Connect via API keys',
      popularity: 'Advanced',
      security: 'High',
      formats: ['API'],
      estimatedTime: '5-10 min'
    }
  ];

  const steps = [
    { title: 'Select Source', description: 'Choose data source', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'pending' },
    { title: 'Upload Data', description: 'Upload or connect', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
    { title: 'Validate', description: 'Review data quality', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
    { title: 'Import', description: 'Process transactions', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending' }
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'text/csv' || 
      file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    
    if (validFiles.length !== files.length) {
      addNotification({
        type: 'warning',
        title: 'Invalid Files',
        message: 'Some files were skipped. Only CSV and Excel files are supported.',
        duration: 4000
      });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  }, [addNotification]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate file validation
    setTimeout(() => {
      if (files.length > 0) {
        setPreviewData([
          { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000', status: 'valid' },
          { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800', status: 'valid' },
          { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', price: '1', status: 'warning' },
          { date: '2023-12-12', type: 'Invalid', asset: '', amount: '', price: '', status: 'error' }
        ]);
      }
    }, 1000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const startImport = async () => {
    setIsProcessing(true);
    setImportProgress(0);

    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          addNotification({
            type: 'success',
            title: 'Import Complete',
            message: `Successfully imported ${previewData.filter(d => d.status === 'valid').length} transactions.`,
            duration: 5000
          });
          return 100;
        }
        return prev + 12;
      });
    }, 500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-display">Select Data Source</h2>
              <p className="text-sm text-gray-600 font-sans">Choose where you want to import transactions from</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataSources.map((source) => (
                <AnimatedCard
                  key={source.id}
                  className={`p-4 cursor-pointer border-2 transition-all duration-200 ${
                    selectedSource === source.id
                      ? 'border-yellow-400 bg-yellow-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSource(source.id)}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{source.icon}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium font-sans">
                        {source.popularity}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{source.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 font-sans">{source.description}</p>
                    
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span className="font-sans">Security:</span>
                        <span className={`font-medium font-sans ${
                          source.security === 'High' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {source.security}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans">Time:</span>
                        <span className="font-medium font-sans">{source.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-1 mt-3">
                      {source.formats.map((format) => (
                        <span key={format} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-display">Upload Transaction Data</h2>
              <p className="text-sm text-gray-600 font-sans">
                Upload your transaction files from {dataSources.find(s => s.id === selectedSource)?.name}
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  isDragOver 
                    ? 'border-yellow-400 bg-yellow-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-yellow-500' : 'text-gray-400'}`} />
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">
                  {isDragOver ? 'Drop files here' : 'Drag and drop files'}
                </h3>
                <p className="text-sm text-gray-600 mb-4 font-sans">
                  Supports CSV and Excel files up to 50MB each
                </p>
                
                <input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <InteractiveButton variant="primary" size="md">
                    Choose Files
                  </InteractiveButton>
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <AnimatedCard className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900 font-display">
                      Uploaded Files ({uploadedFiles.length})
                    </h4>
                    <button
                      onClick={() => setUploadedFiles([])}
                      className="text-xs text-red-600 hover:text-red-800 font-sans"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 font-sans">{file.name}</p>
                            <p className="text-xs text-gray-500 font-sans">
                              {(file.size / 1024).toFixed(1)} KB • {file.type.includes('csv') ? 'CSV' : 'Excel'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIndicator status="success" label="Valid" size="sm" />
                          <button
                            onClick={() => removeFile(index)}
                            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedCard>
              )}

              {/* Quick Tips */}
              <AnimatedCard className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 font-display">Import Tips</h4>
                    <ul className="text-xs text-blue-800 mt-2 space-y-1 font-sans">
                      <li>• Ensure your CSV has columns: Date, Type, Asset, Amount, Price</li>
                      <li>• Use YYYY-MM-DD date format for best results</li>
                      <li>• Files with 10,000+ transactions may take longer to process</li>
                    </ul>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-display">Validate Data</h2>
              <p className="text-sm text-gray-600 font-sans">Review your data before importing</p>
            </div>

            <div className="space-y-6">
              {/* Validation Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AnimatedCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 font-display">1,247</div>
                  <div className="text-xs text-gray-600 font-sans">Total Records</div>
                </AnimatedCard>
                <AnimatedCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 font-display">1,189</div>
                  <div className="text-xs text-gray-600 font-sans">Valid</div>
                </AnimatedCard>
                <AnimatedCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600 font-display">46</div>
                  <div className="text-xs text-gray-600 font-sans">Warnings</div>
                </AnimatedCard>
                <AnimatedCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 font-display">12</div>
                  <div className="text-xs text-gray-600 font-sans">Errors</div>
                </AnimatedCard>
              </div>

              {/* Data Preview Table */}
              <AnimatedCard className="overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 font-display">Data Preview</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-sans">
                      View Full Dataset
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Asset</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Price</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase font-sans">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {previewData.map((row, index) => (
                        <tr key={index} className={`hover:bg-gray-50 ${
                          row.status === 'error' ? 'bg-red-50' : 
                          row.status === 'warning' ? 'bg-yellow-50' : ''
                        }`}>
                          <td className="px-3 py-2 text-xs text-gray-900 font-sans">{row.date}</td>
                          <td className="px-3 py-2 text-xs text-gray-900 font-sans">{row.type}</td>
                          <td className="px-3 py-2 text-xs text-gray-900 font-sans">{row.asset}</td>
                          <td className="px-3 py-2 text-xs text-gray-900 font-sans">{row.amount}</td>
                          <td className="px-3 py-2 text-xs text-gray-900 font-sans">{row.price}</td>
                          <td className="px-3 py-2">
                            <StatusIndicator 
                              status={
                                row.status === 'valid' ? 'success' :
                                row.status === 'warning' ? 'warning' :
                                'error'
                              }
                              label={row.status}
                              size="sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedCard>

              {/* Validation Issues */}
              {validationErrors.length > 0 && (
                <AnimatedCard className="p-4 border-red-200 bg-red-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-red-900 font-display">Validation Issues Found</h4>
                      <ul className="text-xs text-red-800 mt-2 space-y-1 font-sans">
                        <li>• 12 rows have missing or invalid data</li>
                        <li>• 5 transactions have unrecognized asset symbols</li>
                        <li>• 3 rows have invalid date formats</li>
                      </ul>
                    </div>
                  </div>
                </AnimatedCard>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                {isProcessing ? 'Importing Transactions...' : 'Import Complete!'}
              </h2>
              <p className="text-sm text-gray-600 font-sans">
                {isProcessing 
                  ? 'Processing your transaction data and applying AI classification'
                  : 'Your transactions have been successfully imported and classified'
                }
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <AnimatedCard className="p-6">
                {isProcessing ? (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700 font-sans">{importProgress}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600 font-sans">
                        <span>Processing transactions...</span>
                        <span>{importProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${importProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 font-sans">
                        Validating data, applying AI classification, and organizing transactions...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">Import Successful!</h3>
                      <p className="text-sm text-gray-600 font-sans">
                        1,189 transactions imported with 89% automatically classified
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600 font-display">1,189</div>
                        <div className="text-xs text-gray-600 font-sans">Imported</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600 font-display">89%</div>
                        <div className="text-xs text-gray-600 font-sans">AI Classified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600 font-display">47s</div>
                        <div className="text-xs text-gray-600 font-sans">Processing Time</div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <InteractiveButton variant="primary" size="md" className="flex-1">
                        View Transactions
                      </InteractiveButton>
                      <InteractiveButton variant="secondary" size="md" className="flex-1">
                        Import More
                      </InteractiveButton>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={ArrowLeft}
                onClick={onBack}
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900 font-display">Import Transactions</h1>
                <p className="text-xs text-gray-600 font-sans">Import crypto transactions from exchanges and wallets</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep === 2 && !isProcessing && (
                <InteractiveButton 
                  variant="primary" 
                  size="sm"
                  onClick={startImport}
                  disabled={uploadedFiles.length === 0}
                >
                  Start Import
                </InteractiveButton>
              )}
              
              {currentStep === 3 && !isProcessing && (
                <InteractiveButton 
                  variant="success" 
                  size="sm" 
                  icon={Download}
                >
                  Download Report
                </InteractiveButton>
              )}
            </div>
          </div>

          {/* Compact Progress Indicator */}
          <div className="mt-4">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderStepContent()}
      </div>

      {/* Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <InteractiveButton
            variant="secondary"
            size="md"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </InteractiveButton>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-sans">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          <InteractiveButton
            variant="primary"
            size="md"
            onClick={nextStep}
            disabled={
              currentStep === steps.length - 1 ||
              (currentStep === 0 && !selectedSource) ||
              (currentStep === 1 && uploadedFiles.length === 0) ||
              isProcessing
            }
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
};

export default ImportTransactionsWorkflow;