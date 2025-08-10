import React from 'react';
import type { ConfidenceLevel } from '../../types/ai';
import { InlineExplainer } from './InlineExplainer';

export function ConfidenceBadge({confidence, percentage, reasoning}:{confidence:ConfidenceLevel; percentage:number; reasoning?:string;}){
  const cfg = {
    high:   { bg:'bg-green-100',  text:'text-green-800',  border:'border-green-200',  icon:'✓', label:'High' },
    medium: { bg:'bg-yellow-100', text:'text-yellow-800', border:'border-yellow-200', icon:'?', label:'Medium' },
    low:    { bg:'bg-red-100',    text:'text-red-800',    border:'border-red-200',    icon:'!', label:'Low' },
  }[confidence];
  const badge = (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span aria-hidden className="mr-1">{cfg.icon}</span>
      AI {cfg.label} · {Math.round(percentage)}%
    </div>
  );
  return reasoning ? (
    <div className="inline-flex items-center">
      {badge}
      <InlineExplainer label="Why?">
        <div className="font-medium text-gray-900 mb-1">AI Confidence: {Math.round(percentage)}%</div>
        <div>{reasoning}</div>
      </InlineExplainer>
    </div>
  ) : badge;
}
