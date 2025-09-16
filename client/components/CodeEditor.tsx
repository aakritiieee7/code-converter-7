import React, { useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useTheme } from '../lib/themeContext'; 
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height: string;
  className?: string;
  readOnly?: boolean;
}

const CodeEditor = ({
  value,
  onChange,
  language,
  height,
  className,
  readOnly = false,
}: CodeEditorProps) => {
  const { theme } = useTheme();

  const getMonacoLanguage = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      'Python': 'python',
      'Java': 'java', 
      'JavaScript': 'javascript',
      'C#': 'csharp',
      'python': 'python',
      'java': 'java',
      'javascript': 'javascript',
      'typescript': 'typescript',
      'csharp': 'csharp',
      'js': 'javascript',
      'py': 'python',
      'cs': 'csharp',
      'ts': 'typescript'
    };
    return languageMap[lang] || 'plaintext';
  };

  return (
    <div className={className} style={{ height }}>
      <Editor
        height={height}
        language={getMonacoLanguage(language)}
        value={value}
        onChange={(value) => onChange(value || '')}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          readOnly,
          fontSize: 20,
          fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, "Courier New", monospace',
          minimap: { enabled: false },
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          tabSize: 4,
          insertSpaces: true,
          formatOnPaste: true,
          formatOnType: true,
          bracketPairColorization: { enabled: true },
          colorDecorators: true,
          semanticHighlighting: { enabled: true },
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showFunctions: true,
            showConstructors: true,
            showClasses: true,
            showModules: true,
          },
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true
          },
          parameterHints: {
            enabled: true,
            cycle: true
          },
          hover: {
            enabled: true,
            delay: 300
          },
          showUnused: true,
          showDeprecated: true,
          occurrencesHighlight: 'singleFile',
          selectionHighlight: true,
          codeLens: true,
          contextmenu: true,
        }}
        beforeMount={(monaco) => {
          monaco.editor.defineTheme('enhanced-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
              { token: 'string', foreground: 'CE9178' },
              { token: 'number', foreground: 'B5CEA8' },
              { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
              { token: 'type', foreground: '4EC9B0' },
              { token: 'function', foreground: 'DCDCAA' },
            ],
            colors: {
              'editor.background': '#1e1e1e',
              'editor.foreground': '#d4d4d4',
              'editorLineNumber.foreground': '#858585',
              'editor.selectionBackground': '#264f78',
              'editor.inactiveSelectionBackground': '#3a3d41',
            }
          });

          monaco.editor.defineTheme('enhanced-light', {
            base: 'vs',
            inherit: true,
            rules: [
              { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
              { token: 'string', foreground: 'A31515' },
              { token: 'number', foreground: '098658' },
              { token: 'comment', foreground: '008000', fontStyle: 'italic' },
              { token: 'type', foreground: '267F99' },
              { token: 'function', foreground: '795E26' },
            ],
            colors: {
              'editor.background': '#ffffff',
              'editor.foreground': '#000000',
            }
          });

          console.log('Monaco editor loaded with enhanced syntax highlighting');
        }}
        onMount={(editor, monaco) => {
          const currentTheme = theme === 'dark' ? 'enhanced-dark' : 'enhanced-light';
          monaco.editor.setTheme(currentTheme);

          const observer = new MutationObserver(() => {
            const newTheme = theme === 'dark' ? 'enhanced-dark' : 'enhanced-light';
            monaco.editor.setTheme(newTheme);
          });

          if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
              attributes: true,
              attributeFilter: ['class']
            });
          }

          return () => observer.disconnect();
        }}
      />
    </div>
  );
};

export default CodeEditor;
