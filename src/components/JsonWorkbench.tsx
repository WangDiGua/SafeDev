import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { 
 Braces, TreeDeciduous, Copy, Trash2, 
 Search, Check, Info, Sparkles, ChevronRight, ChevronDown
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import Editor from '@monaco-editor/react';
import { cn } from '../lib/utils';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import { useAppStore } from '../store/useAppStore';

export function JsonWorkbench() {
 const { t } = useTranslation();
 const theme = useAppStore(s => s.theme);
 const [input, setInput] = useState('{\n "project": "SafeDev",\n "features": ["Secure", "Local-first"],\n "version": 1.0\n}');
 const [viewMode, setViewMode] = useState<'source' | 'tree' | 'schema'>('source');
 const [isCopied, setIsCopied] = useState(false);
 const [treeSearch, setTreeSearch] = useState('');
 const [activePath, setActivePath] = useState('');

 const { data, error } = useMemo(() => {
 try {
 if (!input.trim()) return { data: null, error: null };
 return { data: JSON.parse(input), error: null };
 } catch (e: any) {
 return { data: null, error: e.message };
 }
 }, [input]);

 const schema = useMemo(() => {
 if (!data) return null;
 return inferSchema(data);
 }, [data]);

 const handleFormat = () => {
 if (data) setInput(JSON.stringify(data, null, 2));
 };

 const handleMinify = () => {
 if (data) setInput(JSON.stringify(data));
 };

 const handleCopy = () => {
 const textToCopy = viewMode === 'schema' ? JSON.stringify(schema, null, 2) : input;
 navigator.clipboard.writeText(textToCopy);
 setIsCopied(true);
    toast.success('Copied to clipboard');
 setTimeout(() => setIsCopied(false), 2000);
 };

 return (
 <ToolLayout
 toolId="json"
 title={t('json.title')}
 shortDesc={t('json.desc')}
 wikiContent={WIKI_CONTENT.json}
 >
 <div className="space-y-6">
 {/* Segmented Control */}
 <div className="flex justify-center border-b border-ios-border-light dark:border-ios-border-dark pb-6">
 <div className="inline-flex p-1 bg-gray-100 dark:bg-[#2C2C2E] rounded-lg shadow-inner relative">
 <motion.div 
 layoutId="viewTabJson"
 className="absolute inset-y-1 bg-white dark:bg-[#222] rounded-md shadow-sm border border-ios-border-light dark:border-white/10"
 initial={false}
 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
 style={{ 
 left: viewMode === 'source' ? '4px' : viewMode === 'tree' ? 'calc(33.3% + 2px)' : 'calc(66.6% + 2px)',
 width: 'calc(33.3% - 6px)'
 }}
 />
 <button 
 onClick={() => setViewMode('source')}
 className={cn(
 "relative z-10 px-6 py-2 text-xs font-semibold transition-colors flex items-center gap-2",
 viewMode === 'source' ? "text-blue-500" : "text-gray-500"
 )}
 >
 <Braces size={14} /> Source
 </button>
 <button 
 onClick={() => setViewMode('tree')}
 className={cn(
 "relative z-10 px-6 py-2 text-xs font-semibold transition-colors flex items-center gap-2",
 viewMode === 'tree' ? "text-blue-500" : "text-gray-500"
 )}
 >
 <TreeDeciduous size={14} /> Tree
 </button>
 <button 
 onClick={() => setViewMode('schema')}
 className={cn(
 "relative z-10 px-6 py-2 text-xs font-semibold transition-colors flex items-center gap-2",
 viewMode === 'schema' ? "text-blue-500" : "text-gray-500"
 )}
 >
 <Sparkles size={14} /> Schema
 </button>
 </div>
 </div>

 <div className="glass-card rounded-xl overflow-hidden h-[600px] flex flex-col border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="flex items-center justify-between px-4 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E]">
 <div className="flex items-center gap-4">
 {viewMode === 'source' ? (
 <div className="flex items-center gap-2">
 <button 
 onClick={handleFormat} 
 disabled={!!error}
 className="bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 py-1 px-3 text-xs disabled:opacity-50"
 >
 <Sparkles size={12} /> {t('json.pretty')}
 </button>
 <button 
 onClick={handleMinify} 
 disabled={!!error}
 className="bg-gray-100 hover:bg-gray-200 dark:bg-[#222] dark:hover:bg-[#333] text-ios-text-light dark:text-ios-text-dark rounded-lg transition-colors font-medium border border-ios-border-light dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-center gap-2 py-1 px-3 text-xs disabled:opacity-50"
 >
 {t('json.minify')}
 </button>
 </div>
 ) : viewMode === 'tree' ? (
 <div className="flex items-center gap-3">
 <div className="relative">
 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500/50" />
 <input 
 value={treeSearch}
 onChange={(e) => setTreeSearch(e.target.value)}
 placeholder="Filter nodes..."
 className="bg-white dark:bg-[#2C2C2E] pr-4 py-1.5 text-xs font-medium pl-9 outline-none border border-ios-border-light dark:border-ios-border-dark rounded-md w-48 focus:border-blue-500 focus:ring-1 focus:ring-ios-blue transition-all"
 />
 </div>
 {activePath && (
 <div className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-left-2 truncate max-w-xs">
 <span className="opacity-60 text-[10px]">PATH:</span>
 {activePath}
 </div>
 )}
 </div>
 ) : (
 <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Inferred Schema</span>
 )}
 </div>
 
 <div className="flex items-center gap-2">
 <AnimatePresence mode="wait">
 {isCopied ? (
 <motion.span 
 key="copied"
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.8 }}
 className="text-xs font-bold text-green-500 flex items-center gap-1"
 >
 <Check size={14} strokeWidth={3} /> Copied
 </motion.span>
 ) : (
 <button 
 key="copy"
 onClick={handleCopy}
 className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-md text-gray-500 hover:text-black dark:hover:text-white transition-colors"
 title="Copy content"
 >
 <Copy size={16} />
 </button>
 )}
 </AnimatePresence>
 <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1" />
 <button 
 onClick={() => setInput('')}
 className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md text-gray-500 hover:text-red-500 transition-colors"
 title="Clear all"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </div>

 <div className="flex-1 min-h-0 bg-white dark:bg-[#1C1C1E] relative">
 {viewMode === 'source' ? (
 <Editor
 height="100%"
 defaultLanguage="json"
 value={input}
 onChange={(val) => setInput(val || '')}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 minimap: { enabled: false },
 fontSize: 14,
 wordWrap: 'on',
 scrollBeyondLastLine: false,
 lineNumbersMinChars: 3,
 folding: true,
 fontFamily: 'var(--font-mono)'
 }}
 />
 ) : viewMode === 'tree' ? (
 <div className="h-full p-6 overflow-y-auto font-mono text-sm bg-gray-50 dark:bg-[#1C1C1E]">
 {data ? (
 <JsonTreeNode 
 name="root" 
 value={data} 
 depth={0} 
 search={treeSearch} 
 path=""
 onPathHover={setActivePath}
 />
 ) : (
 <div className="h-full flex flex-col items-center justify-center text-gray-500/40 gap-4">
 <Braces size={48} strokeWidth={1} />
 <p className="text-sm font-semibold uppercase tracking-widest">{error || 'Invalid Structure'}</p>
 </div>
 )}
 </div>
 ) : (
 <div className="h-full bg-gray-50 dark:bg-[#1C1C1E]">
 {schema ? (
 <Editor
 height="100%"
 defaultLanguage="json"
 value={JSON.stringify(schema, null, 2)}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 readOnly: true,
 minimap: { enabled: false },
 fontSize: 14,
 scrollBeyondLastLine: false,
 fontFamily: 'var(--font-mono)'
 }}
 />
 ) : (
 <div className="h-full flex flex-col items-center justify-center text-gray-500/40 gap-4">
 <Sparkles size={48} strokeWidth={1} />
 <p className="text-sm font-semibold uppercase tracking-widest">Schema Unavailable</p>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Status Bar */}
 <div className="px-4 py-2 border-t border-ios-border-light dark:border-ios-border-dark bg-gray-50 dark:bg-[#1C1C1E] flex items-center justify-between text-xs">
 <div className="flex items-center gap-6 text-gray-500">
 <div className="space-x-1">
 <span className="font-semibold uppercase text-[10px]">Nodes:</span>
 <span className="font-mono tabular-nums text-black dark:text-white">
 {data ? countNodes(data) : 0}
 </span>
 </div>
 <div className="space-x-1">
 <span className="font-semibold uppercase text-[10px]">Size:</span>
 <span className="font-mono tabular-nums text-black dark:text-white">
 {(new Blob([input]).size / 1024).toFixed(2)} KB
 </span>
 </div>
 </div>
 
 <div className="flex items-center gap-2">
 {error ? (
 <span className="flex items-center gap-1 text-red-500 font-medium">
 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
 Validation Failed
 </span>
 ) : (
 <span className="flex items-center gap-1 text-green-500 font-medium">
 <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(52,199,89,0.4)]" />
 Valid JSON
 </span>
 )}
 </div>
 </div>
 </div>

 <AnimatePresence>
 {error && viewMode !== 'tree' && (
 <motion.div 
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4 flex items-start gap-3 text-red-600 dark:text-red-400"
 >
 <Info size={16} className="mt-0.5 shrink-0" />
 <div>
 <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Syntax Error</p>
 <p className="text-sm font-medium">{error}</p>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </ToolLayout>
 );
}

