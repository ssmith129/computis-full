import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function RuleBuilder() {
  const [isOpen, setIsOpen] = useState(true);
  const [conditions, setConditions] = useState({
    transactionType: { enabled: true, value: 'Receive' },
    asset: { enabled: true, value: 'Bitcoin (BTC)' },
    amountRange: { enabled: false, min: '', max: '' },
    addressContains: { enabled: false, value: '' }
  });

  const [actions, setActions] = useState({
    classification: { enabled: true, value: 'Income' },
    tags: { enabled: true, value: ['Mining'] },
    notes: { enabled: false, value: '' },
    confirmationStatus: { enabled: true, value: 'Confirmed' }
  });

  const toggleCondition = (key: string) => {
    setConditions(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const toggleAction = (key: string) => {
    setActions(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 font-sans">Rule Builder</h2>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center hover:scale-105 transition-all duration-200 font-sans"
        >
          <X className="w-4 h-4 mr-1" />
          Close
        </button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex space-x-4 mb-4">
          {/* Conditions */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-2 text-gray-900 font-sans">If transaction matches...</h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700 font-sans">Transaction Type</span>
                  <div className="relative inline-block w-8 h-4">
                    <input 
                      type="checkbox" 
                      checked={conditions.transactionType.enabled}
                      onChange={() => toggleCondition('transactionType')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer text-xs ${
                        conditions.transactionType.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      } hover:scale-105 transition-all duration-200`}
                      onClick={() => toggleCondition('transactionType')}
                    >
                      <div className={`absolute h-3 w-3 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                        conditions.transactionType.enabled ? 'translate-x-3.5' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans text-sm"
                  disabled={!conditions.transactionType.enabled}
                  value={conditions.transactionType.value}
                  onChange={(e) => setConditions(prev => ({
                    ...prev,
                    transactionType: { ...prev.transactionType, value: e.target.value }
                  }))}
                >
                  <option>Receive</option>
                  <option>Send</option>
                  <option>Swap</option>
                  <option>Any type</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700 font-sans">Asset</span>
                  <div className="relative inline-block w-8 h-4">
                    <input 
                      type="checkbox" 
                      checked={conditions.asset.enabled}
                      onChange={() => toggleCondition('asset')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer text-xs ${
                        conditions.asset.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleCondition('asset')}
                    >
                      <div className={`absolute h-3 w-3 bg-white rounded-full transition-transform top-0.5 ${
                        conditions.asset.enabled ? 'translate-x-3.5' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans text-sm"
                  disabled={!conditions.asset.enabled}
                >
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                  <option>USD Coin (USDC)</option>
                  <option>Any asset</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Amount Range</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={conditions.amountRange.enabled}
                      onChange={() => toggleCondition('amountRange')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        conditions.amountRange.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleCondition('amountRange')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        conditions.amountRange.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block font-sans">Min</label>
                    <input 
                      type="text" 
                      placeholder="0.0" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      disabled={!conditions.amountRange.enabled}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-600 mb-1 block font-sans">Max</label>
                    <input 
                      type="text" 
                      placeholder="Any" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      disabled={!conditions.amountRange.enabled}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Address Contains</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={conditions.addressContains.enabled}
                      onChange={() => toggleCondition('addressContains')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        conditions.addressContains.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleCondition('addressContains')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        conditions.addressContains.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter wallet address or pattern" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  disabled={!conditions.addressContains.enabled}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 font-sans">Then apply these changes...</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Classification</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={actions.classification.enabled}
                      onChange={() => toggleAction('classification')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        actions.classification.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleAction('classification')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        actions.classification.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  disabled={!actions.classification.enabled}
                >
                  <option>Income</option>
                  <option>Expense</option>
                  <option>Trade</option>
                  <option>Transfer</option>
                  <option>Gift</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Tags</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={actions.tags.enabled}
                      onChange={() => toggleAction('tags')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        actions.tags.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleAction('tags')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        actions.tags.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs flex items-center font-sans">
                    Mining
                    <button className="ml-1 text-blue-800 hover:text-blue-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                </div>
                <input 
                  type="text" 
                  placeholder="Add a tag" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  disabled={!actions.tags.enabled}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Notes</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={actions.notes.enabled}
                      onChange={() => toggleAction('notes')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        actions.notes.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleAction('notes')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        actions.notes.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <textarea 
                  placeholder="Add notes for this rule" 
                  className="w-full p-2 border border-gray-300 rounded-md h-20 focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  disabled={!actions.notes.enabled}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 font-sans">Confirmation Status</span>
                  <div className="relative inline-block w-10 h-6">
                    <input 
                      type="checkbox" 
                      checked={actions.confirmationStatus.enabled}
                      onChange={() => toggleAction('confirmationStatus')}
                      className="sr-only"
                    />
                    <div 
                      className={`absolute inset-0 rounded-full transition-colors cursor-pointer ${
                        actions.confirmationStatus.enabled ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleAction('confirmationStatus')}
                    >
                      <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform top-0.5 ${
                        actions.confirmationStatus.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`} />
                    </div>
                  </div>
                </div>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  disabled={!actions.confirmationStatus.enabled}
                >
                  <option>Confirmed</option>
                  <option>Needs Review</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="font-semibold mb-3 text-gray-900 font-sans">Preview Changes</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="text-sm text-gray-600 mb-2 font-sans">This rule will affect 12 transactions</div>
            <div className="flex space-x-6">
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-2 text-gray-700 font-sans">Before</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Classification:</span>
                      <span className="font-medium">Unclassified</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Tags:</span>
                      <span className="font-medium">None</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium mb-2 text-gray-700 font-sans">After</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Classification:</span>
                      <span className="font-medium text-green-600">Income</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Tags:</span>
                      <span className="font-medium text-blue-600">Mining</span>
                    </div>
                  </div>
                  <div className="p-2 bg-white border border-gray-200 rounded-md text-sm font-sans">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium text-green-600">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
            Cancel
          </button>
          <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans">
            Save Rule
          </button>
        </div>
      </div>
    </div>
  );
}