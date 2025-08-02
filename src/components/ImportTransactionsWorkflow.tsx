import React, { useState, useCallback } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, X, AlertCircle, Zap, Shield, Wallet, Play, Pause, RotateCcw } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import { useNotifications } from './NotificationSystem';
import FormSection from './FormSection';
import Badge from './Badge';
import ProgressIndicator from './ProgressIndicator';

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
  const [validationResults, setValidationResults] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0
  });
  const { addNotification } = useNotifications();

  // Data sources with enhanced information
  const dataSources = [
    {
      id: 'coinbase',
      name: 'Coinbase',
      description: 'Import from Coinbase Pro/Exchange',
      icon: '🏦',
      popularity: 'Most Popular',
      difficulty: 'Easy',
      avgTime: '2-5 min',
      formats: ['CSV', 'API'],
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      id: 'binance',
      name: 'Binance',
      description: 'World\'s largest crypto exchange',
      icon: '⚡',
      popularity: 'Popular',
      difficulty: 'Easy',
      avgTime: '2-5 min',
      formats: ['CSV', 'API'],
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum wallet',
      icon: '🦊',
      popularity: 'Common',
      difficulty: 'Medium',
      avgTime: '3-7 min',
      formats: ['CSV', 'Address'],
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      id: 'ledger',
      name: 'Ledger',
      description: 'Hardware wallet for security',
      icon: '🔒',
      popularity: 'Secure',
      difficulty: 'Medium',
      avgTime: '5-10 min',
      formats: ['CSV', 'Ledger Live'],
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      id: 'custom',
      name: 'Custom CSV',
      description: 'Upload your own CSV file',
      icon: '📄',
      popularity: 'Flexible',
      difficulty: 'Easy',
      avgTime: '1-3 min',
      formats: ['CSV', 'Excel'],
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    },
    {
      id: 'other',
      name: 'Other Exchange',
      description: 'Kraken, KuCoin, and more',
      icon: '🔗',
      popularity: 'Various',
      difficulty: 'Medium',
      avgTime: '3-8 min',
      formats: ['CSV'],
      color: 'bg-gray-50 border-gray-200 text-gray-800'
    }
  ];

  const workflowSteps = [
    {
      title: 'Select Source',
      description: 'Choose data source',
      status: currentStep >= 0 ? (currentStep > 0 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Upload Files',
      description: 'Upload transaction data',
      status: currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Validate Data',
      description: 'Review and validate',
      status: currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Import Complete',
      description: 'Finalize import',
      status: currentStep >= 3 ? 'completed' : 'pending'
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
      file.name.endsWith('.csv') ||
      file.type.includes('spreadsheet') ||
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls')
    );
    
    if (validFiles.length !== files.length) {
      addNotification({
        type: 'warning',
        title: 'Some Files Skipped',
        message: 'Only CSV and Excel files are supported.',
        duration: 4000
      });
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      validateFiles(validFiles);
    }
  }, [addNotification]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    
    if (files.length > 0) {
      validateFiles(files);
    }
  };

  const validateFiles = (files: File[]) => {
    // Simulate file validation
    setTimeout(() => {
      const sampleData = [
        { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000', status: 'valid' },
        { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800', status: 'valid' },
        { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', price: '1', status: 'warning' },
        { date: '2023-12-12', type: '', asset: '', amount: '', price: '', status: 'error' }
      ];
      
      setPreviewData(sampleData);
      setValidationResults({
        total: 1247,
        valid: 1189,
        warnings: 46,
        errors: 12
      });
      
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setPreviewData([]);
      setValidationResults({ total: 0, valid: 0, warnings: 0, errors: 0 });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 0 && selectedSource) {
        // Auto-advance to upload step
      }
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

    // Simulate import process with realistic progress
    const progressSteps = [10, 25, 45, 60, 75, 85, 95, 100];
    
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setImportProgress(progressSteps[i]);
    }
    
    setIsProcessing(false);
    
    addNotification({
      type: 'success',
      title: 'Import Complete',
      message: `Successfully imported ${validationResults.valid} transactions.`,
      duration: 5000
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Data Sources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataSources.map((source) => (
                <AnimatedCard
                  key={source.id}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedSource === source.id
                      ? 'ring-2 ring-yellow-400 bg-yellow-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSource(source.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{source.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-gray-900 font-display">{source.name}</h3>
                        <Badge variant="pending" className={source.color}>
                          {source.popularity}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 font-sans">{source.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 font-sans">Difficulty:</span>
                          <span className={`font-medium font-sans ${
                            source.difficulty === 'Easy' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {source.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 font-sans">Est. Time:</span>
                          <span className="font-medium text-gray-700 font-sans">{source.avgTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {source.formats.map((format) => (
                            <span key={format} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                              {format}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* Selected Source Info */}
            {selectedSource && (
              <AnimatedCard className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 font-display">
                      {dataSources.find(s => s.id === selectedSource)?.name} Selected
                    </h4>
                    <p className="text-xs text-blue-700 font-sans">
                      Ready to proceed with {dataSources.find(s => s.id === selectedSource)?.formats.join(' or ')} import
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            )}
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Area - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <FormSection 
                title="Upload Transaction Files" 
                description={`Upload your ${dataSources.find(s => s.id === selectedSource)?.name} transaction data`}
              >
                {/* Drag & Drop Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragOver 
                      ? 'border-yellow-400 bg-yellow-50 scale-102' 
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
                      isDragOver ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <Upload className={`h-8 w-8 ${isDragOver ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">
                      {isDragOver ? 'Drop files here' : 'Drag & drop your files'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 font-sans">
                      or click to browse and select files
                    </p>
                    
                    <input
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload-input"
                    />
                    <label htmlFor="file-upload-input">
                      <InteractiveButton 
                        variant="primary" 
                        size="md"
                        className="cursor-pointer"
                      >
                        Select Files
                      </InteractiveButton>
                    </label>
                    
                    <p className="text-xs text-gray-500 mt-3 font-sans">
                      Supports CSV, Excel • Max 50MB • Up to 10,000 transactions
                    </p>
                  </div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 font-display">
                        Uploaded Files ({uploadedFiles.length})
                      </h4>
                      <InteractiveButton 
                        variant="secondary" 
                        size="sm"
                        onClick={() => setUploadedFiles([])}
                      >
                        Clear All
                      </InteractiveButton>
                    </div>
                    
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 font-sans">{file.name}</p>
                              <p className="text-xs text-gray-500 font-sans">
                                {(file.size / 1024).toFixed(1)} KB • {file.type.includes('csv') ? 'CSV' : 'Excel'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusIndicator status="success" label="Ready" size="sm" />
                            <InteractiveButton
                              variant="secondary"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-3 h-3" />
                            </InteractiveButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FormSection>
            </div>

            {/* Sidebar - Templates & Tips */}
            <div className="space-y-6">
              <FormSection title="Quick Start" description="Templates and guides">
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900 font-sans">Templates</span>
                    </div>
                    <div className="space-y-2">
                      <InteractiveButton variant="secondary" size="sm" className="w-full text-xs">
                        Coinbase Template
                      </InteractiveButton>
                      <InteractiveButton variant="secondary" size="sm" className="w-full text-xs">
                        Generic CSV Template
                      </InteractiveButton>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900 font-sans">Required Columns</span>
                    </div>
                    <div className="text-xs text-blue-800 space-y-1 font-sans">
                      <div>• Date (YYYY-MM-DD)</div>
                      <div>• Transaction Type</div>
                      <div>• Asset Symbol</div>
                      <div>• Amount</div>
                      <div>• Price (USD)</div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Validation Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <AnimatedCard className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 font-display">{validationResults.total.toLocaleString()}</div>
                <div className="text-xs text-gray-600 font-sans">Total Records</div>
              </AnimatedCard>
              <AnimatedCard className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 font-display">{validationResults.valid.toLocaleString()}</div>
                <div className="text-xs text-gray-600 font-sans">Valid</div>
              </AnimatedCard>
              <AnimatedCard className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 font-display">{validationResults.warnings}</div>
                <div className="text-xs text-gray-600 font-sans">Warnings</div>
              </AnimatedCard>
              <AnimatedCard className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 font-display">{validationResults.errors}</div>
                <div className="text-xs text-gray-600 font-sans">Errors</div>
              </AnimatedCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Data Preview */}
              <div className="lg:col-span-2">
                <FormSection title="Data Preview" description="Sample of your transaction data">
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
                        {previewData.slice(0, 5).map((row, index) => (
                          <tr key={index} className={`transition-colors duration-200 ${
                            row.status === 'error' ? 'bg-red-50' : 
                            row.status === 'warning' ? 'bg-yellow-50' : 
                            'hover:bg-gray-50'
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
                </FormSection>
              </div>

              {/* Validation Issues */}
              <div className="space-y-4">
                {validationResults.errors > 0 && (
                  <AnimatedCard className="p-4 border-red-200 bg-red-50">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-red-900 font-display">
                          {validationResults.errors} Errors Found
                        </h4>
                        <ul className="text-xs text-red-800 mt-1 space-y-1 font-sans">
                          <li>• Missing required fields</li>
                          <li>• Invalid date formats</li>
                          <li>• Unrecognized assets</li>
                        </ul>
                        <InteractiveButton variant="warning" size="sm" className="mt-2">
                          Download Error Report
                        </InteractiveButton>
                      </div>
                    </div>
                  </AnimatedCard>
                )}

                {validationResults.warnings > 0 && (
                  <AnimatedCard className="p-4 border-yellow-200 bg-yellow-50">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-900 font-display">
                          {validationResults.warnings} Warnings
                        </h4>
                        <p className="text-xs text-yellow-800 mt-1 font-sans">
                          Some transactions need review
                        </p>
                      </div>
                    </div>
                  </AnimatedCard>
                )}

                <AnimatedCard className="p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 font-display">Import Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-sans">Skip invalid rows</span>
                      <div className="relative inline-block w-8 h-4">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-3 w-3 bg-white rounded-full top-0.5 translate-x-4" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600 font-sans">Auto-classify transactions</span>
                      <div className="relative inline-block w-8 h-4">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-3 w-3 bg-white rounded-full top-0.5 translate-x-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {isProcessing ? (
              <div className="max-w-2xl mx-auto">
                <AnimatedCard className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-yellow-400 rounded-full border-r-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700 font-display">{importProgress}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">
                        Importing Your Transactions
                      </h3>
                      <p className="text-sm text-gray-600 font-sans">
                        Processing {validationResults.valid.toLocaleString()} transactions...
                      </p>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${importProgress}%` }}
                      />
                    </div>

                    <div className="text-xs text-gray-500 font-sans">
                      {importProgress < 30 && 'Validating data...'}
                      {importProgress >= 30 && importProgress < 60 && 'Processing transactions...'}
                      {importProgress >= 60 && importProgress < 90 && 'Applying AI classification...'}
                      {importProgress >= 90 && 'Finalizing import...'}
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-display">Import Complete!</h2>
                  <p className="text-gray-600 font-sans">
                    Successfully processed {validationResults.valid.toLocaleString()} transactions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <AnimatedCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 font-display">{validationResults.valid.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 font-sans">Transactions Imported</div>
                  </AnimatedCard>
                  <AnimatedCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 font-display">89%</div>
                    <div className="text-sm text-gray-600 font-sans">AI Classified</div>
                  </AnimatedCard>
                  <AnimatedCard className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 font-display">12s</div>
                    <div className="text-sm text-gray-600 font-sans">Processing Time</div>
                  </AnimatedCard>
                </div>

                <FormSection title="What's Next?" description="Choose your next action">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-blue-900 mb-2 font-display">Review Transactions</h4>
                      <p className="text-xs text-blue-700 mb-3 font-sans">Check imported data for accuracy</p>
                      <InteractiveButton variant="secondary" size="sm" className="w-full">
                        View Transactions
                      </InteractiveButton>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                      <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-4 w-4 text-yellow-600" />
                      </div>
                      <h4 className="text-sm font-medium text-yellow-900 mb-2 font-display">AI Classification</h4>
                      <p className="text-xs text-yellow-700 mb-3 font-sans">Review AI suggestions</p>
                      <InteractiveButton variant="warning" size="sm" className="w-full">
                        Review Classifications
                      </InteractiveButton>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Download className="h-4 w-4 text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-green-900 mb-2 font-display">Generate Reports</h4>
                      <p className="text-xs text-green-700 mb-3 font-sans">Create tax documents</p>
                      <InteractiveButton variant="success" size="sm" className="w-full">
                        Generate Reports
                      </InteractiveButton>
                    </div>
                  </div>
                </FormSection>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Matches app design */}
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
        
        <div className="flex items-center space-x-2">
          {currentStep === 2 && !isProcessing && (
            <InteractiveButton 
              variant="success" 
              size="md"
              onClick={startImport}
              disabled={uploadedFiles.length === 0 || validationResults.errors > 0}
            >
              <Play className="w-4 h-4 mr-2" />
              Start Import
            </InteractiveButton>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <AnimatedCard className="p-4">
        <ProgressIndicator 
          steps={workflowSteps} 
          currentStep={currentStep}
        />
      </AnimatedCard>

      {/* Step Content */}
      <div className="min-h-96">
        {renderStepContent()}
      </div>

      {/* Navigation Footer */}
      <AnimatedCard className="p-4">
        <div className="flex justify-between items-center">
          <InteractiveButton
            variant="secondary"
            size="md"
            onClick={prevStep}
            disabled={currentStep === 0}
            icon={ArrowLeft}
          >
            Previous
          </InteractiveButton>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-sans">
              Step {currentStep + 1} of {workflowSteps.length}
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
      </AnimatedCard>
    </div>
  );
};

export default ImportTransactionsWorkflow;