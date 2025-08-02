import React from 'react';
import { TrendingUp, DollarSign, GitBranch } from 'lucide-react';
import { useNotifications } from './NotificationSystem';

const anomalies = [
  {
    id: 1,
    icon: TrendingUp,
    iconColor: 'bg-red-100 text-red-500',
    title: 'Volume Spike Detected',
    description: 'Unusual transaction volume on Aug 14, 2022',
    details: 'Transaction volume increased by 450% compared to 30-day average.',
    actions: ['Investigate', 'Dismiss']
  },
  {
    id: 2,
    icon: DollarSign,
    iconColor: 'bg-yellow-100 text-yellow-500',
    title: 'Missing FMV Data',
    description: '3 transactions missing accurate pricing',
    details: 'Fair market value may be inaccurate for these transactions.',
    actions: ['Fix Values', 'Dismiss']
  },
  {
    id: 3,
    icon: GitBranch,
    iconColor: 'bg-blue-100 text-blue-500',
    title: 'Classification Conflict',
    description: 'Rule conflict detected in 2 transactions',
    details: 'Multiple rules are trying to classify the same transactions differently.',
    actions: ['Resolve', 'Dismiss']
  }
];

export default function AnomalyFlags() {
  const { addNotification } = useNotifications();

  const handleAnomalyAction = (anomalyId: number, action: string) => {
    const anomaly = anomalies.find(a => a.id === anomalyId);
    
    if (action === 'investigate') {
      addNotification({
        type: 'info',
        title: 'Investigation Started',
        message: `Analyzing ${anomaly?.title.toLowerCase()}...`,
        duration: 3000
      });
      
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Investigation Complete',
          message: 'Anomaly has been reviewed and flagged for attention.',
          duration: 4000
        });
      }, 3000);
    } else if (action === 'dismiss') {
      addNotification({
        type: 'success',
        title: 'Anomaly Dismissed',
        message: `${anomaly?.title} has been marked as resolved.`,
        duration: 3000
      });
    } else if (action === 'fix') {
      addNotification({
        type: 'info',
        title: 'Fixing Values',
        message: 'Updating fair market values from external sources...',
        duration: 3000
      });
      
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Values Updated',
          message: 'Fair market values have been successfully updated.',
          duration: 4000
        });
      }, 3000);
    } else if (action === 'resolve') {
      addNotification({
        type: 'info',
        title: 'Resolving Conflict',
        message: 'Analyzing rule conflicts and applying priority order...',
        duration: 3000
      });
      
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: 'Conflict Resolved',
          message: 'Rule conflicts have been resolved based on priority settings.',
          duration: 4000
        });
      }, 3000);
    }
  };

  return (
    <div className="px-8 py-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 font-sans">Anomaly Flags</h2>
        <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">View All</button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {anomalies.map((anomaly) => (
          <div key={anomaly.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${anomaly.iconColor} hover:scale-110 transition-transform duration-200`}>
                <anomaly.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 font-sans">{anomaly.title}</h3>
                <p className="text-sm text-gray-600 font-sans">{anomaly.description}</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700 font-sans">
              {anomaly.details}
            </div>
            <div className="mt-3 flex justify-between">
              {anomaly.actions.map((action, index) => (
                <button 
                  key={index}
                  onClick={() => handleAnomalyAction(anomaly.id, action.toLowerCase().replace(' ', '-'))}
                  className={`text-sm hover:underline hover:scale-105 transition-all duration-200 font-sans ${
                    index === 0 ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}