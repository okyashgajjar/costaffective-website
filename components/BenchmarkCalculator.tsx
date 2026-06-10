'use client';

import { useState } from 'react';
import { retrieverData } from '@/data/retrievers';

export default function BenchmarkCalculator() {
  const [activeRetriever, setActiveRetriever] = useState('treesitter');
  const [queries, setQueries] = useState(100);

  const selected = retrieverData[activeRetriever] || retrieverData.treesitter;

  // Assuming average daily context size of 25,000 tokens per search on standard LLMs
  // Input tokens pricing: $3.00 per million tokens ($0.000003 per token)
  const baseTokensPerQuery = 25000;
  const standardCost = queries * baseTokensPerQuery * 0.000003;
  const savingsRate = selected.savings;
  const dailySaved = standardCost * savingsRate;
  const monthlySaved = dailySaved * 30;

  return (
    <div className="simulator-layout">
      {/* Retriever Selection Panel */}
      <div className="retriever-list-card">
        <h3>Retrieval Strategies</h3>
        <div className="retriever-items">
          {Object.entries(retrieverData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveRetriever(key)}
              className={`retriever-btn ${activeRetriever === key ? 'active' : ''}`}
            >
              <span className="r-name">{key}</span>
              <span className="r-score">Score: {value.score}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scorecard & Calculator Display */}
      <div className="scorecard-container">
        <div className="scorecard-header">
          <div>
            <h3 className="font-serif font-bold text-2xl flex items-center gap-2">
              {activeRetriever}
              <span className={`scorecard-tag ${selected.rank === 1 ? 'active text-primary' : ''}`}>
                Rank #{selected.rank}
              </span>
            </h3>
            <span className="text-xs text-grey">Evaluation Index Performance</span>
          </div>
          <div className="research-score-badge">
            <span className="score-val">{selected.score}</span>
            <span className="score-lbl">Quality Score</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="m-label">Retriever Accuracy</span>
            <div className="m-value-container">
              <span className="m-value">{selected.accuracy}</span>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar" 
                  style={{ width: `${selected.accuracyVal * 4}%` }} 
                />
              </div>
            </div>
          </div>
          <div className="metric-item">
            <span className="m-label">Avg Token Payload</span>
            <div className="m-value-container">
              <span className="m-value">{selected.tokens} <span className="text-xs font-normal text-grey">tokens</span></span>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar bg-blue-500" 
                  style={{ width: `${Math.min((selected.tokensVal / 2000) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </div>
          <div className="metric-item">
            <span className="m-label">Search Latency</span>
            <span className="m-value">{selected.latency}</span>
          </div>
          <div className="metric-item">
            <span className="m-label">Context Coverage</span>
            <span className="m-value">{selected.coverage}</span>
          </div>
        </div>

        {/* Cost Savings Calculator */}
        <div className="calculator-box">
          <h4 className="font-bold text-charcoal">Prompt Cost Calculator</h4>
          <p className="calc-sub text-grey">Select daily query volume to project developer expenses.</p>

          <div className="slider-group">
            <label>
              Daily Queries: <span>{queries} / day</span>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              value={queries}
              onChange={(e) => setQueries(parseInt(e.target.value))}
            />
          </div>

          <div className="savings-summary">
            <div className="summary-card cost-card">
              <span className="summary-lbl">Est. Standard Cost</span>
              <span className="summary-val text-red-700">${standardCost.toFixed(2)} <span className="text-xs font-normal">/ day</span></span>
            </div>
            <div className="summary-card savings-card">
              <span className="summary-lbl">Projected Savings</span>
              <span className="summary-val text-green-700">
                ${dailySaved.toFixed(2)} <span className="text-xs font-normal">({(selected.savings * 100).toFixed(0)}% Saved)</span>
              </span>
            </div>
          </div>

          <div className="text-right text-xs font-medium text-green-600 mt-2">
            ≈ ${monthlySaved.toFixed(2)} monthly savings converted back to coffee! ☕
          </div>
        </div>
      </div>
    </div>
  );
}
