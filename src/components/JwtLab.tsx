import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { ShieldCheck, Copy, Trash2, Key, Terminal, Activity, Lock, ArrowRightLeft, FileJson, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { base64url } from 'jose';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../store/useAppStore';

type JwtMode = 'encode' | 'decode';

export function JwtLab() {
  const { t } = useTranslation();
  const theme = useAppStore(s => s.theme);
  const [mode, setMode] = useState<JwtMode>('decode');
  
  const [token, setToken] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [secret, setSecret] = useState('');

  // Encode inputs
  const [headerInput, setHeaderInput] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payloadInput, setPayloadInput] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
  const [encodedToken, setEncodedToken] = useState('');
  
  const decoded = useMemo(() => {
    if (!token) return null;
    const parts = token.trim().split('.');
    if (parts.length !== 3) return { error: 'Invalid JWT Format: MUST HAVE 3 PARTS' };
    
    try {
      const headerRaw = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
      const payloadRaw = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      
      const header = JSON.parse(headerRaw);
      const payload = JSON.parse(payloadRaw);
      const signature = parts[2];
      
      // Weak Secret Check
      const WEAK_SECRETS = ['secret', 'password', '123456', 'qwerty', 'admin', 'jwt', 'google'];
      const isWeak = WEAK_SECRETS.includes(secret.toLowerCase());

      return { 
        header, 
        payload, 
        signature,
        isWeak,
        raw: { header: parts[0], payload: parts[1], signature: parts[2] }
      };
    } catch (e: any) {
      return { error: 'Decode Failure: ' + e.message };
    }
  }, [token, secret]);

  const generateToken = async () => {
    try {
      const h = JSON.parse(headerInput);
      const p = JSON.parse(payloadInput);
      
      if (!h.alg || h.alg !== 'HS256') {
        throw new Error('Only HS256 is supported for local generation right now.');
      }

      const ec = new TextEncoder();
      const keyMaterial = secret || 'default_secret';
      
      const algorithm = { name: 'HMAC', hash: 'SHA-256' };
      const cryptoKey = await crypto.subtle.importKey(
        'raw', 
        ec.encode(keyMaterial), 
        algorithm, 
        false, 
        ['sign']
      );

      const headerB64 = base64url.encode(JSON.stringify(h));
      const payloadB64 = base64url.encode(JSON.stringify(p));

      const dataToSign = ec.encode(`${headerB64}.${payloadB64}`);
      const signatureData = await crypto.subtle.sign(algorithm.name, cryptoKey, dataToSign);

      const signatureB64 = base64url.encode(new Uint8Array(signatureData));

      setEncodedToken(`${headerB64}.${payloadB64}.${signatureB64}`);
    } catch (e: any) {
      setEncodedToken(`Signing Error: ${e.message}`);
    }
  };

  useEffect(() => {
    if (mode === 'encode') {
      const timer = setTimeout(() => {
         generateToken();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [headerInput, payloadInput, secret, mode]);

  const handleCopy = (text: string) => {
    if (!text || text.includes('Error')) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="jwt"
      title={t('common.jwt')}
      shortDesc="Elite real-time debugger for JSON Web Tokens with integrity check."
      wikiContent={WIKI_CONTENT.jwt}
    >
      <div className="flex flex-col gap-6">
         {/* Mode Selector */}
         <div className="flex justify-center border-b border-ios-border-light dark:border-ios-border-dark pb-6">
            <div className="inline-flex p-1 bg-gray-100 dark:bg-[#2C2C2E] rounded-lg shadow-inner">
               <button
                  onClick={() => setMode('decode')}
                  className={cn(
                     "px-8 py-2 text-xs font-semibold rounded-md transition-all",
                     mode === 'decode' ? "bg-white dark:bg-[#222] shadow-sm border border-ios-border-light dark:border-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                  )}
               >
                  Decode JWT
               </button>
               <button
                  onClick={() => setMode('encode')}
                  className={cn(
                     "px-8 py-2 text-xs font-semibold rounded-md transition-all",
                     mode === 'encode' ? "bg-white dark:bg-[#222] shadow-sm border border-ios-border-light dark:border-gray-700 text-purple-600 dark:text-purple-400" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                  )}
               >
                  Encode JWT
               </button>
            </div>
         </div>

        {mode === 'decode' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left: Input Encoder */}
          <div className="xl:col-span-5 space-y-6">
            <div className="glass-card rounded-xl h-[600px] flex flex-col bg-white dark:bg-[#1C1C1E] shadow-sm border border-ios-border-light dark:border-ios-border-dark overflow-hidden">
              <div className="px-5 py-4 flex justify-between items-center border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
                <div className="flex items-center gap-3">
                  <div className="text-gray-500 dark:text-gray-400">
                    <Terminal size={16} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">ENCODED TOKEN</span>
                </div>
                {token && (
                  <button 
                    onClick={() => setToken('')}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-colors rounded-md"
                    title="Clear token"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  defaultLanguage="plaintext"
                  value={token}
                  onChange={(val) => setToken(val || '')}
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

              <div className="p-6 space-y-5 bg-ios-bg-light dark:bg-[#2C2C2E] border-t border-ios-border-light dark:border-ios-border-dark">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Verification Secret</label>
                  <div className="relative">
                    <input 
                      type="password"
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="Enter secret for integrity check..."
                      className="w-full bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark rounded-md py-2.5 pl-10 pr-4 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    />
                    <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase text-gray-500">Decoder Engine active</span>
                  </div>
                  {token && (
                    <button 
                      onClick={() => handleCopy(token)}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-1.5 flex items-center gap-2 text-xs"
                    >
                      <Copy size={14} /> Copy Input
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Decoded Output */}
          <div className="xl:col-span-7 h-[600px]">
            <AnimatePresence mode="wait">
              {!decoded || (decoded as any).error ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass-card rounded-xl h-full flex flex-col items-center justify-center text-gray-500/40 border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-[#1C1C1E]/50"
                >
                  <ShieldCheck size={80} strokeWidth={1} className={!decoded ? 'animate-pulse' : ''} />
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] max-w-[250px] text-center">
                    {(decoded as any)?.error || 'Standby for Payload Injection'}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="output"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6 h-full"
                >
                  {/* Header Section */}
                  <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark flex flex-col flex-1 shadow-sm">
                    <div className="bg-red-50/50 dark:bg-red-900/10 px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">HEADER: ALGORITHM & TOKEN TYPE</span>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        value={JSON.stringify((decoded as any).header, null, 2)}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'off',
                          scrollBeyondLastLine: false,
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Payload Section */}
                  <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark flex flex-col flex-1 shadow-sm">
                    <div className="bg-purple-50/50 dark:bg-purple-900/10 px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">PAYLOAD: DATA</span>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <Editor
                        height="100%"
                        defaultLanguage="json"
                        value={JSON.stringify((decoded as any).payload, null, 2)}
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'off',
                          scrollBeyondLastLine: false,
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Signature Section / Verification */}
                  <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm">
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">SIGNATURE</span>
                      </div>
                    </div>
                    <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto whitespace-normal break-all text-blue-500 opacity-80 shrink-0 h-16">
                      {(decoded as any).signature}
                    </div>
                    
                    <div className="px-5 py-4 bg-ios-bg-light dark:bg-[#2C2C2E] flex items-center gap-4 border-t border-ios-border-light dark:border-ios-border-dark">
                      <div 
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center border",
                          (decoded as any).isWeak 
                            ? "bg-red-50 text-red-500 border-red-200 dark:bg-red-900/20 dark:border-red-900" 
                            : "bg-white text-blue-500 border-ios-border-light dark:bg-black dark:border-ios-border-dark"
                        )}
                      >
                        <Lock size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">
                          { (decoded as any).isWeak ? 'Security Alert' : 'Integrity Check' }
                        </p>
                        <p className={cn(
                          "text-sm font-semibold mt-0.5",
                          (decoded as any).isWeak ? "text-red-500" : "text-black dark:text-white"
                        )}>
                          { (decoded as any).isWeak ? 'WEAK SECRET DETECTED' : 'Structure Validated' }
                        </p>
                      </div>
                      <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest bg-white dark:bg-[#222] border border-ios-border-light dark:border-ios-border-dark px-3 py-1.5 rounded-md text-gray-500">
                        { (decoded as any).header.alg || 'N/A' }
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           {/* Encode Input Area */}
           <div className="xl:col-span-7 h-[600px] flex flex-col gap-6">
              <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark flex flex-col flex-1 shadow-sm min-h-0">
                 <div className="bg-red-50/50 dark:bg-red-900/10 px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                       <FileJson size={16} className="text-red-500" />
                       <span className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">HEADER: JSON (Editable)</span>
                    </div>
                 </div>
                 <div className="flex-1 relative">
                    <Editor
                       height="100%"
                       defaultLanguage="json"
                       value={headerInput}
                       onChange={(val) => setHeaderInput(val || '')}
                       theme={theme === 'dark' ? 'vs-dark' : 'light'}
                       options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'off',
                          scrollBeyondLastLine: false,
                          fontFamily: 'var(--font-mono)'
                       }}
                    />
                 </div>
              </div>

              <div className="glass-card rounded-xl overflow-hidden bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark flex flex-col flex-1 shadow-sm min-h-0">
                 <div className="bg-purple-50/50 dark:bg-purple-900/10 px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                       <FileJson size={16} className="text-purple-500" />
                       <span className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">PAYLOAD: JSON (Editable)</span>
                    </div>
                 </div>
                 <div className="flex-1 relative">
                    <Editor
                       height="100%"
                       defaultLanguage="json"
                       value={payloadInput}
                       onChange={(val) => setPayloadInput(val || '')}
                       theme={theme === 'dark' ? 'vs-dark' : 'light'}
                       options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: 'off',
                          scrollBeyondLastLine: false,
                          fontFamily: 'var(--font-mono)'
                       }}
                    />
                 </div>
              </div>
           </div>

           {/* Encode Output Tooling */}
           <div className="xl:col-span-5 space-y-6">
              <div className="glass-card rounded-xl flex flex-col bg-white dark:bg-[#1C1C1E] shadow-sm border border-ios-border-light dark:border-ios-border-dark overflow-hidden h-full min-h-[600px]">
                 <div className="px-5 py-4 flex justify-between items-center border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
                    <div className="flex items-center gap-3">
                       <div className="text-purple-500">
                          <Activity size={16} strokeWidth={2} />
                       </div>
                       <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">GENERATED TOKEN</span>
                    </div>
                 </div>
                 
                 <div className="flex-1 relative bg-gray-50/50 dark:bg-transparent">
                    <Editor
                       height="100%"
                       defaultLanguage="plaintext"
                       value={encodedToken}
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
                 </div>

                 <div className="p-6 space-y-5 bg-ios-bg-light dark:bg-[#2C2C2E] border-t border-ios-border-light dark:border-ios-border-dark">
                    <div className="space-y-3">
                       <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Signing Secret (HMAC)</label>
                       <div className="relative">
                          <input 
                             type="password"
                             value={secret}
                             onChange={(e) => setSecret(e.target.value)}
                             placeholder="Secret for signing payload..."
                             className="w-full bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark rounded-md py-2.5 pl-10 pr-4 font-mono text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                          />
                          <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase text-gray-500">Auto-Signing</span>
                       </div>
                       <button 
                          onClick={() => handleCopy(encodedToken)}
                          className="bg-white hover:bg-gray-50 dark:bg-[#222] dark:hover:bg-[#333] text-purple-600 dark:text-purple-400 rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm py-1.5 px-4 text-xs flex items-center justify-center gap-2"
                       >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />} {isCopied ? 'Copied' : 'Copy JWT'}
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
        )}
      </div>
    </ToolLayout>
  );
}
