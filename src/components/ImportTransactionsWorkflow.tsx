import React, { useState, useCallback, useRef } from 'react';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Download, X, AlertCircle, Zap, Shield, Wallet, Play, Pause, RotateCcw, Eye, HelpCircle, ArrowRight } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import { useNotifications } from './NotificationSystem';
import FormSection from './FormSection';
import Badge from './Badge';
import ProgressIndicator from './ProgressIndicator';
import LoadingSpinner from './LoadingSpinner';

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
  const [showPreview, setShowPreview] = useState(false);
  const [validationResults, setValidationResults] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0,
    issues: [] as Array<{type: 'error' | 'warning', message: string, count: number}>
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useNotifications();

  // Enhanced data sources with better categorization and guidance
  const dataSources = [
    {
      id: 'coinbase',
      name: 'Coinbase',
      description: 'Import from Coinbase Pro/Exchange',
      icon: '🏦',
      category: 'Exchange',
      popularity: 'Most Popular',
      difficulty: 'Beginner',
      avgTime: '2-3 min',
      formats: ['CSV', 'API'],
      color: 'bg-blue-50 border-blue-200',
      badgeColor: 'success',
      instructions: 'Download your transaction history from Coinbase Pro > Reports > Transaction History',
      templateUrl: '#'
    },
    {
      id: 'binance',
      name: 'Binance',
      description: 'World\'s largest crypto exchange',
      icon: '⚡',
      category: 'Exchange',
      popularity: 'Popular',
      difficulty: 'Beginner',
      avgTime: '2-4 min',
      formats: ['CSV', 'API'],
      color: 'bg-yellow-50 border-yellow-200',
      badgeColor: 'warning',
      instructions: 'Go to Binance > Wallet > Transaction History > Export',
      templateUrl: '#'
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Popular Ethereum wallet',
      icon: '🦊',
      category: 'Wallet',
      popularity: 'Common',
      difficulty: 'Intermediate',
      avgTime: '5-8 min',
      formats: ['CSV', 'Address'],
      color: 'bg-orange-50 border-orange-200',
      badgeColor: 'warning',
      instructions: 'Use a blockchain explorer like Etherscan to export your address history',
      templateUrl: '#'
    },
    {
      id: 'ledger',
      name: 'Ledger',
      description: 'Hardware wallet for security',
      icon: '🔒',
      category: 'Hardware',
      popularity: 'Secure',
      difficulty: 'Intermediate',
      avgTime: '5-10 min',
      formats: ['CSV', 'Ledger Live'],
      color: 'bg-green-50 border-green-200',
      badgeColor: 'success',
      instructions: 'Export from Ledger Live > Accounts > Export account operations',
      templateUrl: '#'
    },
    {
      id: 'custom',
      name: 'Custom CSV',
      description: 'Upload your own CSV file',
      icon: '📄',
      category: 'Custom',
      popularity: 'Flexible',
      difficulty: 'Beginner',
      avgTime: '1-2 min',
      formats: ['CSV', 'Excel'],
      color: 'bg-purple-50 border-purple-200',
      badgeColor: 'pending',
      instructions: 'Use our template or map your columns to our format',
      templateUrl: '#'
    },
    {
      id: 'other',
      name: 'Other Platform',
      description: 'Kraken, KuCoin, and more',
      icon: '🔗',
      category: 'Exchange',
      popularity: 'Various',
      difficulty: 'Intermediate',
      avgTime: '3-6 min',
      formats: ['CSV'],
      color: 'bg-gray-50 border-gray-200',
      badgeColor: 'pending',
      instructions: 'Most exchanges provide CSV export in their transaction history section',
      templateUrl: '#'
    }
  ];

  const workflowSteps = [
    {
      title: 'Choose Source',
      description: 'Select data source',
      status: currentStep >= 0 ? (currentStep > 0 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Upload & Validate',
      description: 'Upload and check data',
      status: currentStep >= 1 ? (currentStep > 1 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Review & Import',
      description: 'Final review and import',
      status: currentStep >= 2 ? (currentStep > 2 ? 'completed' : 'current') : 'pending'
    },
    {
      title: 'Complete',
      description: 'Import finished',
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
      file.name.endsWith('.xls') ||
      file.type === 'application/json' ||
      file.name.endsWith('.json')
    );
    
    if (validFiles.length !== files.length) {
      addNotification({
        type: 'warning',
        title: 'Some Files Skipped',
        message: 'Only CSV, Excel, and JSON files are supported.',
        duration: 4000
      });
    }
    
    handleFilesSelected(validFiles);
  }, [addNotification]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFilesSelected(files);
  };

  const handleFilesSelected = (files: File[]) => {
    // Check file size limit
    const oversizedFiles = files.filter(file => file.size > 50 * 1024 * 1024); // 50MB
    if (oversizedFiles.length > 0) {
      addNotification({
        type: 'error',
        title: 'File Too Large',
        message: `Files must be under 50MB. ${oversizedFiles.length} file(s) exceeded the limit.`,
        duration: 5000
      });
      return;
    }

    setUploadedFiles(prev => [...prev, ...files]);
    
    if (files.length > 0) {
      validateFiles(files);
      if (currentStep === 0) {
        setCurrentStep(1);
      }
    }
  };

  const validateFiles = (files: File[]) => {
    setIsProcessing(true);
    
    // Simulate file validation with realistic progress
    setTimeout(() => {
      const sampleData = [
        { date: '2023-12-15', type: 'Buy', asset: 'BTC', amount: '0.25', price: '42000', status: 'valid' },
        { date: '2023-12-14', type: 'Sell', asset: 'ETH', amount: '1.5', price: '2800', status: 'valid' },
        { date: '2023-12-13', type: 'Swap', asset: 'USDC', amount: '1000', price: '1', status: 'warning' },
        { date: '2023-12-12', type: 'Trade', asset: 'SOL', amount: '10', price: '35', status: 'valid' },
        { date: '2023-12-11', type: '', asset: '', amount: '', price: '', status: 'error' },
        { date: '2023-12-10', type: 'Receive', asset: 'BTC', amount: '0.1', price: '41000', status: 'valid' }
      ];
      
      setPreviewData(sampleData);
      setValidationResults({
        total: 1247,
        valid: 1189,
        warnings: 46,
        errors: 12,
        issues: [
          { type: 'error', message: 'Missing required fields (Date, Type, Asset)', count: 8 },
          { type: 'error', message: 'Invalid date format', count: 4 },
          { type: 'warning', message: 'Unknown asset symbols', count: 32 },
          { type: 'warning', message: 'Unusual transaction amounts', count: 14 }
        ]
      });
      
      setIsProcessing(false);
      setCurrentStep(1);
    }, 2000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length === 1) {
      setPreviewData([]);
      setValidationResults({ total: 0, valid: 0, warnings: 0, errors: 0, issues: [] });
      setCurrentStep(0);
    }
  };

  const startImport = async () => {
    setIsProcessing(true);
    setImportProgress(0);
    setCurrentStep(2);

    addNotification({
      type: 'info',
      title: 'Import Started',
      message: `Processing ${validationResults.valid.toLocaleString()} valid transactions...`,
      duration: 3000
    });

    // Realistic import simulation with detailed progress steps
    const progressSteps = [
      { progress: 15, message: 'Validating data structure...' },
      { progress: 30, message: 'Processing transactions...' },
      { progress: 50, message: 'Applying classifications...' },
      { progress: 70, message: 'Calculating fair market values...' },
      { progress: 85, message: 'Running data quality checks...' },
      { progress: 95, message: 'Finalizing import...' },
      { progress: 100, message: 'Import complete!' }
    ];
    
    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setImportProgress(step.progress);
    }
    
    setIsProcessing(false);
    setCurrentStep(3);
    
    addNotification({
      type: 'success',
      title: 'Import Complete',
      message: `Successfully imported ${validationResults.valid.toLocaleString()} transactions. ${validationResults.warnings} warnings to review.`,
      duration: 6000,
      action: {
        label: 'View Transactions',
        onClick: () => console.log('Navigate to transactions')
      }
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Import Your Transaction Data</h2>
              <p className="text-lg text-gray-600 font-sans leading-relaxed">
                Choose your data source to get started. We'll guide you through each step to ensure your data is imported correctly.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-700 font-display">50+</div>
                <div className="text-xs text-green-600 font-sans">Supported Platforms</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-700 font-display">10M+</div>
                <div className="text-xs text-blue-600 font-sans">Transactions Processed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-700 font-display">99.9%</div>
                <div className="text-xs text-purple-600 font-sans">Accuracy Rate</div>
              </div>
            </div>

            {/* Data Sources - Enhanced Cards */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Select Your Data Source</h3>
                <p className="text-gray-600 font-sans">Choose the platform where your transaction data is located</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.map((source) => (
                  <AnimatedCard
                    key={source.id}
                    className={`relative p-6 cursor-pointer transition-all duration-300 border-2 ${
                      selectedSource === source.id
                        ? 'ring-2 ring-yellow-400 bg-yellow-50 border-yellow-300 scale-105'
                        : `${source.color} hover:shadow-lg hover:scale-102 border-gray-200`
                    }`}
                    onClick={() => setSelectedSource(source.id)}
                  >
                    {/* Popularity Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant={source.badgeColor as any} tooltip={`${source.popularity} choice`}>
                        {source.popularity}
                      </Badge>
                    </div>

                    <div className="flex flex-col items-center text-center space-y-3">
                      {/* Icon and Name */}
                      <div className="text-4xl mb-2">{source.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 font-display">{source.name}</h4>
                      <p className="text-sm text-gray-600 font-sans leading-relaxed">{source.description}</p>
                      
                      {/* Metadata */}
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-sans">Category:</span>
                          <span className="font-medium text-gray-700 font-sans">{source.category}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-sans">Difficulty:</span>
                          <span className={`font-medium font-sans ${
                            source.difficulty === 'Beginner' ? 'text-green-600' : 
                            source.difficulty === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {source.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-sans">Est. Time:</span>
                          <span className="font-medium text-gray-700 font-sans">{source.avgTime}</span>
                        </div>
                      </div>

                      {/* Supported Formats */}
                      <div className="flex flex-wrap gap-1 justify-center">
                        {source.formats.map((format) => (
                          <span key={format} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-sans">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

              {/* Selected Source Instructions */}
              {selectedSource && (
                <AnimatedCard className="p-6 bg-blue-50 border-2 border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-blue-900 mb-2 font-display">
                        How to get your {dataSources.find(s => s.id === selectedSource)?.name} data
                      </h4>
                      <p className="text-sm text-blue-800 mb-4 font-sans leading-relaxed">
                        {dataSources.find(s => s.id === selectedSource)?.instructions}
                      </p>
                      <div className="flex space-x-3">
                        <InteractiveButton variant="secondary" size="sm" icon={Download}>
                          Download Template
                        </InteractiveButton>
                        <InteractiveButton variant="secondary" size="sm" icon={Eye}>
                          View Example
                        </InteractiveButton>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              )}

              {/* Quick Upload Option */}
              {selectedSource && (
                <div className="text-center">
                  <p className="text-gray-600 mb-4 font-sans">Already have your data file ready?</p>
                  <InteractiveButton 
                    variant="primary" 
                    size="lg"
                    icon={ArrowRight}
                    onClick={() => setCurrentStep(1)}
                  >
                    Skip to Upload
                  </InteractiveButton>
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Upload Your Data Files</h2>
              <p className="text-lg text-gray-600 font-sans">
                Upload your {dataSources.find(s => s.id === selectedSource)?.name} transaction data for processing
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Upload Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Enhanced Drag & Drop Area */}
                <div
                  className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    isDragOver 
                      ? 'border-yellow-400 bg-yellow-50 scale-102 shadow-lg' 
                      : uploadedFiles.length > 0
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-4">
                    {/* Upload Icon with Animation */}
                    <div className={`h-20 w-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isDragOver ? 'bg-yellow-100 scale-110' : 
                      uploadedFiles.length > 0 ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {isDragOver ? (
                        <Upload className="h-10 w-10 text-yellow-600 animate-bounce" />
                      ) : uploadedFiles.length > 0 ? (
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      ) : (
                        <Upload className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Dynamic Text */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">
                        {isDragOver ? 'Drop your files here!' : 
                         uploadedFiles.length > 0 ? 'Files uploaded successfully!' :
                         'Drag & drop your files here'}
                      </h3>
                      <p className="text-gray-600 mb-4 font-sans">
                        {uploadedFiles.length > 0 
                          ? `${uploadedFiles.length} file(s) ready for processing`
                          : 'or click to browse and select files'
                        }
                      </p>
                    </div>
                    
                    {/* Upload Button */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload-input"
                    />
                    <label htmlFor="file-upload-input">
                      <InteractiveButton 
                        variant={uploadedFiles.length > 0 ? "success" : "primary"}
                        size="lg"
                        className="cursor-pointer"
                        icon={uploadedFiles.length > 0 ? CheckCircle : Upload}
                      >
                        {uploadedFiles.length > 0 ? 'Add More Files' : 'Choose Files'}
                      </InteractiveButton>
                    </label>
                    
                    {/* File Requirements */}
                    <div className="text-xs text-gray-500 space-y-1 font-sans">
                      <div>📁 Supports: CSV, Excel (.xlsx, .xls), JSON</div>
                      <div>📏 Max size: 50MB per file</div>
                      <div>📊 Max rows: 10,000 transactions</div>
                    </div>
                  </div>
                </div>

                {/* File List with Enhanced Display */}
                {uploadedFiles.length > 0 && (
                  <AnimatedCard className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900 font-display">
                        Uploaded Files ({uploadedFiles.length})
                      </h4>
                      <div className="flex space-x-2">
                        <InteractiveButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setShowPreview(!showPreview)}
                          icon={Eye}
                        >
                          {showPreview ? 'Hide' : 'Preview'}
                        </InteractiveButton>
                        <InteractiveButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => {
                            setUploadedFiles([]);
                            setPreviewData([]);
                            setValidationResults({ total: 0, valid: 0, warnings: 0, errors: 0, issues: [] });
                          }}
                          icon={X}
                        >
                          Clear All
                        </InteractiveButton>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 font-display">{file.name}</p>
                              <div className="flex items-center space-x-3 text-xs text-gray-500 font-sans">
                                <span>{(file.size / 1024).toFixed(1)} KB</span>
                                <span>•</span>
                                <span>{file.type.includes('csv') ? 'CSV' : file.type.includes('json') ? 'JSON' : 'Excel'}</span>
                                <span>•</span>
                                <span>Modified {file.lastModified ? new Date(file.lastModified).toLocaleDateString() : 'Unknown'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <StatusIndicator status="success" label="Valid" size="sm" />
                            <InteractiveButton
                              variant="secondary"
                              size="sm"
                              onClick={() => removeFile(index)}
                              icon={X}
                              tooltip="Remove file"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Processing Status */}
                    {isProcessing && (
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <LoadingSpinner size="sm" color="primary" />
                          <div>
                            <p className="text-sm font-bold text-blue-900 font-display">Validating Files...</p>
                            <p className="text-xs text-blue-700 font-sans">Checking data structure and format</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatedCard>
                )}

                {/* Data Preview Modal */}
                {showPreview && previewData.length > 0 && (
                  <AnimatedCard className="p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900 font-display">Data Preview</h4>
                      <InteractiveButton 
                        variant="secondary" 
                        size="sm"
                        onClick={() => setShowPreview(false)}
                        icon={X}
                      >
                        Close
                      </InteractiveButton>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
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
                    <p className="text-xs text-gray-500 mt-3 font-sans">
                      Showing first 5 rows • {previewData.length} total rows in preview
                    </p>
                  </AnimatedCard>
                )}
              </div>

              {/* Sidebar - Help & Resources */}
              <div className="space-y-6">
                {/* Quick Help */}
                <AnimatedCard className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
                  <div className="text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 font-display">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-4 font-sans">
                      Our import wizard supports most major exchanges and wallet formats
                    </p>
                    <div className="space-y-2">
                      <InteractiveButton variant="secondary" size="sm" className="w-full">
                        📖 View Guide
                      </InteractiveButton>
                      <InteractiveButton variant="secondary" size="sm" className="w-full">
                        💬 Contact Support
                      </InteractiveButton>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Templates */}
                <AnimatedCard className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 font-display">Templates & Examples</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Download className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900 font-sans">CSV Template</span>
                      </div>
                      <InteractiveButton variant="success" size="sm">
                        Download
                      </InteractiveButton>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900 font-sans">Sample Data</span>
                      </div>
                      <InteractiveButton variant="secondary" size="sm">
                        View
                      </InteractiveButton>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Requirements Checklist */}
                <AnimatedCard className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 font-display">Required Columns</h4>
                  <div className="space-y-2">
                    {['Date', 'Transaction Type', 'Asset Symbol', 'Amount', 'Price (USD)'].map((column, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700 font-sans">{column}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-bold text-gray-900 mb-2 font-display">Optional Columns</h5>
                    <div className="space-y-1">
                      {['Transaction Hash', 'Wallet Address', 'Fee Amount', 'Notes'].map((column, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                          <span className="text-xs text-gray-600 font-sans">{column}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {/* Validation Results Header */}
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Review & Validate Data</h2>
              <p className="text-lg text-gray-600 font-sans">
                We've analyzed your data. Review the results below before importing.
              </p>
            </div>

            {/* Validation Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatedCard className="p-6 text-center hover:scale-105 transition-transform duration-200">
                <div className="text-3xl font-bold text-blue-600 font-display">{validationResults.total.toLocaleString()}</div>
                <div className="text-sm text-gray-600 font-sans">Total Records</div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center hover:scale-105 transition-transform duration-200 bg-green-50 border-green-200">
                <div className="text-3xl font-bold text-green-600 font-display">{validationResults.valid.toLocaleString()}</div>
                <div className="text-sm text-gray-600 font-sans">Valid Records</div>
                <div className="text-xs text-green-600 font-sans">
                  {Math.round((validationResults.valid / validationResults.total) * 100)}% success rate
                </div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center hover:scale-105 transition-transform duration-200 bg-yellow-50 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600 font-display">{validationResults.warnings}</div>
                <div className="text-sm text-gray-600 font-sans">Warnings</div>
                <div className="text-xs text-yellow-600 font-sans">Review recommended</div>
              </AnimatedCard>
              <AnimatedCard className="p-6 text-center hover:scale-105 transition-transform duration-200 bg-red-50 border-red-200">
                <div className="text-3xl font-bold text-red-600 font-display">{validationResults.errors}</div>
                <div className="text-sm text-gray-600 font-sans">Errors</div>
                <div className="text-xs text-red-600 font-sans">Must be fixed</div>
              </AnimatedCard>
            </div>

            {/* Issues and Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Data Preview */}
              <div className="lg:col-span-2">
                <AnimatedCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 font-display">Data Preview</h3>
                    <div className="flex space-x-2">
                      <Badge variant="pending" tooltip="Sample of your data">
                        Showing 6 of {validationResults.total.toLocaleString()}
                      </Badge>
                      <InteractiveButton variant="secondary" size="sm" icon={Download}>
                        Export Issues
                      </InteractiveButton>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Asset</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Price USD</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase font-sans">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {previewData.map((row, index) => (
                          <tr key={index} className={`transition-colors duration-200 ${
                            row.status === 'error' ? 'bg-red-50 hover:bg-red-100' : 
                            row.status === 'warning' ? 'bg-yellow-50 hover:bg-yellow-100' : 
                            'hover:bg-gray-50'
                          }`}>
                            <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.date || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.type || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.asset || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.amount || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-sans">{row.price ? `$${row.price}` : '—'}</td>
                            <td className="px-4 py-3">
                              <StatusIndicator 
                                status={
                                  row.status === 'valid' ? 'success' :
                                  row.status === 'warning' ? 'warning' :
                                  'error'
                                }
                                label={row.status === 'valid' ? 'Valid' : row.status === 'warning' ? 'Warning' : 'Error'}
                                size="sm"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AnimatedCard>
              </div>

              {/* Issues Panel */}
              <div className="space-y-6">
                {/* Validation Issues */}
                {validationResults.issues.length > 0 && (
                  <AnimatedCard className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 font-display">Data Issues</h4>
                    <div className="space-y-3">
                      {validationResults.issues.map((issue, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          issue.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                        }`}>
                          <div className="flex items-start space-x-3">
                            {issue.type === 'error' ? (
                              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className={`text-sm font-medium font-sans ${
                                issue.type === 'error' ? 'text-red-900' : 'text-yellow-900'
                              }`}>
                                {issue.message}
                              </p>
                              <p className={`text-xs mt-1 font-sans ${
                                issue.type === 'error' ? 'text-red-700' : 'text-yellow-700'
                              }`}>
                                Affects {issue.count} record{issue.count !== 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                )}

                {/* Import Settings */}
                <AnimatedCard className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 font-display">Import Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Skip invalid rows</label>
                        <p className="text-xs text-gray-500 font-sans">Import only valid data</p>
                      </div>
                      <div className="relative inline-block w-10 h-6">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 translate-x-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Auto-classify transactions</label>
                        <p className="text-xs text-gray-500 font-sans">Use AI to classify imported data</p>
                      </div>
                      <div className="relative inline-block w-10 h-6">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 cursor-pointer">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 translate-x-4 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Send notification when complete</label>
                        <p className="text-xs text-gray-500 font-sans">Email notification on completion</p>
                      </div>
                      <div className="relative inline-block w-10 h-6">
                        <div className="absolute inset-0 rounded-full bg-gray-300 cursor-pointer">
                          <div className="absolute h-5 w-5 bg-white rounded-full top-0.5 translate-x-0.5 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                {/* Import Button */}
                <div className="text-center">
                  <InteractiveButton 
                    variant={validationResults.errors > 0 ? "warning" : "success"}
                    size="lg"
                    onClick={startImport}
                    disabled={validationResults.total === 0}
                    className="w-full"
                    icon={validationResults.errors > 0 ? AlertTriangle : Play}
                  >
                    {validationResults.errors > 0 
                      ? `Import ${validationResults.valid.toLocaleString()} Valid Records`
                      : `Import All ${validationResults.total.toLocaleString()} Records`
                    }
                  </InteractiveButton>
                  {validationResults.errors > 0 && (
                    <p className="text-xs text-yellow-600 mt-2 font-sans">
                      {validationResults.errors} error(s) will be skipped
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            {isProcessing ? (
              // Processing State
              <div className="max-w-2xl mx-auto text-center">
                <AnimatedCard className="p-12">
                  <div className="space-y-8">
                    {/* Animated Progress Ring */}
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#facc15"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${importProgress * 2.51}, 251.2`}
                          className="transition-all duration-500 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 font-display">{importProgress}%</div>
                          <div className="text-xs text-gray-600 font-sans">Complete</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">
                        Importing Your Transactions
                      </h3>
                      <p className="text-gray-600 mb-4 font-sans">
                        Processing {validationResults.valid.toLocaleString()} transactions...
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${importProgress}%` }}
                        />
                      </div>

                      {/* Dynamic Status Messages */}
                      <div className="text-sm text-gray-600 font-sans">
                        {importProgress < 20 && '🔍 Validating data structure...'}
                        {importProgress >= 20 && importProgress < 40 && '⚡ Processing transactions...'}
                        {importProgress >= 40 && importProgress < 60 && '🧠 Applying AI classification...'}
                        {importProgress >= 60 && importProgress < 80 && '💰 Calculating fair market values...'}
                        {importProgress >= 80 && importProgress < 95 && '✅ Running quality checks...'}
                        {importProgress >= 95 && '🎉 Finalizing import...'}
                      </div>
                    </div>

                    {/* Processing Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600 font-display">
                          {Math.floor((validationResults.valid * importProgress) / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 font-sans">Processed</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600 font-display">
                          {Math.floor((validationResults.valid * 0.89 * importProgress) / 100)}
                        </div>
                        <div className="text-xs text-gray-600 font-sans">Classified</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600 font-display">
                          {Math.max(1, Math.floor((120 - importProgress) / 10))}s
                        </div>
                        <div className="text-xs text-gray-600 font-sans">Remaining</div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            ) : (
              // Success State
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="h-20 w-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Import Complete! 🎉</h2>
                  <p className="text-lg text-gray-600 font-sans">
                    Successfully processed {validationResults.valid.toLocaleString()} transactions from your {dataSources.find(s => s.id === selectedSource)?.name} data
                  </p>
                </div>

                {/* Success Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <AnimatedCard className="p-6 text-center bg-blue-50 border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 font-display">{validationResults.valid.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 font-sans">Transactions Imported</div>
                  </AnimatedCard>
                  <AnimatedCard className="p-6 text-center bg-green-50 border-green-200">
                    <div className="text-3xl font-bold text-green-600 font-display">89%</div>
                    <div className="text-sm text-gray-600 font-sans">AI Classified</div>
                  </AnimatedCard>
                  <AnimatedCard className="p-6 text-center bg-purple-50 border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 font-display">18s</div>
                    <div className="text-sm text-gray-600 font-sans">Processing Time</div>
                  </AnimatedCard>
                </div>

                {/* Next Steps */}
                <AnimatedCard className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">What's Next?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                      <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-bold text-blue-900 mb-2 font-display">Review Transactions</h4>
                      <p className="text-sm text-blue-700 mb-4 font-sans">
                        Check imported data and AI classifications for accuracy
                      </p>
                      <InteractiveButton variant="secondary" size="sm" className="w-full">
                        Review Data
                      </InteractiveButton>
                    </div>

                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                      <div className="h-16 w-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h4 className="text-lg font-bold text-yellow-900 mb-2 font-display">AI Classification</h4>
                      <p className="text-sm text-yellow-700 mb-4 font-sans">
                        Review and approve AI-suggested transaction classifications
                      </p>
                      <InteractiveButton variant="warning" size="sm" className="w-full">
                        Review Classifications
                      </InteractiveButton>
                    </div>

                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                      <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-bold text-green-900 mb-2 font-display">Generate Reports</h4>
                      <p className="text-sm text-green-700 mb-4 font-sans">
                        Create tax forms and compliance reports with your data
                      </p>
                      <InteractiveButton variant="success" size="sm" className="w-full">
                        Generate Reports
                      </InteractiveButton>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex justify-center space-x-4">
                    <InteractiveButton 
                      variant="primary" 
                      size="lg"
                      icon={FileText}
                      onClick={onBack}
                    >
                      View All Transactions
                    </InteractiveButton>
                    <InteractiveButton 
                      variant="secondary" 
                      size="lg"
                      onClick={() => {
                        setCurrentStep(0);
                        setUploadedFiles([]);
                        setPreviewData([]);
                        setSelectedSource('');
                        setValidationResults({ total: 0, valid: 0, warnings: 0, errors: 0, issues: [] });
                      }}
                    >
                      Import More Data
                    </InteractiveButton>
                  </div>
                </AnimatedCard>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={ArrowLeft}
                onClick={onBack}
                tooltip="Back to dashboard"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-display">Import Transaction Data</h1>
                <p className="text-gray-600 font-sans">Securely import crypto transactions from exchanges and wallets</p>
              </div>
            </div>
            
            {/* Help Button */}
            <InteractiveButton 
              variant="secondary" 
              size="sm"
              icon={HelpCircle}
              tooltip="Get help with importing"
            >
              Help
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <ProgressIndicator 
            steps={workflowSteps} 
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="min-h-96">
          {renderStepContent()}
        </div>
      </div>

      {/* Footer Navigation */}
      {currentStep < 3 && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <InteractiveButton
                variant="secondary"
                size="md"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                icon={ArrowLeft}
              >
                Previous
              </InteractiveButton>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 font-sans">
                  Step {currentStep + 1} of {workflowSteps.length}
                </span>
                {currentStep === 1 && uploadedFiles.length > 0 && !isProcessing && (
                  <div className="text-xs text-gray-500 font-sans">
                    Ready to validate • {uploadedFiles.length} file(s) uploaded
                  </div>
                )}
              </div>
              
              <InteractiveButton
                variant="primary"
                size="md"
                onClick={() => {
                  if (currentStep === 0 && selectedSource) {
                    setCurrentStep(1);
                  } else if (currentStep === 1 && uploadedFiles.length > 0) {
                    setCurrentStep(2);
                  }
                }}
                disabled={
                  currentStep === 3 ||
                  (currentStep === 0 && !selectedSource) ||
                  (currentStep === 1 && uploadedFiles.length === 0) ||
                  isProcessing
                }
                icon={ArrowRight}
              >
                {currentStep === 0 ? 'Continue' : 
                 currentStep === 1 ? 'Validate Data' : 
                 'Complete'}
              </InteractiveButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportTransactionsWorkflow;