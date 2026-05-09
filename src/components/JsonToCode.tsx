import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { FileJson, Copy, Check, Code, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';
import Editor from '@monaco-editor/react';
import { ToolLayout } from './ToolLayout';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';

const LANGUAGES = ['typescript', 'go', 'rust', 'python', 'java', 'swift', 'csharp', 'ruby', 'cpp'];

export function JsonToCode() {
  const { t } = useTranslation();
  const theme = useAppStore(s => s.theme);
  const [json, setJson] = useState('{\n  "id": 1,\n  "name": "Leanne Graham",\n  "username": "Bret",\n  "email": "Sincere@april.biz"\n}');
  const [rootName, setRootName] = useState('User');
  const [targetLang, setTargetLang] = useState('typescript');
  const [output, setOutput] = useState(t('jsonToCodeParams.generating'));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    async function generate() {
      try {
        if (!json.trim()) {
           setOutput(t('jsonToCodeParams.provideValid'));
           return;
        }
        
        // basic test
        JSON.parse(json);

        const jsonInput = jsonInputForTargetLanguage(targetLang as any);
        await jsonInput.addSource({
          name: rootName || 'Root',
          samples: [json],
        });

        const inputData = new InputData();
        inputData.addInput(jsonInput);

        const res = await quicktype({
          inputData,
          lang: targetLang as any,
          rendererOptions: {
             "just-types": "true",
          }
        });
        
        if (active) {
           setOutput(res.lines.join('\n'));
        }
      } catch (e: any) {
        if (active) setOutput(`${t('jsonToCodeParams.schemaError')} ${e.message}`);
      }
    }

    generate();
    return () => { active = false; };
  }, [json, rootName, targetLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output); toast.success('Copied to clipboard');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="json-to-code"
      title={t('tools.jsonToCode')}
      shortDesc={t('toolsDesc.jsonToCode')}
      wikiContent={'Generate production-ready types and interfaces from arbitrary JSON. Uses `quicktype-core` for robust AST-based type inference.\n\nFeatures:\n- 10+ target languages (TypeScript, Go, Rust, etc.)\n- Automatic array flattening\n- Type unification'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Input */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-ios-border-light dark:border-ios-border-dark shadow-sm">
          <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileJson size={16} className="text-ios-blue" />
              <span className="text-xs font-semibold uppercase tracking-widest text-ios-muted-light dark:text-ios-muted-dark">{t('jsonToCodeParams.sourceJson')}</span>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={rootName} 
                onChange={(e) => setRootName(e.target.value)} 
                className="bg-white dark:bg-black border border-ios-border-light dark:border-ios-border-dark rounded px-2 py-1 text-xs outline-none w-24"
                placeholder={t('jsonToCodeParams.rootName')}
              />
            </div>
          </div>
          <div className="flex-1 relative">
             <Editor
                height="100%"
                defaultLanguage="json"
                value={json}
                onChange={(val) => setJson(val || '')}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  fontFamily: 'var(--font-mono)'
                }}
             />
          </div>
        </div>

        {/* Output */}
        <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-ios-border-light dark:border-ios-border-dark shadow-sm">
          <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="pl-2 pr-8 py-1 rounded bg-white dark:bg-black border border-ios-border-light dark:border-ios-border-dark text-xs font-semibold outline-none text-ios-text-light dark:text-ios-text-dark form-select"
              >
                 {LANGUAGES.map(l => (
                   <option key={l} value={l}>{l.toUpperCase()}</option>
                 ))}
              </select>
            </div>
            <button onClick={handleCopy} className="text-ios-blue hover:text-blue-700 transition-colors p-1.5 flex items-center justify-center">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="flex-1 relative">
             <Editor
                height="100%"
                language={targetLang === 'csharp' ? 'csharp' : targetLang === 'cpp' ? 'cpp' : targetLang}
                value={output}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  fontFamily: 'var(--font-mono)'
                }}
             />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
