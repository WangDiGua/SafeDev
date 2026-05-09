import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { Copy, Check, RefreshCw, Trash2, ArrowRightLeft, FileImage, Type, Zap, Image, Binary } from 'lucide-react';
import { Base64 } from 'js-base64';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function Base64Smart() {
 const { t } = useTranslation();
 const [input, setInput] = useState('U2FmZURldiAtIFNlY3VyZSBXb3Jrc3BhY2UgZm9yIERldmVsb3BlcnM=');
 const [mode, setMode] = useState<'encode' | 'decode'>('decode');
 const [copied, setCopied] = useState(false);

 const output = useMemo(() => {
 if (!input) return '';
 try {
 return mode === 'encode' ? Base64.encode(input) : Base64.decode(input);
 } catch (e) {
 return 'Invalid Input for Base64';
 }
 }, [input, mode]);

 const isImage = useMemo(() => {
 if (mode === 'encode' || !input) return false;
 return input.includes('data:image/') || (input.length > 100 && /^[a-zA-Z0-9+/]*={0,2}$/.test(input));
 }, [input, mode]);

 const toggleMode = () => {
 setMode(prev => prev === 'encode' ? 'decode' : 'encode');
 setInput(output);
 };

 const handleCopy = () => {
 navigator.clipboard.writeText(output); toast.success('Copied to clipboard');
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="base64"
 title={t('tools.base64')}
 shortDesc={t('toolsDesc.base64')}
 wikiContent={WIKI_CONTENT.base64}
 >
 <div className="flex flex-col gap-8 h-full">
 {/* Controls */}
 <div className="flex flex-wrap items-center justify-between gap-6 px-4">
 <div className="flex bg-ios-bg-light dark:bg-[#2C2C2E] rounded-[1.5rem] p-1.5 border border-ios-border-light dark:border-ios-border-dark shadow-inner">
 <button
 onClick={() => setMode('encode')}
 className={cn(
 "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
 mode === 'encode' ? "bg-white dark:bg-[#1C1C1E] text-blue-500 shadow-lg" : "text-gray-500 opacity-60"
 )}
 >
 Encode
 </button>
 <button
 onClick={() => setMode('decode')}
 className={cn(
 "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
 mode === 'decode' ? "bg-white dark:bg-[#1C1C1E] text-blue-500 shadow-lg" : "text-gray-500 opacity-60"
 )}
 >
 Decode
 </button>
 </div>

 <div className="flex gap-4">
 <button onClick={toggleMode} className=" bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
 <ArrowRightLeft size={18} />
 <span className="hidden sm:inline">Swap Buffers</span>
 </button>
 <button onClick={() => setInput('')} className=" bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border-red-500/20">
 <Trash2 size={18} />
 <span className="hidden sm:inline">Flush</span>
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[500px]">
 {/* Input Terminal */}
 <motion.div 
 layout
 className="flex flex-col glass-card rounded-xl overflow-hidden border-2 border-transparent focus-within:border-blue-500/30 transition-all shadow-2xl"
 >
 <div className="px-10 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
 <div className="space-y-1">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] opacity-60">Source Buffer</span>
 <h4 className="text-sm font-black uppercase tracking-tight">{mode === 'encode' ? 'Raw Text' : 'Base64 Stream'}</h4>
 </div>
 <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
 {mode === 'encode' ? <Type size={20} /> : <Binary size={20} />}
 </div>
 </div>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 className="flex-1 p-10 bg-transparent resize-none font-mono text-sm outline-none dark:text-white leading-relaxed placeholder:opacity-20"
 placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste base64 content...'}
 spellCheck={false}
 />
 </motion.div>

 {/* Output Terminal */}
 <motion.div 
 layout
 className="flex flex-col glass-card rounded-xl bg-white dark:bg-[#1C1C1E]/80 overflow-hidden relative border-2 border-transparent shadow-2xl"
 >
 <div className="px-10 py-6 border-b border-ios-border-light dark:border-ios-border-dark flex justify-between items-center bg-blue-500/5">
 <div className="space-y-1">
 <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Target Trace</span>
 <h4 className="text-sm font-black uppercase tracking-tight">{mode === 'encode' ? 'Base64 Hash' : 'Decoded Content'}</h4>
 </div>
 <button 
 onClick={handleCopy} 
 disabled={!output} 
 className={cn(
 "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90",
 copied ? "bg-green-500 text-white" : "bg-white dark:bg-black text-blue-500"
 )}
 >
 {copied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} />}
 </button>
 </div>
 
 <div className={cn(
 "flex-1 overflow-auto p-10 font-mono text-sm dark:text-white break-all whitespace-pre-wrap select-all selection:bg-blue-500/20 leading-relaxed",
 !output && "flex items-center justify-center opacity-20 grayscale"
 )}>
 {output || <Zap size={80} strokeWidth={1} />}
 </div>

 <AnimatePresence>
 {isImage && mode === 'decode' && (
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 20 }}
 className="p-10 border-t border-ios-border-light dark:border-ios-border-dark bg-white dark:bg-black flex flex-col items-center gap-6"
 >
 <div className="flex items-center gap-3">
 <Image size={16} className="text-blue-500" />
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Visual Reconstruction</span>
 </div>
 <div className="relative group/preview">
 <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity" />
 <div className="relative p-6 rounded-[2.5rem] bg-ios-bg-light dark:bg-[#2C2C2E] border-4 border-ios-border-light dark:border-ios-border-dark shadow-2xl">
 <img 
 src={input.startsWith('data:') ? input : `data:image/png;base64,${input}`} 
 alt="Preview" 
 className="max-w-[300px] max-h-[300px] rounded-2xl object-contain" 
 />
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 </div>
 </div>
 </ToolLayout>
 );
}
