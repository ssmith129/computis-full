import React, { useState } from 'react';
import type { ClassificationSuggestion } from '../../types/ai';
import { ConfidenceBadge } from './ConfidenceBadge';

export function AIClassificationPanel({
  suggestions,
  onAcceptSuggestion,
  onRejectSuggestion,
}:{ suggestions:ClassificationSuggestion[]; onAcceptSuggestion:(id:string, category:string)=>Promise<void>|void; onRejectSuggestion:(id:string)=>Promise<void>|void; }){
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggle = (id:string)=> setExpanded(prev=>{ const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">AI Classification Suggestions</h3>
        <p className="text-sm text-gray-600 mt-1">Review and approve AI-suggested transaction classifications</p>
      </div>
      <div className="divide-y divide-gray-100">
        {suggestions.map(s => (
          <div key={s.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <h4 className="font-medium text-gray-900">Suggested: {s.suggestedCategory}</h4>
                  <ConfidenceBadge confidence={s.confidence} percentage={s.confidencePercentage} reasoning={s.reasoning} />
                </div>
                <div className="text-sm text-gray-600 mb-3">Transaction ID: {s.transactionId}</div>
                <button onClick={()=>toggle(s.id)} className="text-sm text-blue-600 hover:text-blue-800 mb-3">
                  {expanded.has(s.id) ? '▼ Hide reasoning' : '▶ Show reasoning'}
                </button>
                {expanded.has(s.id) && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">AI Reasoning:</h5>
                    <p className="text-sm text-gray-700 mb-3 whitespace-pre-line">{s.reasoning}</p>
                    {!!s.alternativeSuggestions?.length && (
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Alternative Classifications:</h6>
                        <div className="flex flex-wrap gap-2">
                          {s.alternativeSuggestions.map((alt, i) => (
                            <button key={i} onClick={()=>onAcceptSuggestion(s.id, alt)}
                                    className="px-3 py-1 rounded text-xs bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                              {alt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="ml-4 flex items-center gap-3">
                <button onClick={()=>onAcceptSuggestion(s.id, s.suggestedCategory)}
                        className="px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition-colors">
                  Accept
                </button>
                <button onClick={()=>onRejectSuggestion(s.id)}
                        className="px-4 py-2 rounded-lg text-sm bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
