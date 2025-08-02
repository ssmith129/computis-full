import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';

const reports = [
  {
    id: 1,
    name: 'IRS Form 8949',
    description: 'Capital gains and losses report',
    client: 'John Smith',
    period: 'Tax Year 2023',
    status: 'Completed',
    generatedDate: '2023-12-15',
    transactions: 156,
    totalGains: '$12,450.00',
    totalLosses: '$3,200.00'
  },
  {
    id: 2,
    name: 'Schedule D',
    description: 'Summary of capital gains and losses',
    client: 'ABC Corporation',
    period: 'Q4 2023',
    status: 'In Progress',
    generatedDate: '2023-12-14',
    transactions: 342,
    totalGains: '$45,230.00',
    totalLosses: '$8,100.00'
  },
  {
    id: 3,
    name: 'Gain/Loss Summary',
    description: 'Detailed transaction-level report',
    client: 'Tech Innovations LLC',
    period: 'Tax Year 2023',
    status: 'Completed',
    generatedDate: '2023-12-13',
    transactions: 278,
    totalGains: '$28,750.00',
    totalLosses: '$5,400.00'
  }
];

const reportTemplates = [
  {
    id: 1,
    name: 'IRS Form 8949',
    description: 'Required for reporting capital gains and losses',
    icon: FileText,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    name: 'Schedule D',
    description: 'Summary report for tax filing',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    name: 'Gain/Loss Detail',
    description: 'Transaction-level breakdown',
    icon: DollarSign,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 4,
    name: 'QuickBooks Export',
    description: 'Import data into accounting software',
    icon: Download,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

interface ReportsProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Reports({ onWorkflowOpen }: ReportsProps) {
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('reports');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterClient, setFilterClient] = useState('All');
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'All' || report.status === filterStatus;
    const matchesClient = filterClient === 'All' || report.client === filterClient;
    return matchesStatus && matchesClient;
  });

  const handleGenerateReport = () => {
    setShowGenerateDialog(true);
  };

  const confirmGenerateReport = async () => {
    setIsGenerating(true);
    
    addNotification({
      type: 'info',
      title: 'Report Generation Started',
      message: 'Generating your IRS Form 8949...',
      duration: 3000
    });
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    addNotification({
      type: 'success',
      title: 'Report Generated',
      message: 'Your IRS Form 8949 is ready for download.',
      action: {
        label: 'Download',
        onClick: () => console.log('Download report')
      }
    });
    
    setIsGenerating(false);
    setShowGenerateDialog(false);
  };

  const handleReportAction = (reportId: number, action: string) => {
    const report = reports.find(r => r.id === reportId);
    
    switch (action) {
      case 'view':
        addNotification({
          type: 'info',
          title: 'Opening Report',
          message: `Loading ${report?.name}...`,
          duration: 2000
        });
        break;
      case 'download':
        addNotification({
          type: 'success',
          title: 'Download Started',
          message: `Downloading ${report?.name}...`,
          duration: 3000
        });
        break;
    }
  };

  const handleTemplateGenerate = (templateName: string) => {
    onWorkflowOpen?.('generate-report');
    addNotification({
      type: 'info',
      title: 'Report Generation',
      message: `Opening ${templateName} generation workflow...`,
      duration: 2000
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Reports & Exports</h1>
          <p className="text-gray-600 mt-1 font-sans">Generate tax reports and export data</p>
        </div>
        <button 
          onClick={() => onWorkflowOpen?.('generate-report')}
          className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 font-sans ${
              activeTab === 'reports'
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Generated Reports
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 font-sans ${
              activeTab === 'templates'
                ? 'border-yellow-400 text-yellow-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Report Templates
          </button>
        </nav>
      </div>

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 font-sans">Filters:</span>
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                >
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Failed</option>
                </select>
                <select
                  value={filterClient}
                  onChange={(e) => setFilterClient(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                >
                  <option>All Clients</option>
                  <option>John Smith</option>
                  <option>ABC Corporation</option>
                  <option>Tech Innovations LLC</option>
                </select>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Report
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Summary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-sans">{report.name}</div>
                          <div className="text-sm text-gray-600 font-sans">{report.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-sans">{report.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-sans">{report.period}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans ${
                          report.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {report.status === 'In Progress' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 font-sans">{report.generatedDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-sans">
                          <div>{report.transactions} transactions</div>
                          <div className="text-green-600">Gains: {report.totalGains}</div>
                          <div className="text-red-600">Losses: {report.totalLosses}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button 
                            className="text-blue-600 hover:text-blue-900 hover:scale-105 transition-all duration-200 font-sans"
                            onClick={() => handleReportAction(report.id, 'view')}
                          >
                            View
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 hover:scale-105 transition-all duration-200 font-sans"
                            onClick={() => handleReportAction(report.id, 'download')}
                          >
                            <Download className="w-4 h-4 inline mr-1" />
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Report Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-center mb-4">
                  <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${template.color} group-hover:scale-110 transition-transform duration-200`}>
                    <template.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 font-sans">{template.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4 font-sans">{template.description}</p>
                <button 
                  onClick={() => handleTemplateGenerate(template.name)}
                  className="w-full px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans"
                >
                  Generate Report
                </button>
              </div>
            ))}
          </div>

          {/* Report Configuration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Report Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Client</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans">
                  <option>Select a client</option>
                  <option>John Smith</option>
                  <option>ABC Corporation</option>
                  <option>Tech Innovations LLC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tax Year</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans">
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date Range</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                  />
                  <input
                    type="date"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                Preview
              </button>
              <button 
                onClick={() => onWorkflowOpen?.('generate-report')}
                className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Report Dialog */}
      <ConfirmDialog
        isOpen={showGenerateDialog}
        onClose={() => setShowGenerateDialog(false)}
        onConfirm={confirmGenerateReport}
        title="Generate Report"
        message="This will generate a new IRS Form 8949 based on your current transaction data."
        type="info"
        confirmText="Generate Report"
        isLoading={isGenerating}
      />
    </div>
  );
}