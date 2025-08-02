import React from 'react';
import { ArrowUpDown, Check, AlertTriangle, HelpCircle, AlertCircle, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import ConfirmDialog from './ConfirmDialog';
import LoadingSpinner from './LoadingSpinner';
import StatusIndicator from './StatusIndicator';
import ActionMenu from './ActionMenu';
import InteractiveButton from './InteractiveButton';
import AnimatedCard from './AnimatedCard';

interface TransactionsTableProps {
  onTransactionSelect?: (transactionId: string) => void;
  selectedTransactions?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

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
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

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

  const getActionMenuItems = (transaction: any) => [
    {
      label: 'View Details',
      icon: HelpCircle,
      onClick: () => handleAction('view', transaction.id)
    },
    {
      label: 'Edit Transaction',
      icon: AlertTriangle,
      onClick: () => handleAction('edit', transaction.id)
    },
    {
      label: 'Duplicate',
      icon: Check,
      onClick: () => handleAction('duplicate', transaction.id)
    },
    {
      label: 'Delete',
      icon: AlertTriangle,
      onClick: () => handleAction('delete', transaction.id),
      variant: 'danger' as const
    }
  ];
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
      <div className="px-12 py-8 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <span className="text-lg font-medium font-display">AI Confidence Levels:</span>
            <div className="flex items-center hover:scale-105 transition-transform duration-200 group">
              <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-4 group-hover:animate-pulse">
                <Check className="w-3 h-3" />
              </div>
              <span className="text-lg font-sans">High (90%+)</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-200 group">
              <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-4 group-hover:animate-pulse">
                <AlertCircle className="w-3 h-3" />
              </div>
              <span className="text-lg font-sans">Medium (70-89%)</span>
            </div>
            <div className="flex items-center hover:scale-105 transition-transform duration-200 group">
              <div className="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-4 group-hover:animate-pulse">
                <HelpCircle className="w-3 h-3" />
              </div>
              <span className="text-lg font-sans">Low (&lt;70%)</span>
            </div>
          </div>
          <div>
            <InteractiveButton variant="secondary" size="sm">
              Hide Legend
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="px-12 py-10">
        <AnimatedCard className="overflow-hidden" hover>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-6 rounded border-gray-300 hover:scale-110 transition-transform duration-200 w-5 h-5" />
                      Date
                      <ArrowUpDown className="w-5 h-5 ml-3 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110" />
                    </div>
                  </th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Type</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Asset</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Amount</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">FMV (USD)</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">AI Classification</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Confidence</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Status</th>
                  <th className="px-8 py-6 text-lg font-medium text-gray-700 font-display">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className={`border-t border-gray-100 hover:bg-gray-50 hover:shadow-sm transition-all duration-300 group ${
                      transaction.isHighlighted ? 'bg-red-50' : ''
                    } ${hoveredRow === transaction.id ? 'scale-105 shadow-lg' : ''}`}
                    onMouseEnter={() => setHoveredRow(transaction.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-6 rounded border-gray-300 hover:scale-110 transition-transform duration-200 w-5 h-5" />
                        <span className="text-lg font-sans">{transaction.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-2 rounded-xl text-base font-medium font-sans hover:scale-105 transition-transform duration-200 ${transaction.typeColor}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <span className={`text-2xl mr-4 ${transaction.assetColor} hover:scale-110 transition-transform duration-200 animate-float`}>
                          {transaction.assetIcon}
                        </span>
                        <span className="text-lg font-sans">{transaction.asset}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-lg font-sans">{transaction.amount}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <span className="text-lg font-sans">{transaction.fmv}</span>
                        {transaction.hasWarning && (
                          <AlertTriangle className="w-6 h-6 text-red-500 ml-4 hover:scale-110 transition-transform duration-200 animate-pulse" title="FMV may be inaccurate" />
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <span className={`px-4 py-2 rounded-xl text-base font-medium font-sans hover:scale-105 transition-transform duration-200 ${transaction.classificationColor}`}>
                          {transaction.classification}
                        </span>
                        {transaction.conflictingClassification && (
                          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-xl text-base font-sans hover:scale-105 transition-transform duration-200 animate-shake">
                            {transaction.conflictingClassification}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center" title={
                        transaction.confidenceLevel === 'high' ? 'High confidence - Based on recurring pattern' :
                        transaction.confidenceLevel === 'medium' ? 'Medium confidence - Similar to past patterns' :
                        transaction.confidenceLevel === 'low' ? 'Low confidence - Unusual pattern, needs review' :
                        'No AI classification attempted yet'
                      }>
                        <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm hover:scale-110 transition-transform duration-200 ${getConfidenceColor(transaction.confidenceLevel)} animate-pulse`}>
                          {getConfidenceIcon(transaction.confidenceLevel)}
                        </div>
                        <span className="ml-3 text-lg font-sans">
                          {transaction.confidence ? `${transaction.confidence}%` : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <StatusIndicator 
                        status={
                          transaction.status === 'Confirmed' ? 'success' :
                          transaction.status === 'Suggested' ? 'pending' :
                          transaction.status === 'Flagged' ? 'error' :
                          'pending'
                        }
                        label={transaction.status}
                        size="md"
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        {transaction.classification === 'Unclassified' ? (
                          <InteractiveButton 
                            variant="primary" 
                            size="sm" 
                            icon={Check}
                            tooltip="AI Classify"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            Classify
                          </InteractiveButton>
                        ) : (
                          <InteractiveButton 
                            variant="success" 
                            size="sm" 
                            icon={Check}
                            tooltip="Accept Classification"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            Accept
                          </InteractiveButton>
                        )}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ActionMenu actions={getActionMenuItems(transaction)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-8">
              <div className="text-lg text-gray-600 font-sans">
                Showing 7 of 124 transactions
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg text-gray-600 font-display">Bulk Actions:</span>
                <InteractiveButton 
                  variant="success" 
                  size="sm" 
                  icon={Check}
                  tooltip="Accept all visible classifications"
                >
                  Accept All
                </InteractiveButton>
                <InteractiveButton 
                  variant="warning" 
                  size="sm" 
                  icon={AlertTriangle}
                  tooltip="Add tags to selected transactions"
                >
                  Tag
                </InteractiveButton>
                <InteractiveButton 
                  variant="secondary" 
                  size="sm" 
                  icon={ArrowUpDown}
                  tooltip="Export selected transactions"
                >
                  Export
                </InteractiveButton>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <InteractiveButton variant="secondary" size="sm" icon={ChevronLeft} disabled>
                Previous
              </InteractiveButton>
              <div className="flex items-center space-x-2">
                <InteractiveButton variant="primary" size="sm">1</InteractiveButton>
                <InteractiveButton variant="secondary" size="sm">2</InteractiveButton>
                <InteractiveButton variant="secondary" size="sm">3</InteractiveButton>
                <span className="text-gray-500 font-sans">...</span>
                <InteractiveButton variant="secondary" size="sm">25</InteractiveButton>
              </div>
              <InteractiveButton variant="secondary" size="sm" icon={ChevronRight}>
                Next
              </InteractiveButton>
            </div>
          </div>
        </AnimatedCard>
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
      <div className="px-12 py-10 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 font-display">AI Classification Insights</h2>
          <InteractiveButton variant="secondary" size="md">
            View Details
          </InteractiveButton>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <AnimatedCard className="p-8 cursor-pointer" hover glow>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-6 hover:scale-110 transition-transform duration-200 animate-pulse-glow">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 font-display">High Confidence</h3>
                <p className="text-lg text-gray-600 font-sans">68 transactions (55%)</p>
              </div>
            </div>
            <div className="mt-6 text-lg text-gray-700 font-sans">
              These transactions match known patterns with high confidence.
            </div>
            <div className="mt-6">
              <InteractiveButton variant="success" size="md" className="w-full">
                Accept All
              </InteractiveButton>
            </div>
          </AnimatedCard>
          <AnimatedCard className="p-8 cursor-pointer" hover>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-6 hover:scale-110 transition-transform duration-200 animate-pulse">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 font-display">Medium Confidence</h3>
                <p className="text-lg text-gray-600 font-sans">42 transactions (34%)</p>
              </div>
            </div>
            <div className="mt-6 text-lg text-gray-700 font-sans">
              These transactions have somewhat reliable AI classifications.
            </div>
            <div className="mt-6">
              <InteractiveButton variant="warning" size="md" className="w-full">
                Review All
              </InteractiveButton>
            </div>
          </AnimatedCard>
          <AnimatedCard className="p-8 cursor-pointer" hover>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-6 hover:scale-110 transition-transform duration-200 animate-shake">
                <HelpCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 font-display">Low Confidence</h3>
                <p className="text-lg text-gray-600 font-sans">14 transactions (11%)</p>
              </div>
            </div>
            <div className="mt-6 text-lg text-gray-700 font-sans">
              These transactions need manual review due to uncertain patterns.
            </div>
            <div className="mt-6">
              <InteractiveButton variant="danger" size="md" className="w-full">
                Fix Manually
              </InteractiveButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </>
  );
}