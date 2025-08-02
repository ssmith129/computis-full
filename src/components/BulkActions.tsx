import React, { useState } from 'react';
import { Check, X, Tag, Download, AlertTriangle, CheckCircle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onClose: () => void;
  onWorkflowOpen?: (workflow: string) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({ selectedCount, onClose, onWorkflowOpen }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [bulkClassification, setBulkClassification] = useState('');
  const [bulkTags, setBulkTags] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addNotification } = useNotifications();

  const handleBulkAction = async (action: string) => {
    setIsProcessing(true);
    setActiveAction(action);
    
    let message = '';
    switch (action) {
      case 'accept':
        message = `Accepting ${selectedCount} transactions...`;
        break;
      case 'reject':
        message = `Rejecting ${selectedCount} transactions...`;
        break;
      case 'classify':
        message = `Applying classification to ${selectedCount} transactions...`;
        break;
      case 'tag':
        message = `Adding tags to ${selectedCount} transactions...`;
        break;
      case 'export':
        message = `Exporting ${selectedCount} transactions...`;
        break;
    }
    
    addNotification({
      type: 'info',
      title: 'Bulk Action Started',
      message,
      duration: 2000
    });
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addNotification({
      type: 'success',
      title: 'Bulk Action Complete',
      message: `Successfully processed ${selectedCount} transactions.`,
      duration: 3000
    });
    
    setIsProcessing(false);
    setActiveAction(null);
    onClose();
  };

  const handleApplyClassification = () => {
    if (bulkClassification) {
      handleBulkAction('classify');
    }
  };

  const handleApplyTags = () => {
    if (bulkTags) {
      handleBulkAction('tag');
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900 font-sans">
                {selectedCount} transaction{selectedCount > 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 font-sans"
                onClick={() => handleBulkAction('accept')}
                disabled={isProcessing}
              >
                {isProcessing && activeAction === 'accept' ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                ) : (
                  <Check className="w-3 h-3 mr-1" />
                )}
                Accept All
              </button>
              
              <button
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors duration-200 font-sans"
                onClick={() => handleBulkAction('reject')}
                disabled={isProcessing}
              >
                {isProcessing && activeAction === 'reject' ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                ) : (
                  <X className="w-3 h-3 mr-1" />
                )}
                Reject All
              </button>

              <div className="flex items-center space-x-1">
                <select
                  value={bulkClassification}
                  onChange={(e) => setBulkClassification(e.target.value)}
                  className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans text-sm"
                  disabled={isProcessing}
                >
                  <option value="">Classify as...</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="trade">Trade</option>
                  <option value="transfer">Transfer</option>
                  <option value="gift">Gift</option>
                </select>
                <button
                  disabled={!bulkClassification || isProcessing}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 font-sans text-sm"
                  onClick={handleApplyClassification}
                >
                  Apply
                </button>
              </div>

              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  placeholder="Add tags..."
                  value={bulkTags}
                  onChange={(e) => setBulkTags(e.target.value)}
                  className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans text-sm"
                  disabled={isProcessing}
                />
                <button
                  disabled={!bulkTags || isProcessing}
                  className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200 font-sans text-sm"
                  onClick={handleApplyTags}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  Tag
                </button>
              </div>

              <button
                disabled={isProcessing}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200 font-sans text-sm"
                onClick={() => handleBulkAction('export')}
              >
                <Download className="w-3 h-3 mr-1" />
                Export
              </button>
            </div>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 p-2"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isProcessing && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
              <span className="text-blue-800 font-medium font-sans text-sm">
                Processing {selectedCount} transactions...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;