export interface RetrieverMetric {
  rank: number;
  accuracy: string;
  accuracyVal: number;
  tokens: string;
  tokensVal: number;
  latency: string;
  coverage: string;
  coverageVal: number;
  score: string;
  savings: number;
}

export const retrieverData: Record<string, RetrieverMetric> = {
  treesitter: {
    rank: 1,
    accuracy: '22.3%',
    accuracyVal: 22.3,
    tokens: '685',
    tokensVal: 685,
    latency: '120ms',
    coverage: '71.7%',
    coverageVal: 71.7,
    score: '35.85',
    savings: 0.459
  },
  auto: {
    rank: 2,
    accuracy: '16.0%',
    accuracyVal: 16.0,
    tokens: '1,092',
    tokensVal: 1092,
    latency: '412ms',
    coverage: '84.8%',
    coverageVal: 84.8,
    score: '30.60',
    savings: 0.284
  },
  architecture: {
    rank: 3,
    accuracy: '11.7%',
    accuracyVal: 11.7,
    tokens: '1,219',
    tokensVal: 1219,
    latency: '57ms',
    coverage: '61.4%',
    coverageVal: 61.4,
    score: '26.18',
    savings: 0.221
  },
  grep: {
    rank: 4,
    accuracy: '7.0%',
    accuracyVal: 7.0,
    tokens: '1,704',
    tokensVal: 1704,
    latency: '966ms',
    coverage: '61.4%',
    coverageVal: 61.4,
    score: '18.15',
    savings: 0.05
  },
  flowgraph: {
    rank: 5,
    accuracy: '0.0%',
    accuracyVal: 0.0,
    tokens: '58',
    tokensVal: 58,
    latency: '35ms',
    coverage: '40.0%',
    coverageVal: 40.0,
    score: '15.75',
    savings: 0.12
  },
  fts: {
    rank: 6,
    accuracy: '5.4%',
    accuracyVal: 5.4,
    tokens: '656',
    tokensVal: 656,
    latency: '116ms',
    coverage: '46.2%',
    coverageVal: 46.2,
    score: '13.49',
    savings: 0.08
  },
  reference: {
    rank: 7,
    accuracy: '0.0%',
    accuracyVal: 0.0,
    tokens: '208',
    tokensVal: 208,
    latency: '42ms',
    coverage: '40.0%',
    coverageVal: 40.0,
    score: '11.73',
    savings: 0.07
  },
  naive: {
    rank: 8,
    accuracy: '8.6%',
    accuracyVal: 8.6,
    tokens: '1,744',
    tokensVal: 1744,
    latency: '0ms',
    coverage: '28.6%',
    coverageVal: 28.6,
    score: '10.63',
    savings: 0.0
  },
  callgraph: {
    rank: 9,
    accuracy: '0.0%',
    accuracyVal: 0.0,
    tokens: '299',
    tokensVal: 299,
    latency: '37ms',
    coverage: '40.0%',
    coverageVal: 40.0,
    score: '9.93',
    savings: 0.05
  }
};
