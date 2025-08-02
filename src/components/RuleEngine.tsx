import React, { useState } from 'react';
import { Plus, Play, Pause, Edit, Trash2, Copy, GitBranch, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import FormSection from './FormSection';
import Badge from './Badge';
import Modal from './Modal';

interface Rule {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  priority: number;
  conditions: {
    transactionType?: string;
    asset?: string;
    amountMin?: number;
    amountMax?: number;
    addressPattern?: string;
    timeRange?: string;
  };
  actions: {
    classification?: string;
    tags?: string[];
    notes?: string;
    confidence?: number;
  };
  matchCount: number;
  lastRun: string;
  createdBy: string;
  createdAt: string;
}

const sampleRules: Rule[] = [
  {
    id: 1,
    name: 'Mining Income Classification',
    description: 'Classify Bitcoin receives from mining pools as income',
    status: 'active',
    priority: 1,
    conditions: {
      transactionType: 'receive',
      asset: 'BTC',
      addressPattern: 'mining_pool'
    },
    actions: {
      classification: 'income',
      tags: ['mining', 'income'],
      confidence: 95
    },
    matchCount: 156,
    lastRun: '2 hours ago',
    createdBy: 'John Smith',
    createdAt: '2023-12-01'
  },
  {
    id: 2,
    name: 'Exchange Trading Classification',
    description: 'Classify swaps on major exchanges as trades',
    status: 'active',
    priority: 2,
    conditions: {
      transactionType: 'swap',
      addressPattern: 'exchange'
    },
    actions: {
      classification: 'trade',
      tags: ['exchange', 'trading'],
      confidence: 85
    },
    matchCount: 89,
    lastRun: '1 day ago',
    createdBy: 'System',
    createdAt: '2023-11-15'
  },
  {
    id: 3,
    name: 'Large Transfer Detection',
    description: 'Flag large transfers for manual review',
    status: 'draft',
    priority: 3,
    conditions: {
      transactionType: 'send',
      amountMin: 10000
    },
    actions: {
      classification: 'transfer',
      tags: ['large_transfer', 'review_required'],
      confidence: 60
    },
    matchCount: 0,
    lastRun: 'Never',
    createdBy: 'John Smith',
    createdAt: '2023-12-15'
  }
];

export default function RuleEngine() {
  const [rules, setRules] = useState<Rule[]>(sampleRules);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('view');

  const handleCreateRule = () => {
    setSelectedRule(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewRule = (rule: Rule) => {
    setSelectedRule(rule);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleToggleRule = (ruleId: number) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  const handleDeleteRule = (ruleId: number) => {
    setRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const handleDuplicateRule = (rule: Rule) => {
    const newRule = {
      ...rule,
      id: Math.max(...rules.map(r => r.id)) + 1,
      name: `${rule.name} (Copy)`,
      status: 'draft' as const,
      matchCount: 0,
      lastRun: 'Never',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRules(prev => [...prev, newRule]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" showIcon><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge variant="error" showIcon><Pause className="w-3 h-3 mr-1" />Inactive</Badge>;
      case 'draft':
        return <Badge variant="warning" showIcon><Clock className="w-3 h-3 mr-1" />Draft</Badge>;
      default:
        return <Badge variant="pending">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Rule Engine</h1>
          <p className="text-gray-600 mt-1 font-sans">Create and manage automated classification rules</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans">
            <Play className="w-4 h-4 mr-2" />
            Run All Rules
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-4 hover:scale-110 transition-transform duration-200">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 font-sans">Active Rules</p>
              <p className="text-2xl font-bold text-gray-900 font-sans">
                {rules.filter(r => r.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4 hover:scale-110 transition-transform duration-200">
              <GitBranch className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 font-sans">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900 font-sans">
                {rules.reduce((sum, rule) => sum + rule.matchCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4 hover:scale-110 transition-transform duration-200">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 font-sans">Draft Rules</p>
              <p className="text-2xl font-bold text-gray-900 font-sans">
                {rules.filter(r => r.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-4 hover:scale-110 transition-transform duration-200">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 font-sans">Avg Confidence</p>
              <p className="text-2xl font-bold text-gray-900 font-sans">
                {Math.round(rules.reduce((sum, rule) => sum + (rule.actions.confidence || 0), 0) / rules.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-sans">Classification Rules</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Rule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Matches
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Last Run
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 font-sans">{rule.name}</div>
                      <div className="text-sm text-gray-600 font-sans">{rule.description}</div>
                      <div className="flex items-center mt-1 space-x-2">
                        {rule.actions.tags?.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-sans">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(rule.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-sans">{rule.priority}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-sans">{rule.matchCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-sans">{rule.lastRun}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all duration-200 font-sans"
                        title="View Rule"
                      >
                        <GitBranch className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all duration-200 font-sans"
                        title="Edit Rule"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-900 hover:scale-110 transition-all duration-200 font-sans"
                        title="Duplicate Rule"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-yellow-600 hover:text-yellow-900 hover:scale-110 transition-all duration-200 font-sans"
                        title={rule.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 hover:scale-110 transition-all duration-200 font-sans"
                        title="Delete Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rule Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === 'create' ? 'Create New Rule' :
          modalMode === 'edit' ? 'Edit Rule' :
          'Rule Details'
        }
        size="xl"
      >
        <div className="space-y-6">
          {modalMode !== 'view' ? (
            // Create/Edit Form
            <div className="space-y-6">
              <FormSection title="Rule Information">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Rule Name</label>
                  <input
                    type="text"
                    defaultValue={selectedRule?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    placeholder="Enter rule name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Description</label>
                  <textarea
                    defaultValue={selectedRule?.description || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    rows={3}
                    placeholder="Describe what this rule does"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Priority</label>
                    <input
                      type="number"
                      defaultValue={selectedRule?.priority || 1}
                      min="1"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Status</label>
                    <select
                      defaultValue={selectedRule?.status || 'draft'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Conditions">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Transaction Type</label>
                    <select
                      defaultValue={selectedRule?.conditions.transactionType || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="">Any</option>
                      <option value="receive">Receive</option>
                      <option value="send">Send</option>
                      <option value="swap">Swap</option>
                      <option value="merge">Merge</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Asset</label>
                    <select
                      defaultValue={selectedRule?.conditions.asset || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="">Any</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDC">USD Coin (USDC)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Minimum Amount</label>
                    <input
                      type="number"
                      defaultValue={selectedRule?.conditions.amountMin || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Maximum Amount</label>
                    <input
                      type="number"
                      defaultValue={selectedRule?.conditions.amountMax || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      placeholder="No limit"
                    />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Actions">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Classification</label>
                  <select
                    defaultValue={selectedRule?.actions.classification || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  >
                    <option value="">No change</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="trade">Trade</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tags (comma separated)</label>
                  <input
                    type="text"
                    defaultValue={selectedRule?.actions.tags?.join(', ') || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    placeholder="mining, income"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Confidence Level (%)</label>
                  <input
                    type="number"
                    defaultValue={selectedRule?.actions.confidence || 80}
                    min="1"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  />
                </div>
              </FormSection>

              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans">
                  {modalMode === 'create' ? 'Create Rule' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 font-sans">{selectedRule?.name}</h3>
                {selectedRule && getStatusBadge(selectedRule.status)}
              </div>
              <p className="text-gray-600 font-sans">{selectedRule?.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 font-sans">Conditions</h4>
                  <div className="space-y-2 text-sm font-sans">
                    {selectedRule?.conditions.transactionType && (
                      <div>Type: <span className="font-medium">{selectedRule.conditions.transactionType}</span></div>
                    )}
                    {selectedRule?.conditions.asset && (
                      <div>Asset: <span className="font-medium">{selectedRule.conditions.asset}</span></div>
                    )}
                    {selectedRule?.conditions.amountMin && (
                      <div>Min Amount: <span className="font-medium">{selectedRule.conditions.amountMin}</span></div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 font-sans">Actions</h4>
                  <div className="space-y-2 text-sm font-sans">
                    {selectedRule?.actions.classification && (
                      <div>Classification: <span className="font-medium">{selectedRule.actions.classification}</span></div>
                    )}
                    {selectedRule?.actions.confidence && (
                      <div>Confidence: <span className="font-medium">{selectedRule.actions.confidence}%</span></div>
                    )}
                    {selectedRule?.actions.tags && selectedRule.actions.tags.length > 0 && (
                      <div>
                        Tags: 
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedRule.actions.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4 text-sm font-sans">
                  <div>
                    <span className="text-gray-600">Matches:</span>
                    <div className="font-medium">{selectedRule?.matchCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Run:</span>
                    <div className="font-medium">{selectedRule?.lastRun}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Created:</span>
                    <div className="font-medium">{selectedRule?.createdAt}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}