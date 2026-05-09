import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { 
 Binary, FileCode, Hash, Activity, 
 ChevronRight, Download, Upload, Copy, 
 Check, Info, BarChart3, Database
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function BinaryLab() {
 const { t } = useTranslation();
 const [input, setInput] = useState('SafeDev High Performance Tooling');
 const [isCopied, setIsCopied] = useState(false);

 const bytes = useMemo(() => new TextEncoder().encode(input), [input]);
 
 const hexView = useMemo(() => {
 return Array.from(bytes).map(b => b.toString(16).padStart(2, '0').toUpperCase());
 }, [bytes]);

 const entropy = useMemo(() => {
 if (bytes.length === 0) return 0;
 const freqs: Record<number, number> = {};
 for (const b of bytes) freqs[b] = (freqs[b] || 0) + 1;
 return Object.values(freqs).reduce((acc, f) => {
 const p = f / bytes.length;
 return acc - p * Math.log2(p);
 }, 0);
 }, [bytes]);

 const handleCopy = () => {
 navigator.clipboard.writeText(hexView.join(' '));
 setIsCopied(true);
    toast.success('Copied to clipboard');
 setTimeout(() => setIsCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="binary"
 title={t('tools.binary')}
 shortDesc={t('toolsDesc.binary')}
 wikiContent={WIKI_CONTENT.json} // Re-use until specific wiki exists
 >
 <div className="space-y-12">
 <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
 <div className="space-y-4">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest">
 <Activity size={12} className="animate-pulse" />
 {t('common.toolsDesc.binary', 'Real-time Analysis')}
 </div>
 <h2 className="text-5xl font-black tracking-tighter dark:text-white">{t('binary.title', 'Hex & Entropy')}</h2>
 </div>
 
 <div className="flex items-center gap-6">
 <div className="p-6 bg-blue-500/5 rounded-[2rem] border border-blue-500/10 space-y-1">
 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('binary.entropy', 'Entropy')}</p>
 <p className="text-2xl font-black text-blue-500 tabular-nums">{entropy.toFixed(4)} <span className="text-[10px] opacity-40">bits</span></p>
 </div>
 <div className="p-6 bg-green-500/5 rounded-[2rem] border border-green-500/10 space-y-1">
 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('binary.payload', 'Payload')}</p>
 <p className="text-2xl font-black text-green-500 tabular-nums">{bytes.length} <span className="text-[10px] opacity-40">bytes</span></p>
 </div>
 </div>
 </header>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 {/* Input Interface */}
 <div className="lg:col-span-4 space-y-8">
 <div className="glass-card rounded-xl p-8 space-y-6">
 <div className="flex items-center gap-3">
 <Database size={18} className="text-blue-500" />
 <h3 className="text-[10px] font-black uppercase tracking-widest">{t('binary.dataSource', 'Data Source')}</h3>
 </div>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 className="w-full h-[300px] bg-black/5 dark:bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-sm outline-none resize-none focus:ring-4 focus:ring-ios-blue/10 transition-all"
 placeholder="Enter text or paste data..."
 />
 </div>
 
 <div className="glass-card rounded-xl bg-blue-500 p-8 text-white space-y-4">
 <BarChart3 size={24} />
 <h4 className="font-black tracking-tight">{t('binary.statSecurity', 'Statistical Security')}</h4>
 <p className="text-xs opacity-80 leading-relaxed">
 Higher entropy suggests randomness or encryption. Lower entropy indicates structured data or repeating patterns. Elite tools use this for crypto-analysis.
 </p>
 </div>
 </div>

 {/* Visualization Interface */}
 <div className="lg:col-span-8">
 <div className="glass-card rounded-xl flex flex-col overflow-hidden h-full min-h-[600px]">
 <div className="px-8 py-6 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between bg-white/20 dark:bg-black/20">
 <div className="flex items-center gap-4">
 <Binary size={18} className="text-blue-500" />
 <span className="text-[10px] font-black uppercase tracking-widest">{t('binary.inspector', 'Hexadecimal Inspector')}</span>
 </div>
 <button 
 onClick={handleCopy}
 className="p-3 bg-blue-500/5 hover:bg-blue-500/10 rounded-2xl text-blue-500 active:scale-95 transition-all"
 >
 {isCopied ? <Check size={20} /> : <Copy size={20} />}
 </button>
 </div>
 
 <div className="flex-1 p-10 font-mono text-xs overflow-y-auto no-scrollbar grid grid-cols-8 sm:grid-cols-16 gap-2">
 {hexView.map((h, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: Math.min(i * 0.01, 1) }}
 className={cn(
 "flex items-center justify-center py-2 rounded-lg border border-transparent transition-all hover:bg-blue-500 hover:text-white cursor-default group relative",
 bytes[i] === 0 ? "opacity-20" : "bg-black/5 dark:bg-white/5"
 )}
 title={`Byte ${i}: Dec ${bytes[i]} | Char ${String.fromCharCode(bytes[i])}`}
 >
 {h}
 {/* Tooltip on hover */}
 <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500 text-white rounded hidden group-hover:block z-20 shadow-xl whitespace-nowrap">
 Dec: {bytes[i]} | Char: {bytes[i] > 31 ? String.fromCharCode(bytes[i]) : '.'}
 </div>
 </motion.div>
 ))}
 </div>

 <div className="p-8 border-t border-ios-border-light dark:border-ios-border-dark bg-blue-500/5">
 <div className="flex items-center gap-6">
 <div className="flex gap-2 items-center">
 <div className="w-3 h-3 rounded-full bg-blue-500" />
 <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Structure Sync</span>
 </div>
 <div className="flex gap-2 items-center">
 <div className="w-3 h-3 rounded-full bg-green-500" />
 <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Integrity Verified</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
