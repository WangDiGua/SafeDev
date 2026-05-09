import React, { useState, useMemo } from 'react';
import * as Subnet from 'ip-subnet-calculator';
import { Network, Search, Globe, Shield, Info, Activity, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';

export function IpCalculator() {
  const { t } = useTranslation();
  const [ip, setIp] = useState('192.168.1.1');
  const [mask, setMask] = useState('24');

  const ipToBinaryStr = (ipStr: string) => {
    try {
      return ipStr.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.');
    } catch {
      return '';
    }
  };

  const toIpStr = (num: number) => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const result = useMemo(() => {
    try {
      const res = Subnet.calculate(ip, mask);
      return res && res.length > 0 ? res[0] : null;
    } catch {
      return null;
    }
  }, [ip, mask]);

  return (
    <ToolLayout
      toolId="ip-calc"
      title={t('tools.ipCalc')}
      shortDesc={t('toolsDesc.ipCalc')}
      wikiContent={'A complete CIDR IP subnet calculator.\n\n- Calculates Network and Broadcast addresses\n- Determines usable IP ranges for routing\n- Computes required subnet masks and total host capacities\n- Displays pure binary representation for easy reverse engineering'}
    >
      <div className="space-y-8">
        <div className="glass-card rounded-xl p-8 border border-ios-border-light dark:border-ios-border-dark space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('ipParams.ipAddress')}</label>
              <div className="relative">
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="bg-gray-50 dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark focus:border-ios-blue focus:ring-1 focus:ring-ios-blue rounded-xl px-4 py-4 pl-12 text-lg font-mono tracking-tight outline-none w-full transition-all text-ios-text-light dark:text-ios-text-dark"
                  placeholder="192.168.1.1"
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-ios-blue" size={20} />
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest px-1">{t('ipParams.cidrMask')} (/{mask})</label>
              <input 
                type="range" min="0" max="32" value={mask} 
                onChange={(e) => setMask(e.target.value)}
                className="w-full h-1.5 bg-gray-200 dark:bg-[#3C3C3E] rounded-full appearance-none cursor-pointer accent-ios-blue"
              />
            </div>

            <div className="rounded-xl p-4 bg-ios-blue/5 border border-ios-blue/20 flex items-center gap-4">
              <Shield className="text-ios-blue shrink-0" size={24} strokeWidth={2} />
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-ios-blue tracking-widest">{t('ipParams.classDetection')}</p>
                <p className="text-sm font-semibold opacity-80 text-ios-text-light dark:text-ios-text-dark">
                  {ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.') ? t('ipParams.private', 'Private Network') : t('ipParams.public', 'Public Network')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {!result ? (
          <div className="flex-1 flex flex-col items-center justify-center text-ios-muted-light dark:text-ios-muted-dark gap-4 opacity-50 py-12">
            <Terminal size={48} strokeWidth={1} />
            <p className="font-semibold uppercase tracking-widest text-xs">{t('ipParams.invalid')}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'CIDR', value: result.ipLowStr + '/' + result.prefixSize, icon: Network },
                { label: t('ipParams.networkAddress'), value: result.ipLowStr, icon: Activity },
                { label: t('ipParams.broadcastAddress'), value: result.ipHighStr, icon: Info },
                { label: t('ipParams.usableRange'), value: `${result.ipHigh - result.ipLow > 1 ? toIpStr(result.ipLow + 1) : result.ipLowStr} - \n${result.ipHigh - result.ipLow > 1 ? toIpStr(result.ipHigh - 1) : result.ipHighStr}`, icon: Globe },
                { label: t('ipParams.totalHosts'), value: (result.ipHigh - result.ipLow > 1 ? result.ipHigh - result.ipLow - 1 : result.ipHigh - result.ipLow + 1).toLocaleString() + ' Usable', icon: Search },
                { label: t('ipParams.subnetMask'), value: result.prefixMaskStr, icon: Shield },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-6 bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark space-y-4 group transition-all hover:border-ios-border-dark">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-ios-muted-light dark:text-ios-muted-dark uppercase tracking-widest">{item.label}</span>
                    <item.icon size={16} className="text-ios-blue opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100" />
                  </div>
                  <div className="text-lg font-semibold tracking-tight text-ios-text-light dark:text-ios-text-dark break-words whitespace-pre-wrap">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="glass-card rounded-xl p-8 bg-black text-white shadow-xl space-y-4 overflow-hidden border border-gray-800 relative">
              <div className="flex justify-between items-center opacity-60">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00FF00]">Binary Layout</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 pt-4">
                 <div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">IP Address</p>
                   <p className="font-mono text-sm tracking-widest text-[#00FF00]">{ipToBinaryStr(ip)}</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Subnet Mask</p>
                   <p className="font-mono text-sm tracking-widest text-[#00FF00]">{ipToBinaryStr(result.prefixMaskStr)}</p>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
