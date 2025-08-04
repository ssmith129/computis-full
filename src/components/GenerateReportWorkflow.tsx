import React, { useState } from 'react';
import { ArrowLeft, FileText, Calendar, User, Settings, Download, CheckCircle, AlertTriangle } from 'lucide-react';

interface GenerateReportWorkflowProps {
  onBack: () => void;
}

const GenerateReportWorkflow: React.FC<GenerateReportWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReport, setSelectedReport] = useState('');
  const [reportConfig, setReportConfig] = useState({
    client: '',
    taxYear: '2023',
    dateFrom: '2023-01-01',
    dateTo: '2023-12-31',
    format: 'PDF',
    includeZeroBalances: false,
    groupByAsset: true,
    includeFees: true,
    accountingMethod: 'FIFO'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const reportTypes = [
    {
      id: 'irs_8949',
      name: 'IRS Form 8949',
      description: 'Sales and Other Dispositions of Capital Assets',
      icon: '📋',
      required: true,
      estimatedTime: '2-5 minutes',
      complexity: 'Standard'
    },
    {
      id: 'schedule_d',
      name: 'Schedule D',
      description: 'Capital Gains and Losses Summary',
      icon: '📊',
      required: true,
      estimatedTime: '1-3 minutes',
      complexity: 'Simple'
    },
    {
      id: 'gain_loss',
      name: 'Gain/Loss Detail Report',
      description: 'Detailed transaction-level analysis',
      icon: '📈',
      required: false,
      estimatedTime: '3-7 minutes',
      complexity: 'Detailed'
    },
    {
      id: 'tax_summary',
      name: 'Tax Summary Report',
      description: 'Comprehensive tax overview',
      icon: '📄',
      required: false,
      estimatedTime: '2-4 minutes',
      complexity: 'Standard'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Analysis',
      description: 'Current holdings and performance',
      icon: '💼',
      required: false,
      estimatedTime: '1-2 minutes',
      complexity: 'Simple'
    },
    {
      id: 'audit_trail',
      name: 'Audit Trail Report',
      description: 'Complete transaction history for compliance',
      icon: '🔍',
      required: false,
      estimatedTime: '5-10 minutes',
      complexity: 'Complex'
    }
  ];

  const clients = [
    { id: 'john_smith', name: 'John Smith', type: 'Individual' },
    { id: 'abc_corp', name: 'ABC Corporation', type: 'Business' },
    { id: 'tech_llc', name: 'Tech Innovations LLC', type: 'Business' },
    { id: 'sarah_johnson', name: 'Sarah Johnson', type: 'Individual' }
  ];

  const steps = [
    { number: 1, title: 'Select Report', description: 'Choose report type' },
    { number: 2, title: 'Configure', description: 'Set parameters' },
    { number: 3, title: 'Review', description: 'Verify settings' },
    { number: 4, title: 'Generate', description: 'Create report' }
  ];

  const startGeneration = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate report generation
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Select Report Type</h2>
              <p className="text-lg text-gray-600 font-sans">Choose the type of report you want to generate</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className={`relative p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedReport === report.id
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {report.required && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium font-sans">
                        Required
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">{report.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{report.name}</h3>
                    <p className="text-gray-600 mb-4 font-sans">{report.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 font-sans">
                      <div className="flex justify-between">
                        <span>Estimated time:</span>
                        <span>{report.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Complexity:</span>
                        <span className={`font-medium ${
                          report.complexity === 'Simple' ? 'text-green-600' :
                          report.complexity === 'Standard' ? 'text-yellow-600' :
                          report.complexity === 'Detailed' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {report.complexity}
                        </span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Configure Report</h2>
              <p className="text-lg text-gray-600 font-sans">Set up your report parameters</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Basic Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Client</label>
                    <select 
                      value={reportConfig.client}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, client: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="">Select a client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} ({client.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tax Year</label>
                      <select 
                        value={reportConfig.taxYear}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, taxYear: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      >
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Format</label>
                      <select 
                        value={reportConfig.format}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      >
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                        <option value="CSV">CSV</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        value={reportConfig.dateFrom}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, dateFrom: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                      <input
                        type="date"
                        value={reportConfig.dateTo}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, dateTo: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Advanced Options</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Accounting Method</label>
                    <select 
                      value={reportConfig.accountingMethod}
                      onChange={(e) => setReportConfig(prev => ({ ...prev, accountingMethod: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="FIFO">FIFO (First In, First Out)</option>
                      <option value="LIFO">LIFO (Last In, First Out)</option>
                      <option value="HIFO">HIFO (Highest In, First Out)</option>
                      <option value="specific">Specific Identification</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Include Zero Balances</label>
                        <p className="text-xs text-gray-500 font-sans">Show assets with zero balance</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <div className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ${
                          reportConfig.includeZeroBalances ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                            reportConfig.includeZeroBalances ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Group by Asset</label>
                        <p className="text-xs text-gray-500 font-sans">Group transactions by cryptocurrency</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <div className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ${
                          reportConfig.groupByAsset ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                            reportConfig.groupByAsset ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 font-sans">Include Transaction Fees</label>
                        <p className="text-xs text-gray-500 font-sans">Add fees to cost basis calculations</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <div className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-200 ${
                          reportConfig.includeFees ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                            reportConfig.includeFees ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Review Settings</h2>
              <p className="text-lg text-gray-600 font-sans">Verify your report configuration before generating</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Report Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Report Type:</span>
                    <span className="text-gray-900 font-sans">
                      {reportTypes.find(r => r.id === selectedReport)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Client:</span>
                    <span className="text-gray-900 font-sans">
                      {clients.find(c => c.id === reportConfig.client)?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Tax Year:</span>
                    <span className="text-gray-900 font-sans">{reportConfig.taxYear}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Date Range:</span>
                    <span className="text-gray-900 font-sans">
                      {reportConfig.dateFrom} to {reportConfig.dateTo}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Format:</span>
                    <span className="text-gray-900 font-sans">{reportConfig.format}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 font-sans">Accounting Method:</span>
                    <span className="text-gray-900 font-sans">{reportConfig.accountingMethod}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 font-sans">Estimated Processing Time</h4>
                      <p className="text-sm text-blue-700 font-sans">
                        {reportTypes.find(r => r.id === selectedReport)?.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Generate Report</h2>
              <p className="text-lg text-gray-600 font-sans">
                {isGenerating ? 'Generating your report...' : 'Your report is ready!'}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                {isGenerating ? (
                  <div className="text-center space-y-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2 font-sans">
                        <span>Generating report...</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-yellow-400 h-3 rounded-full transition-all duration-500" 
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 font-sans">
                      Processing {reportTypes.find(r => r.id === selectedReport)?.name}...
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Report Generated Successfully!</h3>
                      <p className="text-gray-600 font-sans">Your report is ready for download</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900 font-sans">
                              {reportTypes.find(r => r.id === selectedReport)?.name}
                            </p>
                            <p className="text-sm text-gray-500 font-sans">
                              {reportConfig.format} • Generated {new Date().toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-sans">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-sans">
                        Generate Another
                      </button>
                      <button className="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-sans">
                        View Reports
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
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
              <h1 className="text-2xl font-bold text-gray-900 font-display">Generate Report</h1>
              <p className="text-gray-600 font-sans">Create tax reports and compliance documents</p>
            </div>
          </div>
          
          {currentStep === 3 && (
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-sans font-medium">
              Generate Report
            </button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="mt-8">
          <div className="flex items-center justify-between max-w-3xl">
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
      </div>

      {/* Content */}
        <div className="bg-white px-8 py-12">
        {renderStepContent()}
      </div>

      {/* Footer */}
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
                disabled={currentStep === 4}
                className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium"
              >
                {currentStep === 4 ? 'Complete' : 'Next'}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default GenerateReportWorkflow;