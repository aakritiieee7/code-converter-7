import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { useTheme } from '../lib/themeContext';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ language, value, onChange, readOnly = false }: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="border border-brand-dark/20 dark:border-white/20 rounded-lg overflow-hidden h-full">
      <Editor
        height="100%"
        language={language.toLowerCase()}
        value={value}
        onChange={(val) => {
          if (onChange) {
            onChange(val || '');
          }
        }}
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          readOnly: readOnly,
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          bracketPairColorization: { enabled: true },
          colorDecorators: true,
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showWords: true,
          },
          occurrencesHighlight: 'multiFile',
          selectionHighlight: true,
          codeLens: true,
          contextmenu: true,
        }}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme('enhanced-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
              'editor.background': '#0D001F',
              'editor.foreground': '#E0E0E0',
            }
          });
          monaco.editor.defineTheme('enhanced-light', {
            base: 'vs',
            inherit: true,
            rules: [],
            colors: {
              'editor.background': '#ffffff',
              'editor.foreground': '#000000',
            }
          });
        }}
        onMount={(editor, monaco) => {
          const currentTheme = theme === 'dark' ? 'enhanced-dark' : 'enhanced-light';
          monaco.editor.setTheme(currentTheme);
          editor.updateOptions({
            semanticHighlighting: {
              enabled: true,
            },
          });
        }}
      />
    </div>
  );
}
