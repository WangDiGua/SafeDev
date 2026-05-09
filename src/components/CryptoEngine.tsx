import React, { useState } from 'react';
import { toast } from 'sonner';
import { Hash, Key, Lock, Unlock, Copy, Terminal, Shield, Binary, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../store/useAppStore';

type CryptoMode = 'hash' | 'aes-encrypt' | 'aes-decrypt';

export function CryptoEngine() {
 const { t } = useTranslation();
 const theme = useAppStore(s => s.theme);
 const [mode, setMode] = useState<CryptoMode>('hash');
 const [input, setInput] = useState('');
 const [key, setKey] = useState('safedev-secret-key-32');
 const [output, setOutput] = useState('');
 const [algo, setAlgo] = useState('SHA-256');
 const [isCopied, setIsCopied] = useState(false);

 const processHash = async (text: string) => {
 if (!text) { setOutput(''); return; }
 try {
 const msgUint8 = new TextEncoder().encode(text);
 const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
 const hashArray = Array.from(new Uint8Array(hashBuffer));
 const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
 setOutput(hashHex);
 } catch (e: any) {
 setOutput('Error: ' + e.message);
 }
 };

 const processAes = async (encrypt: boolean) => {
 if (!input) { setOutput(''); return; }
 try {
 const enc = new TextEncoder();
 const keyMaterial = await crypto.subtle.importKey(
 "raw",
 enc.encode(key.padEnd(32, '0').slice(0, 32)),
 "AES-CBC",
 false,
 ["encrypt", "decrypt"]
 );

 const iv = enc.encode('safedev-iv-16-bytes'.slice(0, 16));

 if (encrypt) {
 const encrypted = await crypto.subtle.encrypt(
 { name: "AES-CBC", iv },
 keyMaterial,
 enc.encode(input)
 );
 setOutput(btoa(String.fromCharCode(...new Uint8Array(encrypted))));
 } else {
 const decrypted = await crypto.subtle.decrypt(
 { name: "AES-CBC", iv },
 keyMaterial,
 Uint8Array.from(atob(input), c => c.charCodeAt(0))
 );
 setOutput(new TextDecoder().decode(decrypted));
 }
 } catch (e: any) {
 setOutput('Error: ' + e.message);
 }
 };

 const handleRun = () => {
 if (mode === 'hash') processHash(input);
 else processAes(mode === 'aes-encrypt');
 };

 const handleCopy = () => {
 if (!output) return;
 navigator.clipboard.writeText(output);
 setIsCopied(true);
    toast.success('Copied to clipboard');
 setTimeout(() => setIsCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="crypto"
 title={t('common.crypto')}
 shortDesc="High-performance client-side cryptographic standard engine."
 wikiContent={WIKI_CONTENT.crypto}
 >
 <div className="space-y-6">
 {/* Mode Selector */}
 <div className="flex justify-center border-b border-ios-border-light dark:border-ios-border-dark pb-6">
 <div className="inline-flex p-1 bg-gray-100 dark:bg-[#2C2C2E] rounded-lg shadow-inner">
 {(['hash', 'aes-encrypt', 'aes-decrypt'] as CryptoMode[]).map((m) => (
 <button
 key={m}
 onClick={() => { setMode(m); setOutput(''); }}
 className={cn(
 "px-6 py-2 text-xs font-semibold rounded-md transition-all",
 mode === m 
 ? "bg-white dark:bg-[#222] shadow-sm border border-ios-border-light dark:border-gray-700 text-blue-600 dark:text-blue-400" 
 : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
 )}
 >
 {m === 'hash' ? 'Hashing' : m === 'aes-encrypt' ? 'AES Encrypt' : 'AES Decrypt'}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
 {/* Input Panel */}
 <div className="space-y-6 flex flex-col h-[600px]">
 <div className="glass-card rounded-xl flex-1 flex flex-col bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E] flex justify-between items-center">
 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
 <Binary size={16} />
 <span className="text-xs font-semibold uppercase tracking-widest">Input Payload</span>
 </div>
 </div>
 <div className="flex-1 relative">
 <Editor
 height="100%"
 defaultLanguage="plaintext"
 value={input}
 onChange={(val) => setInput(val || '')}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 minimap: { enabled: false },
 fontSize: 14,
 wordWrap: 'on',
 lineNumbers: 'off',
 fontFamily: 'var(--font-mono)'
 }}
 />
 </div>
 </div>

 <div className="glass-card rounded-xl p-5 bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 {mode.startsWith('aes') && (
 <div className="space-y-3">
 <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">AES Key (SHA-256 Seed)</label>
 <div className="relative">
 <input
 type="password"
 value={key}
 onChange={(e) => setKey(e.target.value)}
 className="w-full bg-ios-bg-light dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark rounded-md py-2.5 pl-10 pr-4 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
 placeholder="Enter secret key..."
 />
 <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
 </div>
 </div>
 )}

 {mode === 'hash' && (
 <div className="space-y-3">
 <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Digest Algorithm</label>
 <div className="grid grid-cols-2 gap-2">
 {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map(a => (
 <button
 key={a}
 onClick={() => setAlgo(a)}
 className={cn(
 "py-2 rounded-md text-xs font-semibold transition-all border",
 algo === a 
 ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900" 
 : "bg-white dark:bg-[#2C2C2E] border-ios-border-light dark:border-ios-border-dark text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#222]"
 )}
 >
 {a}
 </button>
 ))}
 </div>
 </div>
 )}

 <div className="pt-5 mt-5 border-t border-ios-border-light dark:border-ios-border-dark">
 <button
 onClick={handleRun}
 className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium border border-blue-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 w-full py-2.5 flex justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium border border-blue-700 shadow-sm"
 >
 {mode === 'aes-decrypt' ? <Unlock size={18} /> : mode === 'aes-encrypt' ? <Lock size={18} /> : <Hash size={18} />}
 Execute Operation
 </button>
 </div>
 </div>
 </div>

 {/* Result Panel */}
 <div className="space-y-6 flex flex-col h-[600px]">
 <div className="glass-card rounded-xl flex-1 flex flex-col bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark overflow-hidden shadow-sm">
 <div className="px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E] flex items-center justify-between">
 <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
 <Terminal size={16} />
 <span className="text-xs font-semibold uppercase tracking-widest">Calculated Output</span>
 </div>
 <AnimatePresence mode="wait">
 {isCopied ? (
 <motion.div 
 key="check"
 initial={{ scale: 0.8, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 exit={{ scale: 0.8, opacity: 0 }}
 className="flex items-center gap-1.5 text-green-600 dark:text-green-500 text-xs font-bold"
 >
 <Check size={14} strokeWidth={3} /> Copied
 </motion.div>
 ) : (
 <button 
 onClick={handleCopy}
 className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
 title="Copy result"
 >
 <Copy size={14} />
 </button>
 )}
 </AnimatePresence>
 </div>
 
 <div className="flex-1 relative bg-gray-50/50 dark:bg-[#1C1C1E]">
 <Editor
 height="100%"
 defaultLanguage="plaintext"
 value={output}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 readOnly: true,
 minimap: { enabled: false },
 fontSize: 14,
 wordWrap: 'on',
 lineNumbers: 'off',
 fontFamily: 'var(--font-mono)'
 }}
 />
 {!output && (
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
 <span className="text-gray-400 dark:text-gray-600 text-sm font-medium border border-dashed border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg">Ready to compute</span>
 </div>
 )}
 </div>

 <div className="px-5 py-3 bg-ios-bg-light dark:bg-[#2C2C2E] border-t border-ios-border-light dark:border-ios-border-dark grid grid-cols-3 gap-4">
 <div>
 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Method</p>
 <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{mode}</p>
 </div>
 <div>
 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Algorithm</p>
 <p className="text-xs font-semibold text-black dark:text-white">{mode === 'hash' ? algo : 'AES-CBC'}</p>
 </div>
 <div>
 <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
 <p className="text-xs font-semibold text-green-600 dark:text-green-500 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
 Ready
 </p>
 </div>
 </div>
 </div>

 <div className="glass-card rounded-xl p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex items-start gap-4 shadow-sm">
 <Shield size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
 <div className="space-y-2">
 <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300">Local-first Cryptography</h4>
 <p className="text-[13px] font-medium text-blue-700/80 dark:text-blue-300/80 leading-relaxed">
 Uses native <code className="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded text-blue-800 dark:text-blue-400 font-mono text-[10px]">SubtleCrypto</code>. Operations happen extremely fast locally within your browser using optimized C++ bindings—no sensitive keys ever hit a network boundary.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
