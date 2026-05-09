import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import QRCode from 'qrcode';
import { LayoutGrid, Download, Palette, RefreshCw, Copy, Check, FileImage } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';

export function QrCodeLab() {
 const { t } = useTranslation();
 const [text, setText] = useState('https://safedev.io');
 const [color, setColor] = useState('#000000');
 const [bgColor, setBgColor] = useState('#ffffff');
 const [size, setSize] = useState(300);
 const [dataUrl, setDataUrl] = useState('');
 const [copied, setCopied] = useState(false);
 const canvasRef = useRef<HTMLCanvasElement>(null);

 const generate = async () => {
 if (!text) {
 setDataUrl('');
 return;
 }
 try {
 const url = await QRCode.toDataURL(text, {
 width: size,
 margin: 2,
 color: {
 dark: color,
 light: bgColor,
 },
 });
 setDataUrl(url);
 } catch (err) {
 console.error(err);
 }
 };

 useEffect(() => {
 generate();
 }, [text, color, bgColor, size]);

 const handleDownload = () => {
 const a = document.createElement('a');
 a.href = dataUrl;
 a.download = 'qrcode.png';
 a.click(); toast.success('File downloaded');
 };

 return (
 <ToolLayout
 toolId="qrcode"
 title={t('tools.qrcode')}
 shortDesc={t('toolsDesc.qrcode')}
 wikiContent={'Generate high-quality QR codes entirely in the browser.\n\n- Supports custom foreground/background colors\n- Adjustable resolution up to 1024px\n- 0 data leaves your device'}
 >
 <div className="space-y-8 flex-1 flex flex-col min-h-0">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pb-8">
 <div className="glass-card rounded-xl p-10 space-y-8 bg-white/40 dark:bg-black/40 backdrop-blur-md">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Content (URL or Text)</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm w-full min-h-[120px] py-6 text-sm font-bold resize-none"
 placeholder="Type here..."
 />
 </div>

 <div className="grid grid-cols-2 gap-6">
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Foreground</label>
 <div className="flex gap-4 items-center">
 <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-12 h-12 rounded-xl border-none cursor-pointer" />
 <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm flex-1 px-3 py-3 font-mono text-[10px] uppercase" />
 </div>
 </div>
 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Background</label>
 <div className="flex gap-4 items-center">
 <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-12 rounded-xl border-none cursor-pointer" />
 <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all placeholder:text-gray-400 dark:text-white shadow-sm flex-1 px-3 py-3 font-mono text-[10px] uppercase" />
 </div>
 </div>
 </div>

 <div className="space-y-4">
 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Resolution: {size}px</label>
 <input 
 type="range" min="128" max="1024" step="64" value={size} 
 onChange={(e) => setSize(parseInt(e.target.value))}
 className="w-full h-1.5 bg-ios-bg-light dark:bg-[#2C2C2E] rounded-full appearance-none cursor-pointer accent-ios-blue"
 />
 </div>
 </div>

 <div className="flex flex-col gap-6">
 <div className="glass-card rounded-xl p-10 bg-white dark:bg-[#1C1C1E] shadow-2xl flex flex-col items-center gap-10">
 <div className="p-8 rounded-[2rem] bg-ios-bg-light dark:bg-[#2C2C2E] border-4 border-blue-500/5 shadow-inner">
 {dataUrl ? (
 <img src={dataUrl} alt="QR Code" className="w-64 h-64 transition-transform hover:scale-105 duration-500" />
 ) : (
 <div className="w-64 h-64 flex items-center justify-center text-gray-500/20">
 <LayoutGrid size={64} />
 </div>
 )}
 </div>
 
 <div className="w-full flex gap-4">
 <button onClick={handleDownload} disabled={!dataUrl} className=" bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium border border-blue-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 flex-1 py-4 text-base">
 <Download size={20} className="mr-2" /> Download PNG
 </button>
 <button onClick={() => {
 navigator.clipboard.write([new ClipboardItem({ 'image/png': fetch(dataUrl).then(r => r.blob()) })]);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 }} disabled={!dataUrl} className=" bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 py-4 px-6">
 {copied ? <Check className="text-green-500" /> : <FileImage />}
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
