import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, CheckCircle, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import FormSection from './FormSection';
import Badge from './Badge';

interface ExportJob {
  id: number;
  name: string;
  type: string;
  format: string;
  status: 'completed' | 'processing' | 'failed' | 'queued';
  progress: number;
  createdAt: string;
  completedAt?: string;
  fileSize?: string;
  downloadUrl?: string;
  client: string;
  dateRange: string;
}

const exportJobs: ExportJob[] = [
  {
    id: 1,
    name: 'IRS Form 8949 - Q4 2023',
    type: 'IRS 8949',
    format: 'PDF',
    status: 'completed',
    progress: 100,
    createdAt: '2023-12-15 10:30 AM',
    completedAt: '2023-12-15 10:32 AM',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    client: 'John Smith',
    dateRange: 'Oct 1 - Dec 31, 2023'
  },
  {
    id: 2,
    name: 'Transaction Export - All Clients',
    type: 'Transaction Export',
    format: 'CSV',
    status: 'processing',
    progress: 65,
    createdAt: '2023-12-15 11:15 AM',
    client: 'All Clients',
    dateRange: 'Jan 1 - Dec 31, 2023'
  },
  {
    id: 3,
    name: 'QuickBooks Export - ABC Corp',
    type: 'QuickBooks',
    format: 'QBO',
    status: 'failed',
    progress: 0,
    createdAt: '2023-12-15 09:45 AM',
    client: 'ABC Corporation',
    dateRange: 'Nov 1 - Nov 30, 2023'
  },
  {
    id: 4,
    name: 'Gain/Loss Report - Tech LLC',
    type: 'Gain/Loss',
    format: 'Excel',
    status: 'queued',
    progress: 0,
    createdAt: '2023-12-15 11:45 AM',
    client: 'Tech Innovations LLC',
    dateRange: 'Jan 1 - Dec 31, 2023'
  }
];

