export interface ErrorAnalysis {
    category: string;
    rootCause: string;
    explanation: string;
    fixSuggestion: string | string[];
    prevention: string | string[];
    severity: string;
  }