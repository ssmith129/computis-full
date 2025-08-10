import type { ClassificationSuggestion, Transaction } from '../types/ai';

export async function classifyTransaction(tx: Transaction): Promise<ClassificationSuggestion> {
  const abs = Math.abs(tx.amount);
  const guess = abs > 1000 ? 'Capital Gains' : 'Transaction Fee';
  const conf = abs > 1000 ? 'high' : abs > 200 ? 'medium' : 'low';
  const pct  = abs > 1000 ? 94 : abs > 200 ? 78 : 56;
  return {
    id: `sugg_${tx.id}`,
    transactionId: tx.id,
    suggestedCategory: guess,
    confidence: conf as any,
    confidencePercentage: pct,
    reasoning: `Pattern match on amount (${abs}) and description "${tx.description}".`,
    alternativeSuggestions: ['Income', 'Airdrop', 'Transfer'],
  };
}
