import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import yaml from 'js-yaml';
import Papa from 'papaparse';
import { RefreshCw, Copy, Check, ArrowRightLeft, FileCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToolLayout } from './ToolLayout';

type Format = 'json' | 'yaml' | 'csv';

export function JsonConverter() {
 const { t } = useTranslation();
 const [input, setInput] = useState('');
 const [output, setOutput] = useState('');
 const [fromFormat, setFromFormat] = useState<Format>('json');
 const [toFormat, setToFormat] = useState<Format>('yaml');
 const [copied, setCopied] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleConvert = () => {
 if (!input) {
 setOutput('');
 return;
 }
 setError(null);
 try {
 let parsed: any;
 if (fromFormat === 'json') {
 parsed = JSON.parse(input);
 } else if (fromFormat === 'yaml') {
 parsed = yaml.load(input);
 } else if (fromFormat === 'csv') {
 const result = Papa.parse(input, { header: true });
 parsed = result.data;
 }

 let result = '';
 if (toFormat === 'json') {
 result = JSON.stringify(parsed, null, 2);
 } else if (toFormat === 'yaml') {
 result = yaml.dump(parsed);
 } else if (toFormat === 'csv') {
 result = Papa.unparse(parsed);
 }
 setOutput(result);
 } catch (e: any) {
 setError(e.message);
 setOutput('');
 }
 };

 useEffect(() => {
 handleConvert();
 }, [input, fromFormat, toFormat]);

 const handleCopy = () => {
 navigator.clipboard.writeText(output); toast.success('Copied to clipboard');
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="converter"
 title={t('tools.converter')}
 shortDesc={t('toolsDesc.converter')}
 wikiContent={'Convert gracefully between JSON, YAML, and CSV formats.\n\nEverything happens synchronously in the browser. No data is stored or transmitted.'}
 >
 <div className="space-y-8 flex-1 flex flex-col min-h-0">
 <div className="glass-card rounded-xl p-6 flex items-center justify-center gap-12 bg-white/40 dark:bg-black/40 backdrop-blur-md">
 <div className="flex flex-col gap-2 w-48">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">{t('common.input')}</span>
 <div className="flex p-1 rounded-2xl bg-gray-50/50 dark:bg-[#2C2C2E]/50 border border-ios-border-light dark:border-ios-border-dark">
 {(['json', 'yaml', 'csv'] as Format[]).map(f => (
 <button
 key={f}
 onClick={() => setFromFormat(f)}
 className={cn(
 "flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all",
 fromFormat === f ? "bg-blue-500 text-white shadow-sm" : "text-gray-500 hover:bg-blue-500/5"
 )}
 >
 {f}
 </button>
 ))}
 </div>
 </div>

 <div className="bg-blue-500/10 p-3 rounded-2xl">
 <ArrowRightLeft className="text-blue-500" size={24} />
 </div>

 <div className="flex flex-col gap-2 w-48">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">{t('converter.to')}</span>
 <div className="flex p-1 rounded-2xl bg-gray-50/50 dark:bg-[#2C2C2E]/50 border border-ios-border-light dark:border-ios-border-dark">
 {(['json', 'yaml', 'csv'] as Format[]).map(f => (
 <button
 key={f}
 onClick={() => setToFormat(f)}
 className={cn(
 "flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all",
 toFormat === f ? "bg-blue-500 text-white shadow-sm" : "text-gray-500 hover:bg-blue-500/5"
 )}
 >
 {f}
 </button>
 ))}
 </div>
 </div>
 </div>

 <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden min-h-0 pb-8 min-h-[400px]">
 <div className="flex flex-col glass-card rounded-xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-md">
 <div className="px-6 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-white/10 flex justify-between items-center">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{fromFormat.toUpperCase()} {t('common.input')}</span>
 {error && <span className="text-[10px] text-red-500 font-black tracking-tight">{error}</span>}
 </div>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 className="flex-1 p-6 bg-transparent resize-none font-mono text-xs outline-none placeholder:text-gray-500/40 dark:text-white"
 placeholder={t('json.placeholder')}
 />
 </div>

 <div className="flex flex-col glass-card rounded-xl overflow-hidden bg-black shadow-2xl relative">
 <div className="px-6 py-3 border-b border-white/5 bg-white/5 flex justify-between items-center z-10 relative">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{toFormat.toUpperCase()} {t('common.output')}</span>
 <button onClick={handleCopy} disabled={!output} className="text-gray-500 hover:text-blue-500 transition-colors">
 {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
 </button>
 </div>
 <div className="flex-1 overflow-auto relative">
 {output ? (
 <SyntaxHighlighter
 language={toFormat === 'json' ? 'json' : toFormat === 'yaml' ? 'yaml' : 'markdown'}
 style={atomDark}
 customStyle={{ background: 'transparent', padding: '1.5rem', fontSize: '13px', lineHeight: '1.6', margin: 0 }}
 >
 {output}
 </SyntaxHighlighter>
 ) : (
 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500/20">
 <FileCode size={48} className="mb-4" />
 <span className="text-xs font-black uppercase tracking-widest italic">{t('common.output')}</span>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
