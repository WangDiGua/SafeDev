import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { Key, Copy, RefreshCw, Shield, Info, Zap, Settings, Check, Lock, Unlock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import zxcvbn from 'zxcvbn';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function PasswordGenerator() {
 const { t } = useTranslation();
 const [length, setLength] = useState(24);
 const [includeUppercase, setIncludeUppercase] = useState(true);
 const [includeNumbers, setIncludeNumbers] = useState(true);
 const [includeSymbols, setIncludeSymbols] = useState(true);
 const [password, setPassword] = useState('');
 const [isCopied, setIsCopied] = useState(false);

 const generatePassword = () => {
 const charset = {
 lower: 'abcdefghijklmnopqrstuvwxyz',
 upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
 numbers: '0123456789',
 symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
 };

 let chars = charset.lower;
 if (includeUppercase) chars += charset.upper;
 if (includeNumbers) chars += charset.numbers;
 if (includeSymbols) chars += charset.symbols;

 let result = '';
 const array = new Uint32Array(length);
 window.crypto.getRandomValues(array);
 
 for (let i = 0; i < length; i++) {
 result += chars.charAt(array[i] % chars.length);
 }
 setPassword(result);
 };

 useEffect(() => {
 generatePassword();
 }, []);

 const strength = useMemo(() => {
 if (!password) return null;
 return zxcvbn(password);
 }, [password]);

 const strengthColor = useMemo(() => {
 if (!strength) return 'bg-ios-gray/20';
 switch (strength.score) {
 case 0: return 'bg-red-500';
 case 1: return 'bg-orange-500';
 case 2: return 'bg-yellow-500';
 case 3: return 'bg-blue-500';
 case 4: return 'bg-green-500';
 default: return 'bg-ios-gray/20';
 }
 }, [strength]);

 const strengthLabel = useMemo(() => {
 if (!strength) return 'Weak';
 switch (strength.score) {
 case 0: return 'Fragile';
 case 1: return 'Simple';
 case 2: return 'Moderate';
 case 3: return 'Strong';
 case 4: return 'Military Grade';
 default: return 'Weak';
 }
 }, [strength]);

 const handleCopy = () => {
 navigator.clipboard.writeText(password);
 setIsCopied(true);
    toast.success('Copied to clipboard');
 setTimeout(() => setIsCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="password"
 title={t('password.title')}
 shortDesc={t('password.desc')}
 wikiContent={WIKI_CONTENT.password}
 >
 <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
 {/* Left Column: Output & Strength */}
 <div className="xl:col-span-12 space-y-10">
 <div className="relative group">
 {/* Glowing Aura for Password */}
 <div className={cn(
 "absolute -inset-4 rounded-[4rem] blur-3xl opacity-20 transition-all duration-1000",
 strength?.score === 4 ? "bg-green-500" : strength?.score === 3 ? "bg-blue-500" : "bg-red-500"
 )} />

 <div className="relative glass-card rounded-xl overflow-hidden bg-white/70 dark:bg-[#1C1C1E]/70 backdrop-blur-3xl border-white/20">
 <div className="p-10 sm:p-20 flex flex-col items-center space-y-12">
 <motion.div 
 key={password}
 initial={{ scale: 0.9, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 className="w-full text-center"
 >
 <p className="text-4xl sm:text-7xl font-black font-mono tracking-tighter break-all text-black dark:text-white leading-[0.9]">
 {password.split('').map((char, i) => (
 <span key={i} className={cn(
 "transition-all hover:scale-110 inline-block",
 /[0-9]/.test(char) ? "text-blue-500" : 
 /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(char) ? "text-red-500" : ""
 )}>
 {char}
 </span>
 ))}
 </p>
 </motion.div>

 <div className="flex flex-wrap justify-center gap-6">
 <button 
 onClick={generatePassword}
 className=" bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium border border-blue-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2"
 >
 <RefreshCw size={20} className="mr-2" />
 Regenerate
 </button>
 <button 
 onClick={handleCopy}
 className=" bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 min-w-[200px]"
 >
 <AnimatePresence mode="wait">
 {isCopied ? (
 <motion.div 
 key="copied"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="flex items-center gap-2 text-green-500"
 >
 <Check size={20} strokeWidth={3} />
 Copied
 </motion.div>
 ) : (
 <motion.div 
 key="copy"
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="flex items-center gap-2"
 >
 <Copy size={20} />
 Copy Key
 </motion.div>
 )}
 </AnimatePresence>
 </button>
 </div>
 </div>

 {/* Strength Meter Board */}
 <div className="px-10 py-8 bg-black/5 dark:bg-white/5 border-t border-ios-border-light dark:border-ios-border-dark flex flex-col sm:flex-row items-center justify-between gap-8">
 <div className="flex-1 w-full max-w-md space-y-4">
 <div className="flex justify-between items-end">
 <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Security Analysis</span>
 <span className={cn(
 "text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full",
 strength?.score === 4 ? "bg-green-500/10 text-green-500" : 
 strength?.score === 3 ? "bg-blue-500/10 text-blue-500" : 
 "bg-red-500/10 text-red-500"
 )}>
 {strengthLabel}
 </span>
 </div>
 <div className="h-3 w-full bg-gray-50 dark:bg-black/20 rounded-full overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
 <motion.div 
 initial={{ width: 0 }}
 animate={{ width: `${((strength?.score || 0) + 1) * 20}%` }}
 className={cn("h-full rounded-full transition-all duration-1000 shadow-lg", strengthColor)}
 />
 </div>
 </div>

 <div className="flex items-center gap-8">
 <div className="text-center sm:text-right">
 <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest opacity-40 mb-1">Complexity</p>
 <p className="text-xl font-black flex items-center justify-center sm:justify-end gap-1.5 tabular-nums tracking-tighter">
 {strength?.guesses_log10.toFixed(0)} <span className="text-xs text-gray-500">bits</span>
 </p>
 </div>
 <div className="w-px h-10 bg-ios-border-light dark:border-ios-border-dark hidden sm:block" />
 <div className="text-center sm:text-right">
 <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest opacity-40 mb-1">Time to crack</p>
 <p className="text-xl font-black tracking-tighter">
 {strength?.crack_times_display.offline_fast_hashing_1e10_per_second}
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Right Column: Controls */}
 <div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-10">
 {/* Parameters */}
 <div className="glass-card rounded-xl p-10 space-y-10">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
 <Settings size={20} strokeWidth={2.5} />
 </div>
 <h2 className="text-xl font-black tracking-tight">Parameters</h2>
 </div>

 <div className="space-y-8">
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <label className="text-xs font-black uppercase tracking-widest text-gray-500">Bit-Length</label>
 <span className="text-2xl font-black text-blue-500 tabular-nums">{length}</span>
 </div>
 <div className="relative flex items-center h-10 group">
 <input 
 type="range" min="8" max="128" value={length} 
 onChange={(e) => setLength(parseInt(e.target.value))}
 className="w-full h-1.5 bg-[#E3E3E8] dark:bg-[#2C2C2E] rounded-full appearance-none cursor-pointer accent-ios-blue transition-all"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 gap-4">
 {[
 { id: 'upper', label: 'Use Uppercase', state: includeUppercase, setter: setIncludeUppercase, icon: Lock },
 { id: 'num', label: 'Use Numbers', state: includeNumbers, setter: setIncludeNumbers, icon: Sparkles },
 { id: 'sym', label: 'Use Symbols', state: includeSymbols, setter: setIncludeSymbols, icon: Zap },
 ].map((opt) => (
 <button
 key={opt.id}
 onClick={() => opt.setter(!opt.state)}
 className={cn(
 "flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all active:scale-[0.96] group",
 opt.state 
 ? "bg-blue-500 text-white border-blue-500 shadow-xl shadow-blue-500/20" 
 : "bg-white dark:bg-[#1C1C1E] border-ios-border-light dark:border-ios-border-dark text-gray-500 hover:border-blue-500/30"
 )}
 >
 <div className="flex items-center gap-4">
 <div className={cn(
 "w-10 h-10 rounded-2xl flex items-center justify-center transition-colors",
 opt.state ? "bg-white/20" : "bg-ios-bg-light dark:bg-[#2C2C2E]"
 )}>
 <opt.icon size={18} strokeWidth={2.5} />
 </div>
 <span className="text-xs font-black uppercase tracking-widest">{opt.label}</span>
 </div>
 
 {/* iOS Switch */}
 <div className={cn(
 "w-12 h-7 rounded-full relative transition-all duration-300",
 opt.state ? "bg-white" : "bg-[#E3E3E8] dark:bg-black/40"
 )}>
 <motion.div 
 initial={false}
 animate={{ x: opt.state ? 20 : 0 }}
 className={cn(
 "absolute top-1 left-1 w-5 h-5 rounded-full shadow-md",
 opt.state ? "bg-blue-500" : "bg-white"
 )} 
 />
 </div>
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Knowledge Hub */}
 <div className="space-y-8">
 <div className="glass-card rounded-xl p-10 bg-blue-500 text-white space-y-6 shadow-2xl shadow-blue-500/30 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-125" />
 <Shield size={40} strokeWidth={2.5} className="relative opacity-60" />
 <div className="space-y-4 relative">
 <h3 className="text-2xl font-black tracking-tight leading-tight">Native Browser Security</h3>
 <p className="text-white/80 font-medium leading-relaxed">
 SafeDev uses <code className="bg-white/20 px-2 py-1 rounded-lg">WebCrypto.getRandomValues()</code> to generate cryptographically secure entropy directly in your hardware.
 </p>
 </div>
 </div>

 <div className="glass-card rounded-xl p-8 flex items-start gap-6 border-transparent">
 <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
 <Info size={24} />
 </div>
 <div className="space-y-2">
 <p className="text-xs font-black uppercase tracking-widest text-gray-500">Local First Policy</p>
 <p className="text-sm font-medium leading-relaxed opacity-60">
 Generated passwords are never cached, logged, or sent to any server. Refreshing this page wipes all local state instantly.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}

