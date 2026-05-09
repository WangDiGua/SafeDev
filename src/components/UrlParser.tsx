import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { Link, Copy, Check, Trash2, Plus, Globe, Settings2, ShieldCheck, Key } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';

export function UrlParser() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://api.safedev.io:8443/v1/search?q=security&lang=zh#results');
  const [copied, setCopied] = useState<string | null>(null);

  const parsed = useMemo(() => {
    try {
      const u = new URL(url);
      const params: { key: string, value: string }[] = [];
      u.searchParams.forEach((v, k) => params.push({ key: k, value: v }));
      return {
        href: u.href,
        protocol: u.protocol,
        host: u.host,
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? '443' : '80'),
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        params,
        username: u.username,
        password: u.password
      };
    } catch (e) {
      return null;
    }
  }, [url]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text); toast.success('Copied to clipboard');
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const updateUrlParam = (oldKey: string, newKey: string, newValue: string, index: number) => {
    if (!parsed) return;
    try {
      const u = new URL(url);
      // To correctly update at a specific index without messing up duplicate keys, rebuilt search params
      const newParams = [...parsed.params];
      newParams[index] = { key: newKey, value: newValue };
      
      const newSearchParams = new URLSearchParams();
      newParams.forEach(p => {
        if (p.key) newSearchParams.append(p.key, p.value);
      });
      u.search = newSearchParams.toString();
      setUrl(u.href);
    } catch (e) {}
  };

  const removeParam = (index: number) => {
    if (!parsed) return;
    try {
      const u = new URL(url);
      const newParams = parsed.params.filter((_, i) => i !== index);
      const newSearchParams = new URLSearchParams();
      newParams.forEach(p => {
        if (p.key) newSearchParams.append(p.key, p.value);
      });
      u.search = newSearchParams.toString();
      setUrl(u.href);
    } catch (e) {}
  };

  const addParam = () => {
    if (!parsed) return;
    try {
      const u = new URL(url);
      u.searchParams.append('newKey', 'newValue');
      setUrl(u.href);
    } catch (e) {}
  };

  const updateComponent = (component: 'protocol' | 'hostname' | 'port' | 'pathname' | 'hash', value: string) => {
    if (!parsed) return;
    try {
      const u = new URL(url);
      if (component === 'protocol' && !value.endsWith(':')) u.protocol = value + ':';
      else u[component] = value;
      setUrl(u.href);
    } catch (e) {}
  };

  return (
    <ToolLayout
      toolId="url-parser"
      title={t('tools.urlParser')}
      shortDesc={t('toolsDesc.urlParser')}
      wikiContent={'A robust offline URL parser and builder.\n\n- Deconstructs URLs into protocol, host, path, query params\n- Edit parameters dynamically\n- Instantly rebuild URL string\n- Standard URL evaluation'}
    >
      <div className="space-y-8 flex-1 flex flex-col min-h-0">
        <div className="glass-card rounded-xl p-8 border border-ios-border-light dark:border-ios-border-dark space-y-6">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('urlParams.rawInput')}</label>
             <button onClick={() => setUrl('')} className="text-ios-red hover:bg-ios-red/10 p-1.5 rounded-md transition-colors" title="Clear URL">
                <Trash2 size={16} />
             </button>
          </div>
          <div className="relative flex gap-4">
             <div className="relative flex-1">
               <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-4 py-4 pl-12 text-lg font-mono tracking-tight outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
                  placeholder="https://..."
               />
               <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-blue" size={20} />
             </div>
          </div>
        </div>

        {!parsed ? (
          <div className="flex-1 flex flex-col items-center justify-center text-ios-muted-light dark:text-ios-muted-dark gap-4 opacity-50 py-12">
             <Link size={48} strokeWidth={1} />
             <p className="font-semibold uppercase tracking-widest text-xs">{t('urlParams.invalid')}</p>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden min-h-[400px]">
            <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-8">
              <div className="glass-card rounded-xl p-6 bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark space-y-6">
                 <h3 className="text-xs font-semibold uppercase tracking-widest text-ios-blue flex items-center gap-2 border-b border-ios-border-light dark:border-ios-border-dark pb-3">
                    <Link size={14} /> Components Builder
                 </h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { label: 'Protocol', value: parsed.protocol.replace(':', ''), key: 'protocol' },
                      { label: 'Hostname', value: parsed.hostname, key: 'hostname' },
                      { label: 'Port', value: parsed.port, key: 'port' },
                      { label: 'Pathname', value: parsed.pathname, key: 'pathname' },
                      { label: 'Hash', value: parsed.hash.replace('#', ''), key: 'hash' },
                    ].map(item => (
                      <div key={item.label} className="group border-b border-ios-border-light/50 dark:border-ios-border-dark/50 pb-3 space-y-2">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest opacity-80">{item.label}</span>
                            <button onClick={() => handleCopy(item.value, item.label)} className="text-ios-muted-light dark:text-ios-muted-dark hover:text-ios-blue transition-colors">
                            {copied === item.label ? <Check size={12} className="text-ios-green" /> : <Copy size={12} />}
                            </button>
                         </div>
                         <input
                            type="text"
                            value={item.value}
                            onChange={(e) => updateComponent(item.key as any, e.target.value)}
                            className="bg-gray-50/50 dark:bg-[#2C2C2E]/50 border border-ios-border-light dark:border-ios-border-dark rounded-md px-3 py-1.5 font-mono text-sm w-full outline-none focus:border-ios-blue text-ios-text-light dark:text-ios-text-dark"
                         />
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card rounded-xl p-6 bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark space-y-6">
                 <div className="flex justify-between items-center border-b border-ios-border-light dark:border-ios-border-dark pb-3">
                   <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FF9500] flex items-center gap-2">
                      <Settings2 size={14} /> Query Parameters ({parsed.params.length})
                   </h3>
                   <button onClick={addParam} className="flex items-center gap-1 text-[10px] font-bold text-[#FF9500] bg-[#FF9500]/10 px-2 py-1 rounded hover:bg-[#FF9500]/20 transition-colors uppercase tracking-widest">
                     <Plus size={12} /> Add
                   </button>
                 </div>
                 <div className="space-y-4">
                    {parsed.params.map((p, i) => (
                      <div key={i} className="flex gap-2 items-center group">
                         <div className="flex-1 flex gap-2">
                            <input
                              type="text"
                              value={p.key}
                              onChange={(e) => updateUrlParam(p.key, e.target.value, p.value, i)}
                              className="w-1/3 bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark rounded-lg px-3 py-2 font-mono text-xs text-ios-blue outline-none focus:border-ios-blue"
                              placeholder="Key"
                            />
                            <input
                              type="text"
                              value={p.value}
                              onChange={(e) => updateUrlParam(p.key, p.key, e.target.value, i)}
                              className="flex-1 bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark rounded-lg px-3 py-2 font-mono text-xs text-ios-text-light dark:text-ios-text-dark outline-none focus:border-ios-blue"
                              placeholder="Value"
                            />
                         </div>
                         <button onClick={() => removeParam(i)} className="p-2 text-ios-red/40 hover:text-ios-red transition-colors">
                            <Trash2 size={16} />
                         </button>
                      </div>
                    ))}
                    {!parsed.params.length && <p className="text-ios-muted-light dark:text-ios-muted-dark opacity-60 text-xs italic py-2">No query parameters found.</p>}
                 </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col">
              <div className="glass-card rounded-xl p-8 bg-ios-blue text-white shadow-lg flex-1 flex flex-col gap-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Globe size={150} />
                 </div>
                 <div className="flex justify-between items-center relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Rebuilt Canonical URL</span>
                 </div>
                 <div className="flex-1 font-mono text-[13px] break-all selection:bg-white/20 select-all leading-relaxed opacity-90 relative z-10 overflow-y-auto pt-2 pb-6">
                    {parsed.href}
                 </div>
                 <button onClick={() => handleCopy(parsed.href, 'final')} className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold uppercase text-[10.5px] transition-all tracking-widest relative z-10">
                    {copied === 'final' ? 'Copied!' : t('urlParams.copyFull', 'Copy URL')}
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
