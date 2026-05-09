import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { Clock, RefreshCw, Copy, Check, Calendar, HardDrive } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);

export function TimeConverter() {
  const { t } = useTranslation();
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [isoDate, setIsoDate] = useState(new Date().toISOString());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const d = dayjs(parseInt(timestamp) * 1000);
      if (d.isValid()) {
        setIsoDate(d.format('YYYY-MM-DD HH:mm:ss'));
      }
    } catch (e) {}
  }, [timestamp]);

  const handleIsoChange = (val: string) => {
    setIsoDate(val);
    try {
      const d = dayjs(val);
      if (d.isValid()) {
        setTimestamp(Math.floor(d.valueOf() / 1000).toString());
      }
    } catch (e) {}
  };

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000).toString();
    setTimestamp(now);
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val); toast.success('Copied to clipboard');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="time"
      title={t('time.title')}
      shortDesc="A fully local, rapid Unix timestamp converting suite designed for developers."
      wikiContent={'A fully local, rapid Unix timestamp converting suite designed for developers. \n\nFeatures:\n- Automatic detection of seconds vs milliseconds\n- Standard ISO formatting\n- Timezone awareness (local processing implies accurate system-local translation)\n- Day of Year & Leap Year parsing'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="glass-card rounded-xl p-8 space-y-8 border border-ios-border-light dark:border-ios-border-dark shadow-sm">
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-semibold text-ios-text-light dark:text-ios-text-dark">{t('timeParams.conversionTool')}</h3>
             <button onClick={setNow} className="px-3 py-1.5 rounded-md bg-ios-blue text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90">
                <RefreshCw size={14} /> {t('timeParams.now')}
             </button>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest">{t('time.timestamp')} (seconds)</label>
            <div className="relative">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-lg px-4 py-4 pl-12 text-lg font-mono tracking-tight outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
              />
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-muted-light dark:text-ios-muted-dark" size={20} />
              <button 
                onClick={() => handleCopy(timestamp)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ios-blue p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-all cursor-pointer z-10"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 py-2">
            <div className="flex-1 h-px bg-ios-border-light dark:border-ios-border-dark" />
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
              <RefreshCw size={14} className="text-ios-blue rotate-90 animate-pulse" />
            </div>
            <div className="flex-1 h-px bg-ios-border-light dark:border-ios-border-dark" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest">{t('time.date')}</label>
            <div className="relative">
              <input
                type="text"
                value={isoDate}
                onChange={(e) => handleIsoChange(e.target.value)}
                className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-lg px-4 py-4 pl-12 text-lg font-mono tracking-tight outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-muted-light dark:text-ios-muted-dark" size={20} />
              <button 
                onClick={() => handleCopy(isoDate)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ios-blue p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-all cursor-pointer z-10"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-8 bg-ios-blue shadow-lg border-none text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <HardDrive size={150} />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <HardDrive size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-lg">{t('timeParams.sysTimeExplorer')}</h4>
              <p className="text-xs font-medium opacity-80">{t('timeParams.sysTimeDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[
              { label: t('timeParams.year'), val: dayjs(parseInt(timestamp) * 1000).year() },
              { label: t('timeParams.month'), val: dayjs(parseInt(timestamp) * 1000).month() + 1 },
              { label: t('timeParams.day'), val: dayjs(parseInt(timestamp) * 1000).date() },
              { label: t('timeParams.dayOfWeek'), val: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayjs(parseInt(timestamp) * 1000).day()] },
              { label: t('timeParams.dayOfYear'), val: dayjs(parseInt(timestamp) * 1000).dayOfYear() },
              { label: t('timeParams.isLeapYear'), val: dayjs(parseInt(timestamp) * 1000).isLeapYear() ? t('timeParams.yes') : t('timeParams.no') }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/10 border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">{item.label}</div>
                <div className="text-xl font-semibold mt-1">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
