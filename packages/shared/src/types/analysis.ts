export interface AnalysisRequest {
  description: string;
  context?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  level: 'must' | 'should' | 'avoid';
}

export interface CodeSample {
  language: 'react' | 'html' | 'typescript';
  label: string;
  code: string;
}

export interface TestGuide {
  title: string;
  steps: string[];
  tools?: string[];
}

export interface AnalysisResponse {
  patterns: string[];
  checklist: {
    must: ChecklistItem[];
    should: ChecklistItem[];
    avoid: ChecklistItem[];
  };
  codeSamples: CodeSample[];
  tests: TestGuide[];
  questions: string[];
  references: string[];
}
