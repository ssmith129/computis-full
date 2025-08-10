import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Transaction } from '../../types/ai';
import { ConfidenceBadge } from '../ai/ConfidenceBadge';
import { AnomalyFlag } from '../ai/AnomalyFlag';

export function makeTransactionColumns({
  onAcceptSuggestion,
  onRejectSuggestion,
}: {
  onAcceptSuggestion: (id: string) => void | Promise<void>;
  onRejectSuggestion: (id: string) => void | Promise<void>;
}): ColumnDef<Transaction>[] {
  return [
    { accessorKey: 'date', header: 'Date', cell: ({ row }) => new Date(row.original.date).toLocaleDateString() },
    { accessorKey: 'description', header: 'Description' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amt = row.original.amount;
        return <span className="font-medium">{amt < 0 ? '-' : ''}${Math.abs(amt).toLocaleString()}</span>;
      },
    },
    {
      accessorKey: 'classification',
      header: 'Classification',
      cell: ({ row }) => {
        const t = row.original;
        return (
          <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${t.aiSuggested ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            {t.classification}
            {t.aiSuggested && <span className="ml-1" aria-hidden>🤖</span>}
          </span>
        );
      },
    },
    {
      id: 'aiStatus',
      header: 'AI Status',
      cell: ({ row }) => {
        const t = row.original;
        return (
          <div className="flex items-center gap-2">
            {t.confidence && <ConfidenceBadge confidence={t.confidence} percentage={t.confidencePercentage ?? 0} reasoning={t.aiReasoning} />}
            {t.anomalyFlagged && <AnomalyFlag severity={t.anomalySeverity ?? 'caution'} reason={t.anomalyReason ?? 'Anomaly detected'} timestamp={t.date} />}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const t = row.original;
        if (!(t.aiSuggested && t.confidence !== 'high')) return null;
        return (
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs rounded bg-green-600 text-white" onClick={() => onAcceptSuggestion(t.id)}>Accept</button>
            <button className="px-3 py-1 text-xs rounded bg-red-600 text-white" onClick={() => onRejectSuggestion(t.id)}>Reject</button>
          </div>
        );
      },
    },
  ];
}