function JsonTreeNode({ 
 name, value, depth, search, path, onPathHover 
}: { 
 name: string, value: any, depth: number, search: string, path: string, onPathHover: (path: string) => void 
}) {
 const [collapsed, setCollapsed] = useState(depth > 2); // Collapse by default for deeper nests
 const isObject = value !== null && typeof value === 'object';
 const isArray = Array.isArray(value);
 const currentPath = depth === 0 ? "" : (path ? `${path}.${name}` : name);

 const entries = useMemo(() => {
 if (!isObject) return [];
 let items = Object.entries(value);
 if (search) {
 items = items.filter(([k, v]) => 
 k.toLowerCase().includes(search.toLowerCase()) || 
 String(v).toLowerCase().includes(search.toLowerCase())
 );
 }
 return items;
 }, [value, isObject, search]);

 const toggle = () => setCollapsed(!collapsed);

 if (search && !isObject && !name.toLowerCase().includes(search.toLowerCase()) && !String(value).toLowerCase().includes(search.toLowerCase())) {
 return null;
 }

 return (
 <div className="select-none py-0.5">
 <motion.div 
 className={cn(
 "flex items-center gap-1 group cursor-pointer hover:bg-gray-100 dark:hover:bg-[#111] rounded-md px-1 py-1 transition-colors text-[13px]",
 )}
 onMouseEnter={() => currentPath && onPathHover(currentPath)}
 onClick={isObject ? toggle : undefined}
 >
 {isObject ? (
 <div className="w-5 flex items-center justify-center shrink-0">
 {collapsed ? <ChevronRight size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-blue-500" />}
 </div>
 ) : (
 <div className="w-5 shrink-0" />
 )}
 
 <span className={cn(
 "font-semibold",
 depth === 0 ? "text-blue-500" : "text-black dark:text-white"
 )}>
 {depth > 0 && <span className="font-medium mr-1.5 opacity-80">"{name}":</span>}
 </span>

 {!isObject ? (
 <span className={cn(
 "font-mono font-medium truncate",
 typeof value === 'string' ? "text-green-600 dark:text-green-400" : 
 typeof value === 'number' ? "text-orange-500" : 
 typeof value === 'boolean' ? "text-blue-500" : "text-gray-400"
 )}>
 {typeof value === 'string' ? `"${value}"` : String(value)}
 </span>
 ) : (
 <span className="text-[10px] text-gray-500 font-medium opacity-60 ml-1">
 {isArray ? `Array(${entries.length})` : `Object{${entries.length}}`}
 </span>
 )}
 </motion.div>

 <AnimatePresence>
 {isObject && !collapsed && (
 <motion.div 
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: 'auto' }}
 exit={{ opacity: 0, height: 0 }}
 className="pl-5 border-l border-ios-border-light dark:border-[#222] ml-2.5 overflow-hidden"
 >
 {entries.length > 0 ? entries.map(([k, v]) => (
 <JsonTreeNode 
 key={k} 
 name={k} 
 value={v} 
 depth={depth + 1} 
 search={search} 
 path={currentPath}
 onPathHover={onPathHover}
 />
 )) : search ? (
 <div className="text-[10px] uppercase text-gray-500 py-1 pl-2">No matching children</div>
 ) : null}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
}

function countNodes(obj: any): number {
 if (obj === null || typeof obj !== 'object') return 1;
 let count = 1;
 for (const key in obj) {
 if (Object.prototype.hasOwnProperty.call(obj, key)) {
 count += countNodes(obj[key]);
 }
 }
 return count;
}

function inferSchema(obj: any): any {
 if (Array.isArray(obj)) {
 return {
 type: "array",
 items: obj.length > 0 ? inferSchema(obj[0]) : {}
 };
 } else if (obj !== null && typeof obj === 'object') {
 const properties: any = {};
 Object.entries(obj).forEach(([k, v]) => {
 properties[k] = inferSchema(v);
 });
 return {
 type: "object",
 properties,
 required: Object.keys(obj)
 };
 } else {
 return { type: typeof obj };
 }
}
