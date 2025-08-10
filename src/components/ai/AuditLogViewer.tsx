import React, { useMemo, useState } from 'react';
import type { AuditLogEntry, AuditEventType } from '../../types/ai';

const LABELS: Record<AuditEventType, string> = {
  AI_FLAG_TRIGGERED: 'AI Flag',
  AI_CLASSIFICATION_ACCEPTED: 'AI Accepted',
  AI_CLASSIFICATION_REJECTED: 'AI Rejected',
  USER_OVERRIDE: 'User Override',
  ANOMALY_RESOLVED: 'Anomaly Resolved',
  CONFIDENCE_UPDATED: 'Confidence Updated',
};

const COLORS: Record<AuditEventType, string> = {
  AI_FLAG_TRIGGERED: 'bg-red-100 text-red-800',
  AI_CLASSIFICATION_ACCEPTED: 'bg-green-100 text-green-800',
  AI_CLASSIFICATION_REJECTED: 'bg-yellow-100 text-yellow-800',
  USER_OVERRIDE: 'bg-blue-100 text-blue-800',
  ANOMALY_RESOLVED: 'bg-purple-100 text-purple-800',
  CONFIDENCE_UPDATED: 'bg-gray-100 text-gray-800',
};

export function AuditLogViewer({ logs, onLoadMore, hasMore }:{ logs:AuditLogEntry[]; onLoadMore?:()=>void; hasMore?:boolean; }){
  const [filter, setFilter] = useState<'all'|AuditEventType>('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(()=> logs.filter(l=>{
    const pass = filter === 'all' || l.eventType === filter;
    const text = (l.description + ' ' + (l.transactionId ?? '')).toLowerCase();
    return pass && (!q || text.includes(q.toLowerCase()));
  }), [logs, filter, q]);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">AI Activity Audit Log</h3>
        <div className="mt-4 flex items-center gap-4">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search logs..." className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <select value={filter} onChange={(e)=>setFilter(e.target.value as any)} className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Events</option>
            {Object.entries(LABELS).map(([k,v])=> <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>
      <div className="max-h-96 divide-y divide-gray-100 overflow-y-auto">
        {filtered.map(l=> (
          <div key={l.id} className="px-6 py-4">
            <div className="mb-2 flex items-center gap-3">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${COLORS[l.eventType]}`}>{LABELS[l.eventType]}</span>
              <span className="text-sm text-gray-500">{new Date(l.timestamp).toLocaleString()}</span>
            </div>
            <p className="mb-1 text-sm text-gray-900">{l.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>User: {l.userId}</span>
              <span>Transaction: {l.transactionId ?? '—'}</span>
            </div>
            {!!Object.keys(l.metadata).length && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-blue-600 hover:text-blue-800">Show metadata</summary>
                <pre className="mt-2 overflow-x-auto rounded bg-gray-50 p-2 text-xs text-gray-600">{JSON.stringify(l.metadata,null,2)}</pre>
              </details>
            )}
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="border-t border-gray-200 px-6 py-4 text-center">
          <button onClick={onLoadMore} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Load More Entries</button>
        </div>
      )}
    </div>
  );
}
