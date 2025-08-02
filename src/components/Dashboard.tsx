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
        addNotification({
          type: 'info',
          title: 'Import Started',
          message: 'Opening transaction import wizard...',
          duration: 2000
        });
        break;
      case 'report':
        addNotification({
          type: 'info',
          title: 'Report Generation',
          message: 'Preparing your tax report...',
          duration: 3000
        });
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'Report Ready',
            message: 'Your IRS Form 8949 is ready for download.',
            action: {
              label: 'Download',
              onClick: () => console.log('Download report')
            }
          });
        }, 3000);
        break;
      case 'client':
        addNotification({
          type: 'success',
          title: 'Client Added',
          message: 'New client profile has been created successfully.',
          duration: 3000
        });
        break;
      case 'wallet':
        addNotification({
          type: 'info',
          title: 'Wallet Connection',
          message: 'Connecting to wallet and syncing transactions...',
          duration: 4000
        });
        break;
    }
  };

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <AnimatedCard key={stat.title} className="p-10" hover glow={stat.title === 'Total Transactions'}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-600 font-display">{stat.title}</p>
                <p className="text-4xl font-bold text-gray-900 mt-4 font-display">{stat.value}</p>
                <p className={`text-base mt-2 font-sans ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-20 w-20 rounded-2xl flex items-center justify-center ${stat.color} hover:scale-110 transition-transform duration-200 animate-float`}>
                <stat.icon className="h-10 w-10" />
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <AnimatedCard className="p-10" hover>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-gray-900 font-display">Recent Activity</h2>
              <InteractiveButton variant="secondary" size="sm">
                View All
              </InteractiveButton>
            </div>
            <div className="space-y-8">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 group">
                  <div className={`h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                    <activity.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 font-display">{activity.type}</p>
                    <p className="text-base text-gray-600 mt-2 font-sans">{activity.description}</p>
                    <p className="text-sm text-gray-500 mt-2 font-sans">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusIndicator 
                      status={activity.status === 'completed' ? 'success' : 'warning'} 
                      label={activity.status === 'completed' ? 'Completed' : 'Review'}
                      size="md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* AI Insights */}
        <div className="space-y-10">
          <AnimatedCard className="p-10" hover float>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 font-display">AI Insights</h2>
            <div className="space-y-10">
              {aiInsights.map((insight, index) => (
                <div key={index} className="hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-bold text-gray-900 font-display group-hover:text-yellow-600 transition-colors duration-300">{insight.value}</span>
                    {insight.trend === 'up' && (
                      <TrendingUp className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform duration-200 animate-float" />
                    )}
                  </div>
                  <p className="text-lg font-medium text-gray-900 font-display">{insight.title}</p>
                  <p className="text-base text-gray-600 mt-3 font-sans">{insight.description}</p>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Quick Actions */}
          <AnimatedCard className="p-10" hover>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 font-display">Quick Actions</h2>
            <div className="space-y-6">
              <InteractiveButton 
                variant="secondary" 
                size="lg" 
                icon={TrendingUp}
                className="w-full justify-between"
                tooltip="Import crypto transactions from exchanges and wallets"
              >
                <span className="text-lg font-medium text-gray-900">Import Transactions</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="lg" 
                icon={FileText}
                className="w-full justify-between"
                tooltip="Generate tax reports and compliance documents"
              >
                <span className="text-lg font-medium text-gray-900">Generate Report</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="lg" 
                icon={Users}
                className="w-full justify-between"
                tooltip="Add new client to your portfolio"
              >
                <span className="text-lg font-medium text-gray-900">Add Client</span>
              </InteractiveButton>
              <InteractiveButton 
                variant="secondary" 
                size="lg" 
                icon={Wallet}
                className="w-full justify-between"
                tooltip="Connect crypto wallets and exchanges"
              >
                <span className="text-lg font-medium text-gray-900">Connect Wallet</span>
              </InteractiveButton>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton actions={floatingActions} position="bottom-right" />
    </div>
  );
}