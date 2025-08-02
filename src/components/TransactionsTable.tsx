import React from 'react';
import { ArrowUpDown, Check, AlertTriangle, HelpCircle, AlertCircle, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';
import LoadingSpinner from './LoadingSpinner';

const transactions = [
  {
    id: 1,
    date: '2022-06-15',
    type: 'Receive',
    typeColor: 'bg-blue-100 text-blue-800',
    asset: 'Bitcoin (BTC)',
    assetIcon: '₿',
    assetColor: 'text-orange-500',
    amount: '0.25 BTC',
    fmv: '$5,250.00',
    classification: 'Income',
    classificationColor: 'bg-green-100 text-green-800',
    confidence: 95,
    confidenceLevel: 'high',
    status: 'Confirmed',
    statusColor: 'bg-green-100 text-green-800',
    hasWarning: false,
    isHighlighted: false
  },
  {
    id: 2,
    date: '2022-07-02',
    type: 'Swap',
    typeColor: 'bg-purple-100 text-purple-800',
    asset: 'Ethereum (ETH)',
    assetIcon: 'Ξ',
    assetColor: 'text-purple-500',
    amount: '1.5 ETH',
    fmv: '$2,850.00',
    classification: 'Trade',
    classificationColor: 'bg-yellow-100 text-yellow-800',
    confidence: 78,
    confidenceLevel: 'medium',
    status: 'Suggested',
    statusColor: 'bg-yellow-100 text-yellow-800',
    hasWarning: false,
    isHighlighted: false
  },
  {
    id: 3,
    date: '2022-08-14',
    type: 'Send',
    typeColor: 'bg-red-100 text-red-800',
    asset: 'Bitcoin (BTC)',
    assetIcon: '₿',
    assetColor: 'text-orange-500',
    amount: '0.15 BTC',
    fmv: '$3,750.00',
    classification: 'Expense',
    classificationColor: 'bg-red-100 text-red-800',
    confidence: 45,
    confidenceLevel: 'low',
    status: 'Flagged',
    statusColor: 'bg-red-100 text-red-800',
    hasWarning: true,
    isHighlighted: true
  },
  {
    id: 4,
    date: '2022-09-05',
    type: 'Receive',
    typeColor: 'bg-blue-100 text-blue-800',
    asset: 'USD Coin (USDC)',
    assetIcon: '$',
    assetColor: 'text-green-500',
    amount: '500 USDC',
    fmv: '$500.00',
    classification: 'Unclassified',
    classificationColor: 'bg-gray-100 text-gray-800',
    confidence: null,
    confidenceLevel: null,
    status: 'Pending',
    statusColor: 'bg-gray-100 text-gray-800',
    hasWarning: false,
    isHighlighted: false
  },
  {
    id: 5,
    date: '2022-10-22',
    type: 'Merge',
    typeColor: 'bg-orange-100 text-orange-800',
    asset: 'Ethereum (ETH)',
    assetIcon: 'Ξ',
    assetColor: 'text-purple-500',
    amount: '0.75 ETH',
    fmv: '$1,125.00',
    classification: 'Transfer',
    classificationColor: 'bg-orange-100 text-orange-800',
    confidence: 92,
    confidenceLevel: 'high',
    status: 'Confirmed',
    statusColor: 'bg-green-100 text-green-800',
    hasWarning: false,
    isHighlighted: false
  },
  {
    id: 6,
    date: '2022-11-08',
    type: 'Swap',
    typeColor: 'bg-purple-100 text-purple-800',
    asset: 'Bitcoin (BTC)',
    assetIcon: '₿',
    assetColor: 'text-orange-500',
    amount: '0.05 BTC',
    fmv: '$1,050.00',
    classification: 'Trade',
    classificationColor: 'bg-yellow-100 text-yellow-800',
    confidence: 82,
    confidenceLevel: 'medium',
    status: 'Suggested',
    statusColor: 'bg-yellow-100 text-yellow-800',
    hasWarning: false,
    isHighlighted: false
  },
  {
    id: 7,
    date: '2022-12-01',
    type: 'Receive',
    typeColor: 'bg-blue-100 text-blue-800',
    asset: 'Solana (SOL)',
    assetIcon: '◎',
    assetColor: 'text-blue-500',
    amount: '10 SOL',
    fmv: '$350.00',
    classification: 'Income',
    classificationColor: 'bg-green-100 text-green-800',
    conflictingClassification: 'Conflicting',
    confidence: 55,
    confidenceLevel: 'low',
    status: 'Flagged',
    statusColor: 'bg-red-100 text-red-800',
    hasWarning: true,
    isHighlighted: true
  }
];

const getConfidenceIcon = (confidenceLevel: string | null) => {
  switch (confidenceLevel) {
    case 'high':
      return <Check className="w-3 h-3" />;
    case 'medium':
      return <AlertCircle className="w-3 h-3" />;
    case 'low':
      return <HelpCircle className="w-3 h-3" />;
    default:
      return <Minus className="w-3 h-3" />;
  }
};

const getConfidenceColor = (confidenceLevel: string | null) => {
  switch (confidenceLevel) {
    case 'high':
      return 'bg-green-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'low':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-600 text-white';
  }
};

export default function TransactionsTable() {
  const { addNotification } = useNotifications();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<{ type: string; transactionId: number } | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleAction = (type: string, transactionId: number) => {
    setSelectedAction({ type, transactionId });
    setShowConfirmDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedAction) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const transaction = transactions.find(t => t.id === selectedAction.transactionId);
    
    switch (selectedAction.type) {
      case 'accept':
        addNotification({
          type: 'success',
          title: 'Classification Accepted',
          message: `Transaction classification has been confirmed.`,
          duration: 3000
        });
        break;
      case 'reject':
        addNotification({
          type: 'warning',
          title: 'Classification Rejected',
          message: `Transaction has been marked for manual review.`,
          duration: 3000
        });
        break;
      case 'ai-classify':
        addNotification({
          type: 'info',
          title: 'AI Classification Started',
          message: `AI is analyzing the transaction...`,
          duration: 2000
        });
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'AI Classification Complete',
            message: `Transaction classified as Income with 87% confidence.`,
            duration: 4000
          });
        }, 2000);
        break;
    }
    
    setIsProcessing(false);
    setShowConfirmDialog(false);
    setSelectedAction(null);
  };

  const handleBulkAction = (action: string) => {
    addNotification({
      type: 'info',
      title: 'Bulk Action Started',
      message: `Processing ${action} for selected transactions...`,
      duration: 3000
    });
    
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Bulk Action Complete',
        message: `Successfully processed ${action} for 5 transactions.`,
        duration: 4000
      });
    }, 3000);
  };

  return (
    <>
      {/* AI Confidence Legend */}
      <div className="px-10 py-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <span className="text-base font-medium font-display">AI Confidence Levels:</span>
            <div className="flex items-center hover:scale-105 transition-transform duration-200">
              <div className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-base font-sans">High (90%+)</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-200">
              <div className="bg-yellow-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3">
                <AlertCircle className="w-3 h-3" />
              </div>
              <span className="text-base font-sans">Medium (70-89%)</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-200">
              <div className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs mr-3">
                <HelpCircle className="w-3 h-3" />
              </div>
              <span className="text-base font-sans">Low (&lt;70%)</span>
            </div>
          </div>
          <div>
            <button className="text-base text-gray-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">Hide Legend</button>
          </div>
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="px-10 py-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-4 rounded border-gray-300 hover:scale-110 transition-transform duration-200 font-sans" />
                      Date
                      <ArrowUpDown className="w-4 h-4 ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Type</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Asset</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Amount</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">FMV (USD)</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">AI Classification</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Confidence</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Status</th>
                  <th className="px-6 py-4 text-base font-medium text-gray-700 font-display">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className={`border-t border-gray-100 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 group ${
                      transaction.isHighlighted ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-4 rounded border-gray-300 hover:scale-110 transition-transform duration-200 font-sans" />
                        <span className="text-base font-sans">{transaction.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium font-sans hover:scale-105 transition-transform duration-200 ${transaction.typeColor}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <span className={`text-xl mr-3 ${transaction.assetColor} hover:scale-110 transition-transform duration-200`}>
                          {transaction.assetIcon}
                        </span>
                        <span className="text-base font-sans">{transaction.asset}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-base font-sans">{transaction.amount}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <span className="text-base font-sans">{transaction.fmv}</span>
                        {transaction.hasWarning && (
                          <AlertTriangle className="w-5 h-5 text-red-500 ml-3 hover:scale-110 transition-transform duration-200" title="FMV may be inaccurate" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium font-sans hover:scale-105 transition-transform duration-200 ${transaction.classificationColor}`}>
                          {transaction.classification}
                        </span>
                        {transaction.conflictingClassification && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-sans hover:scale-105 transition-transform duration-200">
                            {transaction.conflictingClassification}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center" title={
                        transaction.confidenceLevel === 'high' ? 'High confidence - Based on recurring pattern' :
                        transaction.confidenceLevel === 'medium' ? 'Medium confidence - Similar to past patterns' :
                        transaction.confidenceLevel === 'low' ? 'Low confidence - Unusual pattern, needs review' :
                        'No AI classification attempted yet'
                      }>
                        <div className={`rounded-full h-6 w-6 flex items-center justify-center text-xs hover:scale-110 transition-transform duration-200 ${getConfidenceColor(transaction.confidenceLevel)}`}>
                          {getConfidenceIcon(transaction.confidenceLevel)}
                        </div>
                        <span className="ml-2 text-base font-sans">
                          {transaction.confidence ? `${transaction.confidence}%` : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium font-sans hover:scale-105 transition-transform duration-200 ${transaction.statusColor}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex space-x-3">
                        {transaction.classification === 'Unclassified' ? (
                          <button 
                            className="text-blue-500 hover:text-blue-700 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100" 
                            title="AI Classify"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        ) : (
                          <button 
                            className="text-gray-400 hover:text-green-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100" 
                            title="Accept"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          className="text-gray-400 hover:text-red-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100" 
                          title="Reject"
                        >
                          <AlertTriangle className="w-5 h-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100" title="More options">
                          <HelpCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-6">
              <div className="text-base text-gray-600 font-sans">
                Showing 7 of 124 transactions
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-base text-gray-600 font-display">Bulk Actions:</span>
                <button 
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans"
                >
                  <Check className="w-4 h-4 mr-2 inline" />
                  Accept All
                </button>
                <button 
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans"
                >
                  <AlertTriangle className="w-4 h-4 mr-2 inline" />
                  Tag
                </button>
                <button 
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2 inline" />
                  Export
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 hover:scale-105 transition-all duration-200 font-sans">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:scale-105 transition-all duration-200 font-sans font-medium">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans">...</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-sans">25</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 hover:scale-105 transition-all duration-200 font-sans">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setSelectedAction(null);
        }}
        onConfirm={confirmAction}
        title={
          selectedAction?.type === 'accept' ? 'Accept Classification' :
          selectedAction?.type === 'reject' ? 'Reject Classification' :
          'Start AI Classification'
        }
        message={
          selectedAction?.type === 'accept' ? 'Are you sure you want to accept this AI classification?' :
          selectedAction?.type === 'reject' ? 'This will mark the transaction for manual review.' :
          'AI will analyze this transaction and suggest a classification.'
        }
        type={
          selectedAction?.type === 'reject' ? 'warning' : 'info'
        }
        confirmText={
          selectedAction?.type === 'accept' ? 'Accept' :
          selectedAction?.type === 'reject' ? 'Reject' :
          'Start AI Analysis'
        }
        isLoading={isProcessing}
      />

      {/* AI Classification Insights */}
      <div className="px-10 py-8 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-display">AI Classification Insights</h2>
          <button className="text-base text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium">View Details</button>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4 hover:scale-110 transition-transform duration-200">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 font-display">High Confidence</h3>
                <p className="text-base text-gray-600 font-sans">68 transactions (55%)</p>
              </div>
            </div>
            <div className="mt-4 text-base text-gray-700 font-sans">
              These transactions match known patterns with high confidence.
            </div>
            <div className="mt-4">
              <button 
                className="text-base text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-4 hover:scale-110 transition-transform duration-200">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 font-display">Medium Confidence</h3>
                <p className="text-base text-gray-600 font-sans">42 transactions (34%)</p>
              </div>
            </div>
            <div className="mt-4 text-base text-gray-700 font-sans">
              These transactions have somewhat reliable AI classifications.
            </div>
            <div className="mt-4">
              <button 
                className="text-base text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium"
              >
                Review All
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-4 hover:scale-110 transition-transform duration-200">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 font-display">Low Confidence</h3>
                <p className="text-base text-gray-600 font-sans">14 transactions (11%)</p>
              </div>
            </div>
            <div className="mt-4 text-base text-gray-700 font-sans">
              These transactions need manual review due to uncertain patterns.
            </div>
            <div className="mt-4">
              <button 
                className="text-base text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium"
              >
                Fix Manually
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}