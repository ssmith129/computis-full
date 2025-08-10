import React from 'react';
import type { AnomalySeverity } from '../../types/ai';
import { InlineExplainer } from './InlineExplainer';

export function AnomalyFlag({severity, reason, timestamp}:{severity:AnomalySeverity; reason:string; timestamp?:string;}){
  const cfg = {
    critical:{ bg:'bg-red-50', text:'text-red-800', border:'border-red-200', icon:'⚠', label:'Critical' },
    caution: { bg:'bg-yellow-50', text:'text-yellow-800', border:'border-yellow-200', icon:'⚡', label:'Caution' },
    resolved:{ bg:'bg-gray-50', text:'text-gray-600', border:'border-gray-200', icon:'✓', label:'Resolved' },
  }[severity];
  return (
    <div className="inline-flex items-center">
      <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
        <span aria-hidden className="mr-1">{cfg.icon}</span>{cfg.label}
      </div>
      <InlineExplainer label="Details">
        <div className={`font-semibold mb-1 ${cfg.text}`}>{cfg.label} anomaly detected</div>
        <div className="text-gray-700 mb-2">{reason}</div>
        {timestamp && <div className="text-xs text-gray-500">Detected: {new Date(timestamp).toLocaleString()}</div>}
      </InlineExplainer>
    </div>
  );
}
