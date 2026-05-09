import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import a11yPlugin from 'colord/plugins/a11y';
import { Palette, Copy, Check, Pipette, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';

extend([namesPlugin, a11yPlugin]);

export function ColorConverter() {
  const { t } = useTranslation();
  const [color, setColor] = useState('#007AFF');
  const [copied, setCopied] = useState<string | null>(null);

  const colorObj = colord(color);
  const hex = colorObj.toHex();
  const rgb = colorObj.toRgbString();
  const hsl = colorObj.toHslString();
  const contrast = colorObj.contrast();
  const isDark = colorObj.isDark();

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val); toast.success('Copied to clipboard');
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      toolId="color"
      title="Color Converter Suite"
      shortDesc="Elite toolkit to convert colors seamlessly and test accessibility contrast."
      wikiContent={'A complete color engine supporting HEX, RGB, and HSL formats. Featuring real-time contrast ratio assessment to ensure WAI-ARIA legibility. Automatically generates light and dark variants based on the input color.'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="glass-card rounded-xl p-8 space-y-10 border border-ios-border-light dark:border-ios-border-dark shadow-sm">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('colorParams.interactivePicker')}</label>
            <div className="flex gap-6 items-center">
              <input 
                type="color" 
                value={hex} 
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-20 rounded-2xl border-none outline-none cursor-pointer p-0 shadow-sm"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-6 py-4 outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm flex-1 text-2xl font-mono tracking-tight"
                placeholder="#007AFF"
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('colorParams.absoluteValues')}</span>
            <div className="space-y-3">
              {[
                { label: 'HEX', val: hex },
                { label: 'RGB', val: rgb },
                { label: 'HSL', val: hsl }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase">{item.label}</span>
                    <code className="text-sm font-semibold mt-1 dark:text-white">{item.val}</code>
                  </div>
                  <button onClick={() => handleCopy(item.val)} className="p-2.5 text-ios-blue hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all z-10 relative">
                    {copied === item.val ? <Check size={18} className="text-ios-green" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div 
            className="rounded-xl p-8 h-48 flex flex-col justify-end transition-colors duration-500 shadow-md relative overflow-hidden"
            style={{ backgroundColor: hex }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none">
              <Palette size={120} />
            </div>
            <div className="relative z-10">
              <h3 className={cn("text-3xl font-bold tracking-tight", isDark ? "text-white" : "text-black")}>
                {t('colorParams.dynamicPreview')}
              </h3>
              <p className={cn("text-sm font-semibold mt-2 opacity-80 flex items-center gap-2", isDark ? "text-white" : "text-black")}>
                {contrast >= 4.5 ? <Check size={16}/> : <Info size={16}/>}
                {t('colorParams.contrast')} {contrast.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 space-y-6 border border-ios-border-light dark:border-ios-border-dark shadow-sm">
            <h4 className="font-bold text-xs flex items-center gap-2 text-ios-text-light dark:text-ios-text-dark uppercase tracking-widest">
              <Palette size={16} className="text-ios-blue" /> {t('colorParams.generative')}
            </h4>
            
            <div className="space-y-4">
              <div>
                 <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest mb-2 block">{t('colorParams.tints')}</span>
                 <div className="grid grid-cols-10 gap-1.5">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-md shadow-sm cursor-pointer hover:scale-110 hover:z-10 transition-transform origin-center" 
                      style={{ backgroundColor: colorObj.lighten(i * 0.1).toHex() }}
                      onClick={() => setColor(colorObj.lighten(i * 0.1).toHex())}
                    />
                  ))}
                 </div>
              </div>
              
              <div>
                 <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest mb-2 block">{t('colorParams.shades')}</span>
                 <div className="grid grid-cols-10 gap-1.5">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-md shadow-sm cursor-pointer hover:scale-110 hover:z-10 transition-transform origin-center" 
                      style={{ backgroundColor: colorObj.darken(i * 0.1).toHex() }}
                      onClick={() => setColor(colorObj.darken(i * 0.1).toHex())}
                    />
                  ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
