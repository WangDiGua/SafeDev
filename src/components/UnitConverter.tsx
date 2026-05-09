import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { ArrowRightLeft, Scale, Ruler, Thermometer, Zap, Info, RefreshCw, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';

type UnitType = 'length' | 'weight' | 'temp' | 'data';

const UNITS: Record<UnitType, { label: string, icon: any, units: Record<string, number | ((v: number, to: boolean) => number)> }> = {
  length: {
    label: 'Length',
    icon: Ruler,
    units: {
      'Meter (m)': 1,
      'Kilometer (km)': 1000,
      'Centimeter (cm)': 0.01,
      'Millimeter (mm)': 0.001,
      'Mile (mi)': 1609.34,
      'Yard (yd)': 0.9144,
      'Foot (ft)': 0.3048,
      'Inch (in)': 0.0254
    }
  },
  weight: {
    label: 'Weight',
    icon: Scale,
    units: {
      'Gram (g)': 1,
      'Kilogram (kg)': 1000,
      'Milligram (mg)': 0.001,
      'Metric Ton (t)': 1000000,
      'Pound (lb)': 453.592,
      'Ounce (oz)': 28.3495
    }
  },
  temp: {
    label: 'Temperature',
    icon: Thermometer,
    units: {
      'Celsius (°C)': 1,
      'Fahrenheit (°F)': (v: number, to: boolean) => to ? (v * 9/5) + 32 : (v - 32) * 5/9,
      'Kelvin (K)': (v: number, to: boolean) => to ? v + 273.15 : v - 273.15
    }
  },
  data: {
    label: 'Digital Data',
    icon: Zap,
    units: {
      'Byte (B)': 1,
      'Kilobyte (KB)': 1024,
      'Megabyte (MB)': 1024 ** 2,
      'Gigabyte (GB)': 1024 ** 3,
      'Terabyte (TB)': 1024 ** 4,
      'Petabyte (PB)': 1024 ** 5
    }
  }
};

export function UnitConverter() {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<UnitType>('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(Object.keys(UNITS.length.units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(UNITS.length.units)[1]);
  const [copied, setCopied] = useState(false);

  const convertedValue = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return '0';

    const currentUnits = UNITS[activeType].units;
    const fromFactor = currentUnits[fromUnit];
    const toFactor = currentUnits[toUnit];

    let baseValue = 0;
    if (typeof fromFactor === 'function') {
      baseValue = fromFactor(v, false);
    } else {
      baseValue = v * fromFactor;
    }

    if (typeof toFactor === 'function') {
      return toFactor(baseValue, true).toFixed(4);
    } else {
      return (baseValue / toFactor).toFixed(4);
    }
  }, [value, fromUnit, toUnit, activeType]);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedValue);
    toast.success('Copied to clipboard');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      toolId="unit-convert"
      title={t('tools.unitConvert')}
      shortDesc={t('toolsDesc.unitConvert')}
      wikiContent={'A comprehensive toolkit for converting standard SI units and imperial scales.\n\n- Supports Length, Weight, Temperature, and Data volume\n- High-precision JavaScript math (up to 4 decimal places)\n- Uses scientifically accurate conversion factors'}
    >
      <div className="space-y-8 flex-1 flex flex-col min-h-0">
        <div className="glass-card rounded-xl bg-gray-50 dark:bg-[#1C1C1E] p-2 flex gap-2 w-fit mx-auto border border-ios-border-light dark:border-ios-border-dark flex-wrap justify-center shadow-sm">
          {(Object.keys(UNITS) as UnitType[]).map((type) => {
            const Icon = UNITS[type].icon;
            return (
              <button
                key={type}
                onClick={() => {
                  setActiveType(type);
                  setFromUnit(Object.keys(UNITS[type].units)[0]);
                  setToUnit(Object.keys(UNITS[type].units)[1]);
                }}
                className={cn(
                  "px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2",
                  activeType === type 
                  ? "bg-white dark:bg-[#2C2C2E] text-ios-blue shadow-sm border border-ios-border-light dark:border-ios-border-dark" 
                  : "text-ios-muted-light dark:text-ios-muted-dark hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                )}
              >
                <Icon size={14} /> {UNITS[type].label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 items-start">
          <div className="glass-card rounded-xl p-8 bg-white dark:bg-[#1C1C1E] shadow-sm border border-ios-border-light dark:border-ios-border-dark space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('unitParams.sourceValue')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-4 py-4 text-xl font-mono tracking-tight outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
                  />
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-4 py-4 text-sm font-semibold outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
                  >
                    {Object.keys(UNITS[activeType].units).map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 py-2">
                <div className="flex-1 h-px bg-ios-border-light dark:border-ios-border-dark" />
                <button 
                  onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit); }}
                  className="w-10 h-10 rounded-full border border-ios-border-light dark:border-ios-border-dark flex items-center justify-center text-ios-blue hover:bg-ios-blue hover:text-white transition-all active:scale-95 shadow-sm"
                  title="Swap Units"
                >
                  <RefreshCw size={18} />
                </button>
                <div className="flex-1 h-px bg-ios-border-light dark:border-ios-border-dark" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('unitParams.targetUnit')}</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-4 py-4 text-sm font-semibold outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
                >
                  {Object.keys(UNITS[activeType].units).map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-10 bg-ios-blue text-white shadow-lg flex flex-col justify-center gap-4 relative overflow-hidden border-none min-h-[300px]">
              <div className="absolute top-10 right-10 opacity-[0.08] pointer-events-none">
                <ArrowRightLeft size={180} />
              </div>
              <div className="relative z-10 space-y-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t('unitParams.resultOutput')}</span>
                 <div className="text-5xl font-bold tracking-tight break-all">
                   {convertedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                 </div>
                 <div className="text-xl font-medium opacity-90">{toUnit}</div>
                 
                 <div className="mt-8">
                   <button 
                     onClick={handleCopy}
                     className="px-6 py-2.5 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-ios-blue transition-all flex items-center gap-2 w-max"
                   >
                     {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : t('unitParams.copyResult')}
                   </button>
                 </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 bg-ios-blue/5 border border-ios-blue/10 flex items-start gap-4">
              <Info className="text-ios-blue shrink-0 mt-0.5 pointer-events-none" size={20} />
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-ios-blue tracking-widest">{t('unitParams.precisionFact')}</p>
                <p className="text-xs font-medium text-ios-muted-light dark:text-ios-muted-dark leading-relaxed">
                  {t('unitParams.precisionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
