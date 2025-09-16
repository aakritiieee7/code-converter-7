import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Button from './ui/button';

interface AnalysisPanelProps {
  analysis: string[];
  loading?: boolean;
  onCopyAnalysis?: () => void;
}

export default function AnalysisPanel({ analysis, loading, onCopyAnalysis }: AnalysisPanelProps) {
  const categorized = React.useMemo(() => {
    const result = { errors: [] as string[], warnings: [] as string[], suggestions: [] as string[], successes: [] as string[] };
    if (!analysis) return result; 
    analysis.forEach(item => {
      if (item.startsWith('❌') || /Error:/i.test(item)) result.errors.push(item);
      else if (item.startsWith('⚠️')) result.warnings.push(item);
      else if (item.startsWith('💡')) result.suggestions.push(item);
      else result.successes.push(item);
    });
    return result;
  }, [analysis]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
            <span className="text-white/70">Analyzing code...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const copyText = () => {
    const text = (analysis || []).join('\n');
    if (text) {
        navigator.clipboard.writeText(text);
        onCopyAnalysis?.();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Analysis</CardTitle>
          <Button size="sm" variant="outline" onClick={copyText}>Copy</Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-white/80 font-medium">Errors & Warnings</h4>
              <div className="max-h-48 overflow-auto space-y-2 text-sm">
                {categorized.errors.length === 0 && categorized.warnings.length === 0 ? (
                  <p className="text-white/60">No errors detected.</p>
                ) : (
                  <>
                    {categorized.errors.map((item, idx) => (
                      <div key={`e-${idx}`} className="flex items-start gap-2"><span>❌</span><span>{item.replace(/^❌\s*/, '')}</span></div>
                    ))}
                    {categorized.warnings.map((item, idx) => (
                      <div key={`w-${idx}`} className="flex items-start gap-2"><span>⚠️</span><span>{item.replace(/^⚠️\s*/, '')}</span></div>
                    ))}
                  </>
                )}
              </div>
              <h4 className="text-white/80 font-medium">Fixes & Suggestions</h4>
              <div className="max-h-48 overflow-auto space-y-2 text-sm">
                {categorized.suggestions.length === 0 && categorized.successes.length === 0 ? (
                  <p className="text-white/60">No suggestions yet.</p>
                ) : (
                  <>
                    {categorized.successes.map((item, idx) => (
                      <div key={`s-${idx}`} className="flex items-start gap-2"><span>✅</span><span>{item.replace(/^✅\s*/, '')}</span></div>
                    ))}
                    {categorized.suggestions.map((item, idx) => (
                      <div key={`i-${idx}`} className="flex items-start gap-2"><span>💡</span><span>{item.replace(/^💡\s*/, '')}</span></div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
