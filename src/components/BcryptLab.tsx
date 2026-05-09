import React, { useState } from 'react';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';
import { Shield, RefreshCw, Check, Copy, Key, Lock, Unlock, Zap, Activity, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function BcryptLab() {
 const { t } = useTranslation();
 const [password, setPassword] = useState('safedev_secret');
 const [rounds, setRounds] = useState(10);
 const [hash, setHash] = useState('');
 const [verifyPassword, setVerifyPassword] = useState('');
 const [verifyHash, setVerifyHash] = useState('');
 const [isVerifying, setIsVerifying] = useState(false);
 const [match, setMatch] = useState<boolean | null>(null);
 const [copied, setCopied] = useState(false);

 const generateHash = () => {
 try {
 const salt = bcrypt.genSaltSync(rounds);
 const h = bcrypt.hashSync(password, salt);
 setHash(h);
 } catch (e) {
 console.error(e);
 }
 };

 const handleVerify = () => {
 setIsVerifying(true);
 setMatch(null);
 setTimeout(() => {
 try {
 const isMatch = bcrypt.compareSync(verifyPassword, verifyHash);
 setMatch(isMatch);
 } catch (e) {
 setMatch(false);
 }
 setIsVerifying(false);
 }, 600);
 };

 return (
 <ToolLayout
 toolId="bcrypt"
 title={t('tools.bcrypt')}
 shortDesc={t('toolsDesc.bcrypt')}
 wikiContent={WIKI_CONTENT.bcrypt}
 >
 <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
 {/* Generator */}
 <div className="space-y-8">
 <div className="glass-card rounded-xl p-10 space-y-10 relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Lock size={140} strokeWidth={1} />
 </div>

 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
 <Zap size={24} strokeWidth={2.5} />
 </div>
 <h3 className="text-2xl font-black tracking-tight">Hash Generator</h3>
 </div>

 <div className="space-y-6">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 opacity-60">Secret String</label>
 <input
 type="text"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full py-6 text-xl font-bold bg-black/5 dark:bg-black/40 border-white/5"
 placeholder="Enter secret..."
 />
 </div>

 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 opacity-60">Computational Cost</label>
 <span className="text-xl font-black text-blue-500 tabular-nums">{rounds} <span className="text-[10px] opacity-40 uppercase">Rounds</span></span>
 </div>
 <input 
 type="range" min="4" max="15" value={rounds} 
 onChange={(e) => setRounds(parseInt(e.target.value))}
 className="w-full h-1.5 bg-[#E3E3E8] dark:bg-[#2C2C2E] rounded-full appearance-none cursor-pointer accent-ios-blue"
 />
 <div className="flex items-center gap-2 p-4 bg-yellow-500/5 rounded-2xl border border-ios-yellow/10">
 <Info size={14} className="text-yellow-500 shrink-0" />
 <p className="text-[9px] text-yellow-500 font-black uppercase tracking-wider leading-tight">Hardware complexity scales exponentially with cost.</p>
 </div>
 </div>

 <button onClick={generateHash} className=" bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium border border-blue-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 w-full py-6">
 Compute Secure Hash
 </button>
 </div>

 <AnimatePresence>
 {hash && (
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="space-y-4 pt-6 border-t border-ios-border-light dark:border-ios-border-dark"
 >
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 opacity-60">Resulting Ciphertrace</label>
 <div className="relative group/result">
 <div className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm font-mono text-[11px] break-all p-8 bg-[#000000] text-green-500 border-4 border-gray-800 shadow-inner shadow-black rounded-[2rem] leading-relaxed">
 {hash}
 </div>
 <button 
 onClick={() => { navigator.clipboard.writeText(hash); toast.success('Copied to clipboard'); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
 className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 dark:bg-black/40 rounded-2xl shadow-2xl transition-all hover:scale-110 active:scale-95"
 >
 {copied ? <Check size={20} className="text-green-500" strokeWidth={3} /> : <Copy size={20} className="text-blue-500" />}
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>

 {/* Verifier */}
 <div className="space-y-8">
 <div className="glass-card rounded-xl p-10 space-y-10 relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-8 opacity-5">
 <Shield size={140} strokeWidth={1} />
 </div>

 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
 <Key size={24} strokeWidth={2.5} />
 </div>
 <h3 className="text-2xl font-black tracking-tight">Identity Verifier</h3>
 </div>

 <div className="space-y-6">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 opacity-60">Candidate Password</label>
 <input
 type="password"
 value={verifyPassword}
 onChange={(e) => setVerifyPassword(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full py-6 bg-black/5 dark:bg-black/40 border-white/5"
 placeholder="••••••••"
 />
 </div>

 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 opacity-60">Reference Hash</label>
 <textarea
 value={verifyHash}
 onChange={(e) => setVerifyHash(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full min-h-[140px] p-6 text-[11px] font-mono leading-relaxed bg-black/5 dark:bg-black/40 border-white/5"
 placeholder="$2a$10$..."
 />
 </div>

 <button 
 onClick={handleVerify} 
 disabled={!verifyPassword || !verifyHash || isVerifying}
 className=" bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 w-full py-6"
 >
 {isVerifying ? <RefreshCw size={24} className="animate-spin" /> : (
 <div className="flex items-center gap-2">
 <Activity size={20} />
 Run Comparison
 </div>
 )}
 </button>
 </div>

 <AnimatePresence>
 {match !== null && (
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className={cn(
 "p-8 rounded-[2.5rem] border-4 flex items-center gap-6",
 match 
 ? "bg-green-500/5 border-green-500/30 text-green-500 shadow-[0_20px_50px_rgba(52,199,89,0.1)]" 
 : "bg-red-500/5 border-red-500/30 text-red-500 shadow-[0_20px_50px_rgba(255,59,48,0.1)]"
 )}
 >
 <div className={cn(
 "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl",
 match ? "bg-green-500 text-white" : "bg-red-500 text-white"
 )}>
 {match ? <Unlock size={32} strokeWidth={2.5} /> : <Lock size={32} strokeWidth={2.5} />}
 </div>
 <div>
 <h4 className="font-black text-2xl tracking-tight">{match ? 'Integrity Confirmed' : 'Verification Denied'}</h4>
 <p className="text-[10px] font-black opacity-60 uppercase tracking-[0.2em] mt-1 shrink-0">
 {match ? 'The secret matches the reference vector.' : 'Collision detected or integrity compromised.'}
 </p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 <div className="glass-card rounded-xl p-8 flex items-center gap-6 border-transparent">
 <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
 <Shield size={24} />
 </div>
 <p className="text-xs font-medium leading-relaxed opacity-60">
 Bcrypt uses adaptive salt generation for protection against rainbow table attacks. Computing on 10 rounds takes roughly 100ms.
 </p>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
