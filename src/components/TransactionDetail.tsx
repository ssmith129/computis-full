import React, { useState } from 'react';
import { ArrowLeft, Edit, Save, X, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface TransactionDetailProps {
  transactionId: string;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transactionId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transaction, setTransaction] = useState({
    id: 'tx_001',
    date: '2023-12-15',
    time: '14:32:15',
    type: 'Receive',
    asset: 'Bitcoin (BTC)',
    amount: '0.25',
    fmv: '5250.00',
    fmvSource: 'CoinGecko',
    classification: 'Income',
    confidence: 95,
    status: 'Confirmed',
    txHash: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    fromAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    toAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    fee: '0.0001',
    notes: 'Mining reward from pool',
    tags: ['Mining', 'Income'],
    aiReason: 'Pattern matches previous mining rewards from same address'
  });

  const [editForm, setEditForm] = useState({ ...transaction });

  const handleSave = () => {
    setTransaction({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...transaction });
    setIsEditing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">Transaction Details</h1>
            <p className="text-gray-600 font-sans">ID: {transaction.id}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-sans">
                <X className="w-4 h-4 mr-2 inline" />
                Cancel
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
                <Save className="w-4 h-4 mr-2 inline" />
                Save Changes
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 font-sans">
              <Edit className="w-4 h-4 mr-2 inline" />
              Edit Transaction
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Transaction Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Transaction Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date & Time</label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    />
                    <input
                      type="time"
                      value={editForm.time}
                      onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    />
                  </div>
                ) : (
                  <p className="text-gray-900 font-sans">{transaction.date} at {transaction.time}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Transaction Type</label>
                {isEditing ? (
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  >
                    <option value="Receive">Receive</option>
                    <option value="Send">Send</option>
                    <option value="Swap">Swap</option>
                    <option value="Merge">Merge</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium font-sans">
                    {transaction.type}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Asset</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.asset}
                    onChange={(e) => setEditForm(prev => ({ ...prev, asset: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  />
                ) : (
                  <p className="text-gray-900 font-sans">{transaction.asset}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Amount</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.amount}
                    onChange={(e) => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  />
                ) : (
                  <p className="text-gray-900 font-sans">{transaction.amount} BTC</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Fair Market Value</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.fmv}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fmv: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  />
                ) : (
                  <div>
                    <p className="text-gray-900 font-sans">${transaction.fmv}</p>
                    <p className="text-xs text-gray-500 font-sans">Source: {transaction.fmvSource}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Status</label>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(transaction.status)}
                  <span className="text-gray-900 font-sans">{transaction.status}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Transaction Hash</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 break-all">
                  {transaction.txHash}
                </code>
                <button className="p-2 text-blue-600 hover:text-blue-800">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">From Address</label>
                <code className="block px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 break-all">
                  {transaction.fromAddress}
                </code>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">To Address</label>
                <code className="block px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900 break-all">
                  {transaction.toAddress}
                </code>
              </div>
            </div>
          </div>

          {/* Classification & AI Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-display">Classification & AI Analysis</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Classification</label>
                {isEditing ? (
                  <select
                    value={editForm.classification}
                    onChange={(e) => setEditForm(prev => ({ ...prev, classification: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                    <option value="Trade">Trade</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Gift">Gift</option>
                  </select>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium font-sans">
                    {transaction.classification}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">AI Confidence</label>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium font-sans ${getConfidenceColor(transaction.confidence)}`}>
                    {transaction.confidence}%
                  </span>
                  <span className="text-sm text-gray-600 font-sans">
                    {transaction.confidence >= 90 ? 'High' : transaction.confidence >= 70 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">AI Reasoning</label>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg font-sans">{transaction.aiReason}</p>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tags</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.tags.join(', ')}
                  onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value.split(', ') }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                  placeholder="Enter tags separated by commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {transaction.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-sans">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Notes</label>
              {isEditing ? (
                <textarea
                  value={editForm.notes}
                  onChange={(e) => setEditForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                />
              ) : (
                <p className="text-gray-700 font-sans">{transaction.notes}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors duration-200 font-sans">
                Accept AI Classification
              </button>
              <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors duration-200 font-sans">
                Request Manual Review
              </button>
              <button className="w-full px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors duration-200 font-sans">
                Flag as Duplicate
              </button>
            </div>
          </div>

          {/* Related Transactions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">Related Transactions</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900 font-sans">Send BTC</p>
                <p className="text-xs text-gray-600 font-sans">2023-12-14 • 0.1 BTC</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900 font-sans">Receive BTC</p>
                <p className="text-xs text-gray-600 font-sans">2023-12-13 • 0.15 BTC</p>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">History</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 font-sans">AI Classified</p>
                  <p className="text-xs text-gray-600 font-sans">2023-12-15 14:35</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 font-sans">Transaction Imported</p>
                  <p className="text-xs text-gray-600 font-sans">2023-12-15 14:32</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 font-sans">Transaction Created</p>
                  <p className="text-xs text-gray-600 font-sans">2023-12-15 14:32</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;