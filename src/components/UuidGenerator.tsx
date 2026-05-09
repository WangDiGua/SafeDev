import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { ulid } from 'ulid';
import { Binary, Copy, Check, RefreshCw, Hash, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';

type UUIDType = 'v4' | 'v1' | 'ulid';

export function UuidGenerator() {
  const { t } = useTranslation();
  const [count, setCount] = useState(10);
  const [type, setType] = useState<UUIDType>('v4');
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newResults = [];
    for (let i = 0; i < count; i++) {
      if (type === 'v4') newResults.push(uuidv4());
      else if (type === 'v1') newResults.push(uuidv1());
      else newResults.push(ulid());
    }
    setResults(newResults);
  };

  useEffect(() => {
    generate();
  }, [type, count]);

  const handleCopy = () => {
    navigator.clipboard.writeText(results.join('\n')); toast.success('Copied to clipboard');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="uuid"
      title={t('tools.uuid')}
      shortDesc="Generate collision-resistant identifiers locally."
      wikiContent={'A robust offline generator for UUIDs (v1, v4) and ULIDs.\n\n- **UUID v4**: Random generation, standard for databases\n- **UUID v1**: Time-based generation derived from MAC address and precise time\n- **ULID**: Universally Unique Lexicographically Sortable Identifier - useful when you need UUID uniqueness but want alphabetical sorting by creation time.'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-xl p-6 bg-white dark:bg-[#1C1C1E] shadow-sm border border-ios-border-light dark:border-ios-border-dark space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('uuidParams.algorithm')}</span>
              <div className="flex flex-col gap-2">
                {(['v4', 'v1', 'ulid'] as UUIDType[]).map(typeKey => (
                  <button
                    key={typeKey}
                    onClick={() => setType(typeKey)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all border",
                      type === typeKey 
                        ? "bg-blue-50 dark:bg-blue-900/20 text-ios-blue border-ios-blue shadow-sm shadow-blue-500/10" 
                        : "bg-white dark:bg-[#2C2C2E] border-ios-border-light dark:border-ios-border-dark text-ios-muted-light dark:text-ios-muted-dark hover:border-ios-border-dark"
                    )}
                  >
                    {typeKey === 'v4' ? t('uuidParams.uuidv4') : typeKey === 'v1' ? t('uuidParams.uuidv1') : t('uuidParams.ulid')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('uuidParams.batchSize')}: {count}</span>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-[#3C3C3E] rounded-full appearance-none cursor-pointer accent-ios-blue"
              />
            </div>

            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-xs font-semibold text-ios-green leading-relaxed">
              <Binary className="mb-2" size={16} />
              {t('uuidParams.proTip')}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 glass-card rounded-xl shadow-sm border border-ios-border-light dark:border-ios-border-dark flex flex-col min-h-[500px]">
          <div className="px-6 py-4 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex justify-between items-center">
            <span className="text-xs font-semibold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest">{t('uuidParams.resultPool')}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-ios-blue uppercase tracking-widest mr-2">{results.length} {t('uuidParams.generated')}</span>
              <button onClick={generate} className="p-1.5 text-ios-muted-light dark:text-ios-muted-dark hover:text-black dark:hover:text-white transition-colors" title="Regenerate">
                <RefreshCw size={18} />
              </button>
              <button onClick={handleCopy} className="p-1.5 text-ios-muted-light dark:text-ios-muted-dark hover:text-ios-blue transition-colors" title="Copy All">
                {copied ? <Check size={18} className="text-ios-green" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 font-mono text-[13px] space-y-2 select-all selection:bg-ios-blue/20">
            {results.map((sid, i) => (
              <div key={i} className="flex gap-4 items-center group bg-gray-50/50 dark:bg-[#1C1C1E] p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(sid); toast.success('Copied single id');
              }}>
                <span className="text-ios-muted-light dark:text-ios-muted-dark opacity-50 w-6 text-right text-[10px]">{i + 1}</span>
                <span className="text-ios-text-light dark:text-ios-text-dark font-medium transition-colors group-hover:text-ios-blue">{sid}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