export default function Exports() {
  const [jobs, setJobs] = useState<ExportJob[]>(exportJobs);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [newExport, setNewExport] = useState({
    type: 'transaction',
    format: 'CSV',
    client: 'all',
    dateFrom: '2023-01-01',
    dateTo: '2023-12-31',
    includeZeroBalances: false,
    groupByAsset: true,
    includeFees: true
  });

  const handleCreateExport = () => {
    const newJob: ExportJob = {
      id: Math.max(...jobs.map(j => j.id)) + 1,
      name: `${newExport.type} Export - ${new Date().toLocaleDateString()}`,
      type: newExport.type,
      format: newExport.format,
      status: 'queued',
      progress: 0,
      createdAt: new Date().toLocaleString(),
      client: newExport.client === 'all' ? 'All Clients' : newExport.client,
      dateRange: `${newExport.dateFrom} - ${newExport.dateTo}`
    };
    
    setJobs(prev => [newJob, ...prev]);
  };

  const handleRetryExport = (jobId: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'queued' as const, progress: 0 }
        : job
    ));
  };

  const handleDeleteExport = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" showIcon><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'processing':
        return <Badge variant="warning" showIcon><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Processing</Badge>;
      case 'failed':
        return <Badge variant="error" showIcon><AlertTriangle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'queued':
        return <Badge variant="pending" showIcon><Clock className="w-3 h-3 mr-1" />Queued</Badge>;
      default:
        return <Badge variant="pending">Unknown</Badge>;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesType = filterType === 'all' || job.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-sans">Data Exports</h1>
          <p className="text-gray-600 mt-1 font-sans">Export transaction data and generate reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Export Configuration */}
        <div className="xl:col-span-1">
          <FormSection 
            title="Create New Export" 
            description="Configure and generate a new data export"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Export Type</label>
              <select
                value={newExport.type}
                onChange={(e) => setNewExport(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="transaction">Transaction Export</option>
                <option value="irs_8949">IRS Form 8949</option>
                <option value="schedule_d">Schedule D</option>
                <option value="gain_loss">Gain/Loss Report</option>
                <option value="quickbooks">QuickBooks Export</option>
                <option value="tax_summary">Tax Summary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Format</label>
              <select
                value={newExport.format}
                onChange={(e) => setNewExport(prev => ({ ...prev, format: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="CSV">CSV</option>
                <option value="Excel">Excel</option>
                <option value="PDF">PDF</option>
                <option value="QBO">QuickBooks (QBO)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Client</label>
              <select
                value={newExport.client}
                onChange={(e) => setNewExport(prev => ({ ...prev, client: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="all">All Clients</option>
                <option value="john_smith">John Smith</option>
                <option value="abc_corp">ABC Corporation</option>
                <option value="tech_llc">Tech Innovations LLC</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">From Date</label>
                <input
                  type="date"
                  value={newExport.dateFrom}
                  onChange={(e) => setNewExport(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">To Date</label>
                <input
                  type="date"
                  value={newExport.dateTo}
                  onChange={(e) => setNewExport(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 font-sans">Include Zero Balances</label>
                <div className="relative inline-block w-10 h-6">
                  <input 
                    type="checkbox" 
                    checked={newExport.includeZeroBalances}
                    onChange={(e) => setNewExport(prev => ({ ...prev, includeZeroBalances: e.target.checked }))}
                    className="sr-only"
                  />
                  <div 
                    className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                      newExport.includeZeroBalances ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                    onClick={() => setNewExport(prev => ({ ...prev, includeZeroBalances: !prev.includeZeroBalances }))}
                  >
                    <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                      newExport.includeZeroBalances ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 font-sans">Group by Asset</label>
                <div className="relative inline-block w-10 h-6">
                  <input 
                    type="checkbox" 
                    checked={newExport.groupByAsset}
                    onChange={(e) => setNewExport(prev => ({ ...prev, groupByAsset: e.target.checked }))}
                    className="sr-only"
                  />
                  <div 
                    className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                      newExport.groupByAsset ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                    onClick={() => setNewExport(prev => ({ ...prev, groupByAsset: !prev.groupByAsset }))}
                  >
                    <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                      newExport.groupByAsset ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 font-sans">Include Transaction Fees</label>
                <div className="relative inline-block w-10 h-6">
                  <input 
                    type="checkbox" 
                    checked={newExport.includeFees}
                    onChange={(e) => setNewExport(prev => ({ ...prev, includeFees: e.target.checked }))}
                    className="sr-only"
                  />
                  <div 
                    className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                      newExport.includeFees ? 'bg-yellow-400' : 'bg-gray-300'
                    }`}
                    onClick={() => setNewExport(prev => ({ ...prev, includeFees: !prev.includeFees }))}
                  >
                    <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                      newExport.includeFees ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCreateExport}
              className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate & Download Export
            </button>
          </FormSection>
        </div>

        {/* Export Jobs List */}
        <div className="xl:col-span-3">
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-base font-medium text-gray-700 font-sans">Filters:</span>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                  <option value="queued">Queued</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                >
                  <option value="all">All Types</option>
                  <option value="transaction">Transaction</option>
                  <option value="irs">IRS Forms</option>
                  <option value="quickbooks">QuickBooks</option>
                  <option value="gain">Gain/Loss</option>
                </select>
              </div>
            </div>

            {/* Export Jobs */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="w-6 h-6 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-900 font-sans">{job.name}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 text-base text-gray-600 mb-4 font-sans">
                        <div>
                          <span className="font-medium">Type:</span> {job.type}
                        </div>
                        <div>
                          <span className="font-medium">Format:</span> {job.format}
                        </div>
                        <div>
                          <span className="font-medium">Client:</span> {job.client}
                        </div>
                        <div>
                          <span className="font-medium">Date Range:</span> {job.dateRange}
                        </div>
                      </div>

                      {job.status === 'processing' && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1 font-sans">
                            <span>Progress</span>
                            <span>{job.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 font-sans">
                        <span>Created: {job.createdAt}</span>
                        {job.completedAt && <span>Completed: {job.completedAt}</span>}
                        {job.fileSize && <span>Size: {job.fileSize}</span>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {job.status === 'completed' && job.downloadUrl && (
                        <button className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 hover:scale-105 transition-all duration-200 font-sans">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      )}
                      {job.status === 'failed' && (
                        <button 
                          onClick={() => handleRetryExport(job.id)}
                          className="flex items-center px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 hover:scale-105 transition-all duration-200 font-sans"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Retry
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteExport(job.id)}
                        className="px-3 py-2 text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-200 font-sans"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 font-sans">No exports found</h3>
                  <p className="text-gray-600 mb-4 font-sans">Try adjusting your filters or create a new export</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}