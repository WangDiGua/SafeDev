import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Search, Info, Terminal, Sparkles, X, Layout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../store/useAppStore';

export function RegexVisualizer() {
 const { t } = useTranslation();
 const theme = useAppStore(s => s.theme);
 const [pattern, setPattern] = useState('([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
 const [flags, setFlags] = useState('g');
 const [testText, setTestText] = useState('Contact us at support@safedev.io or admin@google.com for queries.');

 const { matches, error } = useMemo(() => {
 if (!pattern) return { matches: [], error: null };
 try {
 const regex = new RegExp(pattern, flags);
 const m = Array.from(testText.matchAll(regex));
 return { matches: m, error: null };
 } catch (e: any) {
 return { matches: [], error: e.message };
 }
 }, [pattern, flags, testText]);

 const toggleFlag = (flag: string) => {
 if (flags.includes(flag)) {
 setFlags(flags.replace(flag, ''));
 } else {
 setFlags(flags + flag);
 }
 };

 const renderedText = useMemo(() => {
 if (error || !pattern) return testText;
 try {
 const regex = new RegExp(pattern, flags);
 const parts = [];
 let lastIndex = 0;
 
 for (const match of matches) {
 const index = match.index!;
 parts.push(testText.slice(lastIndex, index));
 parts.push(
 <span key={index} className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 ring-1 ring-blue-500/50 rounded px-0.5 font-semibold transition-colors hover:bg-blue-200 dark:hover:bg-blue-800/60">
 {match[0]}
 </span>
 );
 lastIndex = index + match[0].length;
 }
 parts.push(testText.slice(lastIndex));
 return parts;
 } catch {
 return testText;
 }
 }, [testText, matches, error, pattern, flags]);

 return (
 <ToolLayout
 toolId="regex"
 title={t('regex.title')}
 shortDesc={t('regex.desc')}
 wikiContent={WIKI_CONTENT.regex}
 >
 <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
 <div className="xl:col-span-2 space-y-6">
 {/* Regex Input Card */}
 <div className="glass-card rounded-xl bg-white dark:bg-[#1C1C1E] p-6 space-y-6 border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="space-y-4">
 <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Regular Expression</label>
 <div className="flex flex-col md:flex-row gap-4">
 <div className="flex-1 relative flex items-center">
 <div className="absolute left-4 text-gray-500/40 font-mono text-xl font-medium">/</div>
 <input
 type="text"
 value={pattern}
 onChange={(e) => setPattern(e.target.value)}
 className={cn(
 "w-full bg-ios-bg-light dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark rounded-md pl-8 pr-4 py-3 font-mono text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all",
 error ? "border-red-500/50 bg-red-50 dark:bg-red-900/10 focus:border-red-500 focus:ring-red-500" : ""
 )}
 placeholder="[a-z]+"
 spellCheck={false}
 />
 <div className="absolute right-4 text-gray-500/40 font-mono text-xl font-medium">/</div>
 </div>
 
 <div className="flex items-center gap-1.5 p-1.5 bg-ios-bg-light dark:bg-[#2C2C2E] rounded-md border border-ios-border-light dark:border-ios-border-dark shrink-0">
 {['g', 'i', 'm', 's', 'u', 'y'].map(flag => (
 <button
 key={flag}
 onClick={() => toggleFlag(flag)}
 className={cn(
 "w-10 h-10 rounded-md font-mono font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50",
 flags.includes(flag) 
 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" 
 : "bg-white dark:bg-[#222] text-gray-500 hover:bg-gray-100 dark:hover:bg-[#333] border border-ios-border-light dark:border-ios-border-dark shadow-sm"
 )}
 >
 {flag}
 </button>
 ))}
 </div>
 </div>
 {error && <p className="text-sm font-medium text-red-500 flex items-center gap-2 mt-2"><X size={16} /> {error}</p>}
 </div>
 </div>

 <div className="glass-card rounded-xl overflow-hidden h-[400px] flex flex-col border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex items-center justify-between">
 <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t('regex.testString')}</span>
 </div>
 <div className="flex-1 min-h-0 bg-white dark:bg-[#1C1C1E] relative">
 <Editor
 height="100%"
 defaultLanguage="plaintext"
 value={testText}
 onChange={(val) => setTestText(val || '')}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 minimap: { enabled: false },
 fontSize: 14,
 wordWrap: 'on',
 scrollBeyondLastLine: false,
 fontFamily: 'var(--font-mono)'
 }}
 />
 </div>
 </div>

 {/* Visualization Card */}
 <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm min-h-[200px]">
 <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex items-center justify-between">
 <div className="flex items-center gap-2">
 <Layout size={16} className="text-gray-500 dark:text-gray-400" />
 <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Real-time Visualization</span>
 </div>
 </div>
 <div className="p-6 font-mono text-[15px] leading-relaxed dark:text-gray-300 break-words whitespace-pre-wrap selection:bg-blue-500/20">
 {renderedText}
 </div>
 </div>
 </div>

 {/* Sidebar: Match Info */}
 <div className="space-y-6">
 <div className="glass-card rounded-xl bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm p-6 flex flex-col h-[760px]">
 <div className="flex items-center gap-3 mb-6 shrink-0">
 <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
 <Sparkles size={20} />
 </div>
 <div>
 <h4 className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Analysis</h4>
 <p className="text-[15px] font-semibold">{matches.length} Matches Found</p>
 </div>
 </div>

 <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
 {matches.map((match, i) => (
 <div key={i} className="p-4 rounded-lg bg-ios-bg-light dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark">
 <div className="flex justify-between items-center mb-3">
 <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Match #{i+1}</span>
 <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">Idx: {match.index} – {match.index! + match[0].length}</span>
 </div>
 <div className="text-[13px] font-mono font-medium bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark p-2.5 rounded-md break-all">
 {match[0]}
 </div>
 {match.length > 1 && (
 <div className="space-y-2 mt-4 pt-4 border-t border-ios-border-light dark:border-ios-border-dark">
 {match.slice(1).map((group, gi) => (
 <div key={gi} className="flex justify-between items-start text-xs gap-3">
 <span className="text-gray-500 shrink-0 font-mono mt-0.5">[{gi + 1}]</span>
 <span className="font-mono text-blue-600 dark:text-blue-400 break-all">{group || 'null'}</span>
 </div>
 ))}
 </div>
 )}
 </div>
 ))}
 {matches.length === 0 && (
 <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-70">
 <Terminal size={40} strokeWidth={1.5} />
 <p className="text-xs font-semibold uppercase tracking-widest">No matching steps detected</p>
 </div>
 )}
 </div>
 </div>

 <div className="glass-card rounded-xl p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-4 shadow-sm">
 <Info className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
 <div className="space-y-1">
 <p className="text-[10px] font-bold uppercase text-blue-800 dark:text-blue-300 tracking-widest">Quick Tutorial</p>
 <p className="text-[13px] font-medium text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
 Use parentheses <code className="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded text-blue-800 dark:text-blue-400">( )</code> to define groups. These will be highlighted and extracted in the results sidebar.
 </p>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
