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
        loading={
          <div className={`h-full w-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}>
            <p className={theme === 'dark' ? 'text-white' : 'text-black'}>Loading Editor...</p>
          </div>
        }
        options={{
          readOnly: readOnly,
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          tabSize: 2,
          insertSpaces: true,
        }}
      />
    </div>
  );
}
