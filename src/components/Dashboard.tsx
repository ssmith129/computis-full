import React from 'react';
import { TrendingUp, Users, Wallet, FileText, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import FloatingActionButton from './FloatingActionButton';

const stats = [
  {
    title: 'Total Transactions',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Active Clients',
    value: '24',
    change: '+3',
    changeType: 'positive',
    icon: Users,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Connected Wallets',
    value: '156',
    change: '+8',
    changeType: 'positive',
    icon: Wallet,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Reports Generated',
    value: '89',
    change: '+15%',
    changeType: 'positive',
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'AI Classification',
    description: 'Classified 24 Bitcoin transactions as Income',
    time: '2 hours ago',
    status: 'completed',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'Anomaly Detected',
    description: 'Unusual trading volume detected for Client ABC',
    time: '4 hours ago',
    status: 'warning',
    icon: AlertTriangle,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'Report Generated',
    description: 'IRS 8949 form completed for Q4 2023',
    time: '6 hours ago',
    status: 'completed',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'Data Import',
    description: 'Imported 156 transactions from Coinbase',
    time: '1 day ago',
    status: 'completed',
    icon: TrendingUp,
    color: 'text-purple-500'
  }
];

const aiInsights = [
  {
    title: 'High Confidence Classifications',
    value: '89%',
    description: 'of transactions classified with 90%+ confidence',
    trend: 'up'
  },
  {
    title: 'Anomalies Detected',
    value: '12',
    description: 'potential issues flagged for review',
    trend: 'neutral'
  },
  {
    title: 'Time Saved',
    value: '47 hrs',
    description: 'estimated manual work automated this month',
    trend: 'up'
  }
];

interface DashboardProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Dashboard({ onWorkflowOpen }: DashboardProps) {
  const { addNotification } = useNotifications();

  const floatingActions = [
    {
      label: 'Import Transactions',
      icon: TrendingUp,
      onClick: () => onWorkflowOpen?.('import-transactions'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Generate Report',
      icon: FileText,
      onClick: () => onWorkflowOpen?.('generate-report'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Add Client',
      icon: Users,
      onClick: () => onWorkflowOpen?.('add-client'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      label: 'Connect Wallet',
      icon: Wallet,
      onClick: () => onWorkflowOpen?.('connect-wallet'),
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'import':
        onWorkflowOpen?.('import-transactions');
        addNotification({
          type: 'info',
          title: 'Import Started',
          message: 'Opening import workflow...',
          duration: 2000
        });
        break;
      case 'report':
        onWorkflowOpen?.('generate-report');
        addNotification({
          type: 'info',
          title: 'Report Generation',
          message: 'Opening report generation workflow...',
          duration: 2000
        });
        break;
      case 'client':
        onWorkflowOpen?.('add-client');
        addNotification({
          type: 'info',
          title: 'Client Added',
          message: 'Opening add client workflow...',
          duration: 2000
        });
        break;
      case 'wallet':
        onWorkflowOpen?.('connect-wallet');
        addNotification({
          type: 'info',
          title: 'Wallet Connection',
          message: 'Opening wallet connection workflow...',
          duration: 2000
        });
        break;
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        {stats.map((stat) => (
          <AnimatedCard key={stat.title} className="p-4" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-display">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1 font-display">{stat.value}</p>
                <p className={`text-sm mt-1 font-sans ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.color} hover:scale-105 transition-transform duration-150`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="dashboard-main-grid">
        {/* Recent Activity */}
        <div className="">
          <AnimatedCard className="card-responsive" hover>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-display">Recent Crypto Tax Activity</h3>
              <InteractiveButton variant="secondary" size="sm">
                View All
              </InteractiveButton>
            </div>
            <div className="space-y-2">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-150 group">
                  <div className={`h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center ${activity.color} group-hover:scale-105 transition-transform duration-150`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 font-display">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-1 font-sans">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1 font-sans">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusIndicator 
                      status={activity.status === 'completed' ? 'success' : 'warning'} 
                      label={activity.status === 'completed' ? 'Completed' : 'Review'}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <AnimatedCard className="card-responsive" hover>
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">AI Tax Classification Insights</h3>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="hover:bg-gray-50 p-3 rounded-md transition-all duration-150 group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-gray-900 font-display group-hover:text-yellow-600 transition-colors duration-200">{insight.value}</span>
                    {insight.trend === 'up' && (
                      <TrendingUp className="h-3 w-3 text-green-500 group-hover:scale-105 transition-transform duration-150" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900 font-display">{insight.title}</p>
                  <p className="text-xs text-gray-600 mt-1 font-sans">{insight.description}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Quick Actions */}
          <AnimatedCard className="card-responsive" hover>
            <h3 className="text-responsive-xl font-bold text-gray-900 mb-4 font-display">Quick Tax Management Actions</h3>
            <div className="grid-responsive-2">
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={TrendingUp}
                className="w-full justify-center"
                onClick={() => handleQuickAction('import')}
              >
                <span className="text-sm font-semibold text-gray-900">Import</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={FileText}
                className="w-full justify-center"
                onClick={() => handleQuickAction('report')}
              >
                <span className="text-sm font-semibold text-gray-900">Report</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={Users}
                className="w-full justify-center"
                onClick={() => handleQuickAction('client')}
              >
                <span className="text-sm font-semibold text-gray-900">Client</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="sm" 
                icon={Wallet}
                className="w-full justify-center"
                onClick={() => handleQuickAction('wallet')}
              >
                <span className="text-sm font-semibold text-gray-900">Wallet</span>
              </InteractiveButton>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton actions={floatingActions} position="bottom-right" size="sm" />
    </div>
  );
}
