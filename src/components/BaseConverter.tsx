import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Cpu, RefreshCw, Copy, Check, ArrowRightLeft, Binary, Hash, CircleDot, Database, BinaryIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

type Base = 2 | 8 | 10 | 16 | 32 | 36;

export function BaseConverter() {
 const { t } = useTranslation();
 const [val, setVal] = useState('255');
 const [base, setBase] = useState<Base>(10);
 const [copied, setCopied] = useState<number | null>(null);

 const convert = (num: string, b: number) => {
 try {
 const decimal = parseInt(num, b);
 if (isNaN(decimal)) return '';
 return decimal;
 } catch { return ''; }
 };

 const decimalValue = convert(val, base);

 const bases: { label: string, value: Base, icon: any }[] = [
 { label: 'Binary (2)', value: 2, icon: BinaryIcon },
 { label: 'Octal (8)', value: 8, icon: CircleDot },
 { label: 'Decimal (10)', value: 10, icon: Hash },
 { label: 'Hex (16)', value: 16, icon: Cpu },
 { label: 'Base 32', value: 32, icon: Database },
 { label: 'Base 36', value: 36, icon: Database },
 ];

 const handleCopy = (text: string, idx: number) => {
 navigator.clipboard.writeText(text); toast.success('Copied to clipboard');
 setCopied(idx);
 setTimeout(() => setCopied(null), 2000);
 };

 return (
 <ToolLayout
 toolId="baseConvert"
 title={t('tools.baseConvert')}
 shortDesc={t('toolsDesc.baseConvert')}
 wikiContent={WIKI_CONTENT.baseConvert}
 >
 <div className="space-y-12 h-full flex flex-col">
 {/* Input Bridge */}
 <div className="glass-card rounded-xl p-12 relative overflow-hidden">
 <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 scale-150">
 <Cpu size={200} strokeWidth={1} />
 </div>

 <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-end relative z-10">
 <div className="space-y-6">
 <div className="flex items-center justify-between px-2">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-60">Source Magnitude</label>
 <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-2 py-1 rounded-lg bg-blue-500/5 border border-blue-500/10">Active Vector</span>
 </div>
 <input
 type="text"
 value={val}
 onChange={(e) => setVal(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full text-4xl font-mono tracking-tighter py-8 pl-10 bg-black/5 dark:bg-black/40 border-white/5 focus:scale-[1.01] transition-transform"
 spellCheck={false}
 placeholder="0"
 />
 </div>

 <div className="space-y-6">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2 opacity-60">Input Radix</label>
 <div className="flex p-2 rounded-[2rem] bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-white/10 overflow-x-auto no-scrollbar shadow-inner">
 {bases.map(b => (
 <button
 key={b.value}
 onClick={() => setBase(b.value)}
 className={cn(
 "flex-1 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
 base === b.value 
 ? "bg-white dark:bg-[#2C2C2E] text-blue-500 shadow-xl border-white/20" 
 : "text-gray-500 hover:text-blue-500"
 )}
 >
 {b.label.split(' ')[0]}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Output Constellation */}
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 flex-1">
 {bases.map((b, i) => {
 const converted = decimalValue !== '' ? Number(decimalValue).toString(b.value).toUpperCase() : '';
 const Icon = b.icon;
 
 return (
 <motion.div 
 key={b.value} 
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: i * 0.05 }}
 className="glass-card rounded-xl p-8 flex flex-col justify-between group border-2 border-transparent hover:border-blue-500/20 transition-all hover:bg-white dark:hover:bg-black/40 active:scale-[0.98]"
 >
 <div className="flex justify-between items-start">
 <div className="w-12 h-12 rounded-2xl bg-blue-500/5 text-blue-500 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
 <Icon size={24} strokeWidth={2.5} />
 </div>
 <button 
 onClick={() => handleCopy(converted, i)}
 disabled={!converted}
 className={cn(
 "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-90",
 copied === i ? "bg-green-500 text-white" : "bg-white dark:bg-black/50 text-gray-500 opacity-0 group-hover:opacity-100"
 )}
 >
 {copied === i ? <Check size={18} strokeWidth={3} /> : <Copy size={18} />}
 </button>
 </div>

 <div className="space-y-4">
 <div className="flex flex-col">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-40">{b.label}</span>
 <code className="text-2xl font-black mt-3 dark:text-white break-all tracking-tighter leading-tight select-all">
 {converted || <span className="opacity-10 font-mono">NULL_PTR</span>}
 </code>
 </div>
 <div className="h-1.5 w-full bg-blue-500/5 rounded-full overflow-hidden">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: converted ? "100%" : "0%" }}
 className="h-full bg-blue-500 opacity-20"
 />
 </div>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </ToolLayout>
 );
}
