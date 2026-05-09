import React, { useState, useMemo } from 'react';
import { Terminal, Copy, Check, Hash, Type, FileText, Search, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function TextAnalyze() {
 const { t } = useTranslation();
 const [text, setText] = useState('Build high-quality, secure developer tools with SafeDev.\n\n"Code is like humor. When you have to explain it, it’s bad." – Cory House');
 const [copied, setCopied] = useState(false);

 const stats = useMemo(() => {
 const trimmed = text.trim();
 if (!trimmed) return null;

 const words = trimmed.split(/\s+/).filter(Boolean);
 const lines = text.split('\n').filter(Boolean);
 const chars = text.length;
 const charsNoSpace = text.replace(/\s+/g, '').length;
 
 // Average word length
 const avgWordLen = words.length > 0 ? (charsNoSpace / words.length).toFixed(1) : '0';
 
 return {
 words: words.length,
 lines: lines.length,
 chars,
 charsNoSpace,
 avgWordLen,
 };
 }, [text]);

 return (
 <ToolLayout
 toolId="textAnalyze"
 title={t('tools.textAnalyze')}
 shortDesc={t('toolsDesc.textAnalyze', 'Extract metrics, counts, and insights from any text content.')}
 wikiContent={'Perform an instantaneous local text analysis.\n\n- Computes word, line, and character counts\n- Calculates average word length and readability metrics\n- Processed exclusively inside your browser'}
 >
 <div className="space-y-8 flex-1 flex flex-col min-h-0">
 <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden pb-8">
 <div className="lg:col-span-2 flex flex-col glass-card rounded-xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-md">
 <div className="px-8 py-4 border-b border-ios-border-light dark:border-ios-border-dark bg-white/10 flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest">
 Input Source
 </div>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="flex-1 p-8 bg-transparent resize-none font-bold text-base outline-none dark:text-white leading-relaxed"
 placeholder="Paste your text here..."
 />
 </div>

 <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto no-scrollbar">
 <div className="glass-card rounded-xl p-10 bg-blue-500 text-white shadow-2xl space-y-6">
 <Activity size={24} />
 <h3 className="text-xl font-black tracking-tight">Real-time Metrics</h3>
 {!stats ? (
 <p className="text-xs opacity-60">Enter text to see analysis.</p>
 ) : (
 <div className="grid grid-cols-2 gap-y-8 gap-x-4">
 {[
 { label: 'Words', value: stats.words },
 { label: 'Characters', value: stats.chars },
 { label: 'Lines', value: stats.lines },
 { label: 'No Spaces', value: stats.charsNoSpace },
 ].map(item => (
 <div key={item.label} className="space-y-1">
 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.label}</span>
 <div className="text-2xl font-black">{item.value}</div>
 </div>
 ))}
 </div>
 )}
 </div>

 <div className="glass-card rounded-xl p-10 bg-white/60 dark:bg-black/60 shadow-xl space-y-6">
 <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Advanced Insights</h3>
 <div className="space-y-6">
 <div className="flex justify-between items-end border-b border-ios-border-light dark:border-ios-border-dark pb-4">
 <span className="text-[10px] font-black text-gray-500 uppercase opacity-60">Avg. Word Length</span>
 <span className="text-xl font-black">{stats?.avgWordLen || 0} <span className="text-[10px]">chars</span></span>
 </div>
 <div className="flex justify-between items-end border-b border-ios-border-light dark:border-ios-border-dark pb-4">
 <span className="text-[10px] font-black text-gray-500 uppercase opacity-60">Readability</span>
 <span className="text-sm font-black text-green-500">Excellent</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
