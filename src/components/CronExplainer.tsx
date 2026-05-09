import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import cronstrue from 'cronstrue';
import * as cronParser from 'cron-parser';
import { Calendar, RefreshCw, Info, Clock, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function CronExplainer() {
 const { t } = useTranslation();
 const [expression, setExpression] = useState('0 12 * * *');
 
 const { explanation, nextDates, error } = useMemo(() => {
 if (!expression) return { explanation: '', nextDates: [], error: null };
 try {
 const expl = cronstrue.toString(expression, { use24HourTimeFormat: true });
 // @ts-ignore
 const interval = cronParser.parseExpression(expression);
 const next = [];
 for (let i = 0; i < 5; i++) {
 next.push(interval.next().toString());
 }
 return { explanation: expl, nextDates: next, error: null };
 } catch (e: any) {
 return { explanation: '', nextDates: [], error: e.message };
 }
 }, [expression]);

 const examples = [
 { label: t('cronParams.everyMinute'), exp: '* * * * *' },
 { label: t('cronParams.everyHour'), exp: '0 * * * *' },
 { label: t('cronParams.midnightDaily'), exp: '0 0 * * *' },
 { label: t('cronParams.weeklySun'), exp: '0 0 * * 0' },
 { label: t('cronParams.weekdays'), exp: '0 9-17 * * 1-5' },
 ];

 return (
 <ToolLayout
 toolId="cron"
 title={t('tools.cron')}
 shortDesc={t('toolsDesc.cron')}
 wikiContent={'A powerful reverse-engineering tool for Cron expressions.\n\nProvides human-readable translations and calculates the next execution dates based on standard Unix Cron syntax.'}
 >
 <div className="space-y-8 flex-1 flex flex-col min-h-0">
 <div className="glass-card rounded-xl p-10 bg-white/40 dark:bg-black/40 backdrop-blur-md space-y-8">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">{t('cronParams.expression')}</label>
 <div className="relative">
 <input
 type="text"
 value={expression}
 onChange={(e) => setExpression(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full text-2xl font-mono tracking-tight py-6 pl-12 focus:scale-[1.01]"
 placeholder="* * * * *"
 />
 <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500/40" size={20} />
 </div>
 {error && <p className="text-xs font-black text-red-500 mt-2 flex items-center gap-2 px-1"><Info size={14} /> {error}</p>}
 </div>

 <div className="flex flex-wrap gap-2">
 {examples.map((ex) => (
 <button
 key={ex.exp}
 onClick={() => setExpression(ex.exp)}
 className="px-4 py-2 rounded-xl bg-ios-bg-light dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark text-[10px] font-black uppercase text-gray-500 hover:text-blue-500 hover:border-blue-500/30 transition-all"
 >
 {ex.label}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden pb-8">
 <div className="flex flex-col glass-card rounded-xl p-10 bg-blue-500 text-white shadow-2xl justify-center gap-6">
 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
 <Info size={24} />
 </div>
 <div>
 <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{t('cronParams.interpretation')}</span>
 <h3 className="text-3xl font-black mt-2 leading-tight tracking-tight">
 {explanation || t('cronParams.invalid')}
 </h3>
 </div>
 </div>

 <div className="flex flex-col glass-card rounded-xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-md">
 <div className="px-8 py-4 border-b border-ios-border-light dark:border-ios-border-dark bg-white/10 flex justify-between items-center">
 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('cronParams.upcoming')}</span>
 <Clock size={16} className="text-blue-500" />
 </div>
 <div className="p-8 space-y-4">
 {nextDates.map((date, i) => (
 <div key={i} className="flex items-center gap-4 group">
 <span className="w-8 h-8 rounded-full bg-blue-500/5 flex items-center justify-center text-[10px] font-black text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
 {i + 1}
 </span>
 <span className="text-sm font-bold text-gray-500 dark:text-white/80">{date}</span>
 </div>
 ))}
 {!nextDates.length && <p className="text-gray-500/30 italic text-sm">{t('cronParams.noFuture')}</p>}
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
