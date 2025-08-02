import React, { useState } from 'react';
import { Save, RefreshCw, Calculator, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import FormSection from './FormSection';
import Badge from './Badge';

export default function Preferences() {
  const [preferences, setPreferences] = useState({
    // Tax Preferences
    taxYear: '2023',
    accountingMethod: 'FIFO',
    costBasisMethod: 'specific_identification',
    includeFees: true,
    roundingPrecision: '2',
    
    // AI Preferences
    aiAutoClassify: true,
    aiConfidenceThreshold: '70',
    aiSuggestionMode: 'aggressive',
    autoAcceptHighConfidence: false,
    
    // Transaction Preferences
    defaultClassification: 'unclassified',
    autoMergeTransfers: true,
    flagDuplicates: true,
    requireNotes: false,
    
    // Report Preferences
    defaultReportFormat: 'PDF',
    includeZeroBalances: false,
    groupByAsset: true,
    showFMVSource: true,
    
    // Data Preferences
    dataRetention: '7',
    autoBackup: true,
    exportFormat: 'CSV',
    dateRange: 'tax_year'
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving preferences:', preferences);
  };

  const handleReset = () => {
    console.log('Resetting preferences to defaults');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Preferences</h1>
          <p className="text-gray-600 mt-1 font-sans">Configure tax calculations, AI behavior, and data handling</p>
        </div>
        <div className="flex space-x-3">
          <button 
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tax Calculation Preferences */}
        <FormSection 
          title="Tax Calculations" 
          description="Configure how tax calculations are performed"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tax Year</label>
            <select
              value={preferences.taxYear}
              onChange={(e) => handlePreferenceChange('taxYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Accounting Method</label>
            <select
              value={preferences.accountingMethod}
              onChange={(e) => handlePreferenceChange('accountingMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="FIFO">FIFO (First In, First Out)</option>
              <option value="LIFO">LIFO (Last In, First Out)</option>
              <option value="HIFO">HIFO (Highest In, First Out)</option>
              <option value="specific_identification">Specific Identification</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Cost Basis Method</label>
            <select
              value={preferences.costBasisMethod}
              onChange={(e) => handlePreferenceChange('costBasisMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="specific_identification">Specific Identification</option>
              <option value="average_cost">Average Cost</option>
              <option value="fifo">FIFO</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Include Transaction Fees</label>
              <p className="text-xs text-gray-600 font-sans">Add fees to cost basis calculations</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.includeFees}
                onChange={(e) => handlePreferenceChange('includeFees', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.includeFees ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('includeFees', !preferences.includeFees)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.includeFees ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Rounding Precision (decimal places)</label>
            <select
              value={preferences.roundingPrecision}
              onChange={(e) => handlePreferenceChange('roundingPrecision', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="0">0 (whole numbers)</option>
              <option value="2">2 (cents)</option>
              <option value="4">4</option>
              <option value="8">8 (crypto precision)</option>
            </select>
          </div>
        </FormSection>

        {/* AI Preferences */}
        <FormSection 
          title="AI Classification" 
          description="Configure AI behavior and automation"
        >
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Enable AI Auto-Classification</label>
              <p className="text-xs text-gray-600 font-sans">Automatically classify transactions using AI</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.aiAutoClassify}
                onChange={(e) => handlePreferenceChange('aiAutoClassify', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.aiAutoClassify ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('aiAutoClassify', !preferences.aiAutoClassify)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.aiAutoClassify ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
              AI Confidence Threshold ({preferences.aiConfidenceThreshold}%)
            </label>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={preferences.aiConfidenceThreshold}
              onChange={(e) => handlePreferenceChange('aiConfidenceThreshold', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:bg-gray-300 transition-colors duration-200"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1 font-sans">
              <span>Conservative (50%)</span>
              <span>Aggressive (95%)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">AI Suggestion Mode</label>
            <div className="flex space-x-3">
              <button
                onClick={() => handlePreferenceChange('aiSuggestionMode', 'conservative')}
                className={`flex-1 px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 font-sans ${
                  preferences.aiSuggestionMode === 'conservative' 
                    ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Conservative
              </button>
              <button
                onClick={() => handlePreferenceChange('aiSuggestionMode', 'balanced')}
                className={`flex-1 px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 font-sans ${
                  preferences.aiSuggestionMode === 'balanced' 
                    ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => handlePreferenceChange('aiSuggestionMode', 'aggressive')}
                className={`flex-1 px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 font-sans ${
                  preferences.aiSuggestionMode === 'aggressive' 
                    ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                Aggressive
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Auto-Accept High Confidence</label>
              <p className="text-xs text-gray-600 font-sans">Automatically accept classifications above threshold</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="warning">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Caution
              </Badge>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={preferences.autoAcceptHighConfidence}
                  onChange={(e) => handlePreferenceChange('autoAcceptHighConfidence', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    preferences.autoAcceptHighConfidence ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handlePreferenceChange('autoAcceptHighConfidence', !preferences.autoAcceptHighConfidence)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    preferences.autoAcceptHighConfidence ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Transaction Preferences */}
        <FormSection 
          title="Transaction Handling" 
          description="Configure transaction processing behavior"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Default Classification</label>
            <select
              value={preferences.defaultClassification}
              onChange={(e) => handlePreferenceChange('defaultClassification', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="unclassified">Unclassified</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="trade">Trade</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Auto-Merge Transfers</label>
              <p className="text-xs text-gray-600 font-sans">Automatically merge send/receive pairs</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.autoMergeTransfers}
                onChange={(e) => handlePreferenceChange('autoMergeTransfers', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.autoMergeTransfers ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('autoMergeTransfers', !preferences.autoMergeTransfers)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.autoMergeTransfers ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Flag Duplicate Transactions</label>
              <p className="text-xs text-gray-600 font-sans">Detect and flag potential duplicates</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.flagDuplicates}
                onChange={(e) => handlePreferenceChange('flagDuplicates', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.flagDuplicates ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('flagDuplicates', !preferences.flagDuplicates)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.flagDuplicates ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Require Notes for Manual Classifications</label>
              <p className="text-xs text-gray-600 font-sans">Force users to add notes when manually classifying</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.requireNotes}
                onChange={(e) => handlePreferenceChange('requireNotes', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.requireNotes ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('requireNotes', !preferences.requireNotes)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.requireNotes ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>
        </FormSection>

        {/* Report Preferences */}
        <FormSection 
          title="Report Generation" 
          description="Configure default report settings"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Default Report Format</label>
            <select
              value={preferences.defaultReportFormat}
              onChange={(e) => handlePreferenceChange('defaultReportFormat', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Include Zero Balances</label>
              <p className="text-xs text-gray-600 font-sans">Show assets with zero balance in reports</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.includeZeroBalances}
                onChange={(e) => handlePreferenceChange('includeZeroBalances', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.includeZeroBalances ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('includeZeroBalances', !preferences.includeZeroBalances)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.includeZeroBalances ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Group by Asset</label>
              <p className="text-xs text-gray-600 font-sans">Group transactions by cryptocurrency type</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.groupByAsset}
                onChange={(e) => handlePreferenceChange('groupByAsset', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.groupByAsset ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('groupByAsset', !preferences.groupByAsset)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.groupByAsset ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 font-sans">Show FMV Source</label>
              <p className="text-xs text-gray-600 font-sans">Include fair market value data source</p>
            </div>
            <div className="relative inline-block w-10 h-6">
              <input 
                type="checkbox" 
                checked={preferences.showFMVSource}
                onChange={(e) => handlePreferenceChange('showFMVSource', e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                  preferences.showFMVSource ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => handlePreferenceChange('showFMVSource', !preferences.showFMVSource)}
              >
                <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                  preferences.showFMVSource ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
}