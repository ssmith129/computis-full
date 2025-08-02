import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, X, AlertCircle, Zap, Shield, Wallet } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import { useNotifications } from './NotificationSystem';
import FormSection from './FormSection';

interface ImportTransactionsWorkflowProps {
  onBack: () => void;
}

const ImportTransactionsWorkflow: React.FC<ImportTransactionsWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSource, setSelectedSource] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
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
    
    // Simulate validation and preview generation
    if (validFiles.length > 0) {
      setTimeout(() => {
        setPreviewData([
          { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000', status: 'valid' },
          { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800', status: 'valid' },
          { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', price: '1', status: 'warning' },
          { date: '2023-12-12', type: 'Invalid', asset: '', amount: '', price: '', status: 'error' }
        ]);
        setCurrentStep(2);
      }, 1000);
    }
  }, [addNotification]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    // Simulate file validation
    if (files.length > 0) {
      setTimeout(() => {
        setPreviewData([
          { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000', status: 'valid' },
          { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800', status: 'valid' },
          { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', price: '1', status: 'warning' },
          { date: '2023-12-12', type: 'Invalid', asset: '', amount: '', price: '', status: 'error' }
        ]);
        setCurrentStep(2);
      }, 1000);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 3) {
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
    setCurrentStep(3);

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
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display">Select Data Source</h2>
              <p className="text-gray-600 mt-1 font-sans">Choose where you want to import transactions from</p>
            </div>

            {/* Data Sources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataSources.map((source) => (
                <AnimatedCard
                  key={source.id}
                  className={`p-6 cursor-pointer border-2 transition-all duration-200 ${
                    selectedSource === source.id
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSource(source.id)}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{source.icon}</span>
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

                    <div className="flex flex-wrap justify-center gap-1 mt-4">
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

            {/* Selected Source Info */}
            {selectedSource && (
              <AnimatedCard className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 font-display">
                      {dataSources.find(s => s.id === selectedSource)?.name} Selected
                    </h4>
                    <p className="text-sm text-blue-800 mt-1 font-sans">
                      You'll be able to upload CSV files or connect via API in the next step.
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display">Upload Transaction Data</h2>
              <p className="text-gray-600 mt-1 font-sans">
                Upload your transaction files from {dataSources.find(s => s.id === selectedSource)?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* File Upload Area */}
              <div className="lg:col-span-2">
                <FormSection title="Upload Files" description="Drag and drop or select your transaction files">
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
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-900 font-display">
                          Uploaded Files ({uploadedFiles.length})
                        </h4>
                        <button
                          onClick={() => setUploadedFiles([])}
                          className="text-sm text-red-600 hover:text-red-800 font-sans"
                        >
                          Clear All
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    </div>
                  )}
                </FormSection>
              </div>

              {/* Import Tips Sidebar */}
              <div className="space-y-6">
                <FormSection title="Import Tips" description="Guidelines for successful imports">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 font-sans">Required Columns</h4>
                        <p className="text-xs text-gray-600 font-sans">Date, Type, Asset, Amount, Price</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 font-sans">Date Format</h4>
                        <p className="text-xs text-gray-600 font-sans">Use YYYY-MM-DD for best results</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 font-sans">File Size</h4>
                        <p className="text-xs text-gray-600 font-sans">Up to 10,000 transactions supported</p>
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="Sample Templates" description="Download example formats">
                  <div className="space-y-3">
                    <InteractiveButton variant="secondary" size="sm" icon={Download} className="w-full">
                      Coinbase Template
                    </InteractiveButton>
                    <InteractiveButton variant="secondary" size="sm" icon={Download} className="w-full">
                      Generic CSV Template
                    </InteractiveButton>
                    <InteractiveButton variant="secondary" size="sm" icon={Download} className="w-full">
                      MetaMask Template
                    </InteractiveButton>
                  </div>
                </FormSection>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display">Validate Data</h2>
              <p className="text-gray-600 mt-1 font-sans">Review your data before importing</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Validation Summary Cards */}
              <AnimatedCard className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 font-display">1,247</div>
                <div className="text-sm text-gray-600 font-sans">Total Records</div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 font-display">1,189</div>
                <div className="text-sm text-gray-600 font-sans">Valid</div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 font-display">46</div>
                <div className="text-sm text-gray-600 font-sans">Warnings</div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600 font-display">12</div>
                <div className="text-sm text-gray-600 font-sans">Errors</div>
              </AnimatedCard>
            </div>

            {/* Data Preview */}
            <FormSection title="Data Preview" description="Sample of your transaction data">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Asset</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase font-sans">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {previewData.map((row, index) => (
                      <tr key={index} className={`hover:bg-gray-50 transition-colors duration-200 ${
                        row.status === 'error' ? 'bg-red-50' : 
                        row.status === 'warning' ? 'bg-yellow-50' : ''
                      }`}>
                        <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.asset}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.amount}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.price}</td>
                        <td className="px-4 py-3">
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
            </FormSection>

            {/* Validation Issues */}
            <AnimatedCard className="p-6 border-red-200 bg-red-50">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-900 font-display">Issues Found</h4>
                  <ul className="text-sm text-red-800 mt-2 space-y-1 font-sans">
                    <li>• 12 rows have missing or invalid data</li>
                    <li>• 5 transactions have unrecognized asset symbols</li>
                    <li>• 3 rows have invalid date formats</li>
                  </ul>
                  <div className="mt-4">
                    <InteractiveButton variant="warning" size="sm">
                      Download Error Report
                    </InteractiveButton>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-display">
                {isProcessing ? 'Importing Transactions...' : 'Import Complete!'}
              </h2>
              <p className="text-gray-600 mt-1 font-sans">
                {isProcessing 
                  ? 'Processing your transaction data and applying AI classification'
                  : 'Your transactions have been successfully imported and classified'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Processing Status */}
              <FormSection 
                title={isProcessing ? "Import Progress" : "Import Summary"} 
                description={isProcessing ? "Processing your data..." : "Import completed successfully"}
              >
                {isProcessing ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700 font-sans">{importProgress}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600 font-sans">
                        <span>Processing transactions...</span>
                        <span>{importProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-yellow-400 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${importProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 text-center font-sans">
                        Validating data, applying AI classification, and organizing transactions...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">Import Successful!</h3>
                      <p className="text-sm text-gray-600 font-sans">
                        1,189 transactions imported with 89% automatically classified
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 font-display">1,189</div>
                        <div className="text-xs text-gray-600 font-sans">Imported</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 font-display">89%</div>
                        <div className="text-xs text-gray-600 font-sans">AI Classified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 font-display">47s</div>
                        <div className="text-xs text-gray-600 font-sans">Processing Time</div>
                      </div>
                    </div>
                  </div>
                )}
              </FormSection>

              {/* Next Steps */}
              {!isProcessing && (
                <FormSection title="Next Steps" description="What would you like to do next?">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900 font-sans">Review Transactions</h4>
                          <p className="text-sm text-blue-700 font-sans">
                            Check imported transactions for accuracy
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-yellow-900 font-sans">AI Classification</h4>
                          <p className="text-sm text-yellow-700 font-sans">
                            Review AI-suggested classifications
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start space-x-3">
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

                    <div className="space-y-3">
                      <InteractiveButton variant="primary" size="md" className="w-full">
                        View Transactions
                      </InteractiveButton>
                      <InteractiveButton variant="secondary" size="md" className="w-full">
                        Import More Data
                      </InteractiveButton>
                    </div>
                  </div>
                </FormSection>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <InteractiveButton 
            variant="secondary" 
            size="sm" 
            icon={ArrowLeft}
            onClick={onBack}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-display">Import Transactions</h1>
            <p className="text-gray-600 font-sans">Import crypto transactions from exchanges and wallets</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {currentStep === 2 && !isProcessing && (
            <InteractiveButton 
              variant="primary" 
              size="md"
              onClick={startImport}
              disabled={uploadedFiles.length === 0}
            >
              Start Import
            </InteractiveButton>
          )}
          
          {currentStep === 3 && !isProcessing && (
            <InteractiveButton 
              variant="success" 
              size="md" 
              icon={Download}
            >
              Download Report
            </InteractiveButton>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <AnimatedCard className="p-6">
        <div className="flex items-center justify-between">
          {['Select Source', 'Upload Data', 'Validate', 'Import'].map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= index 
                  ? 'bg-yellow-400 border-yellow-400 text-gray-900' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {currentStep > index ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="font-medium text-sm">{index + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 font-display">{step}</p>
              </div>
              {index < 3 && (
                <div className="flex-1 h-px bg-gray-300 mx-6" />
              )}
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Footer */}
      <div className="flex justify-between">
        <InteractiveButton
          variant="secondary"
          size="md"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </InteractiveButton>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 font-sans">
            Step {currentStep + 1} of 4
          </span>
        </div>
        
        <InteractiveButton
          variant="primary"
          size="md"
          onClick={nextStep}
          disabled={
            currentStep === 3 ||
            (currentStep === 0 && !selectedSource) ||
            (currentStep === 1 && uploadedFiles.length === 0) ||
            isProcessing
          }
        >
          {currentStep === 3 ? 'Complete' : 'Next'}
        </InteractiveButton>
      </div>
    </div>
  );
};

export default ImportTransactionsWorkflow;