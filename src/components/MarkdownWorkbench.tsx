import React, { useState, useMemo, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { 
 FileEdit, Eye, FileText, Download, Copy, Trash2, 
 Maximize2, Minimize2, Sparkles, BookOpen, 
 TableOfContents as TOCIcon, Settings, Type, AlignLeft
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import mermaid from 'mermaid';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../store/useAppStore';

// Initialize mermaid
mermaid.initialize({
 startOnLoad: false,
 theme: 'default',
 securityLevel: 'loose',
 fontFamily: 'var(--font-sans)',
});

export function MarkdownWorkbench() {
 const { t } = useTranslation();
 const theme = useAppStore(s => s.theme);
 const [markdown, setMarkdown] = useState(`# SafeDev Markdown Lab\n\nWelcome to the **Extreme** Markdown workbench. \n\n## 1. Diagrams (Mermaid)\n\n\`\`\`mermaid\ngraph TD\n A[Start] --> B{Is it safe?}\n B -- Yes --> C[Process]\n B -- No --> D[Secure]\n C --> E[End]\n D --> E\n\`\`\`\n\n## 2. Advanced Typography\n- Real-time rendering\n- GitHub Flavored Markdown\n- Secure & Private\n- Mobile Friendly\n\n\`\`\`javascript\nconsole.log("Extreme Performance");\n\`\`\`\n\n> "Design is not just what it looks like and feels like. Design is how it works."\n\n### 3. Task Management\n- [x] Implement Markdown\n- [x] Add Mermaid Support\n- [ ] Export to PDF\n- [ ] Multi-thread Render`);
 const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>('split');
 const [isFullScreen, setIsFullScreen] = useState(false);
 const [showTOC, setShowTOC] = useState(false);
 const previewRef = useRef<HTMLDivElement>(null);

 const html = useMemo(() => {
 const rawHtml = marked.parse(markdown) as string;
 return DOMPurify.sanitize(rawHtml);
 }, [markdown]);

 const toc = useMemo(() => {
 const headings = Array.from(markdown.matchAll(/^#{1,4}\s+(.+)$/gm));
 return headings.map(h => ({
 level: h[0].trim().split(' ')[0].length,
 text: h[1].trim()
 }));
 }, [markdown]);

 useEffect(() => {
 if (previewRef.current) {
 mermaid.run({
 nodes: Array.from(previewRef.current.querySelectorAll('.language-mermaid')),
 }).catch(err => console.error('Mermaid error:', err));
 }
 }, [html, viewMode]);

 const handleDownload = () => {
 const blob = new Blob([markdown], { type: 'text/markdown' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = 'document.md';
 a.click(); toast.success('File downloaded');
 URL.revokeObjectURL(url);
 };

 return (
 <ToolLayout
 toolId="markdown"
 title={t('markdown.title')}
 shortDesc="Elite real-time Markdown lab with Mermaid diagram engine."
 wikiContent={WIKI_CONTENT.markdown}
 >
 <div className={cn(
 "flex flex-col gap-6 h-full min-h-[700px] transition-all duration-300",
 isFullScreen ? "fixed inset-0 z-[100] bg-[#f9fafb] dark:bg-[#000] p-6 lg:p-10" : ""
 )}>
 {/* Toolbar */}
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-ios-bg-light dark:bg-[#2C2C2E] rounded-lg border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="flex items-center gap-1 p-1 bg-gray-200/50 dark:bg-[#222] rounded-md">
 {(['editor', 'preview', 'split'] as const).map(mode => (
 <button
 key={mode}
 onClick={() => setViewMode(mode)}
 className={cn(
 "px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-widest transition-all",
 viewMode === mode ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
 )}
 >
 {mode}
 </button>
 ))}
 </div>

 <div className="flex items-center gap-2">
 <button
 onClick={() => setShowTOC(!showTOC)}
 className={cn(
 "p-2 rounded-md transition-all",
 showTOC ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500"
 )}
 title="Toggle Table of Contents"
 >
 <TOCIcon size={18} />
 </button>
 <button
 onClick={() => setIsFullScreen(!isFullScreen)}
 className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 transition-all"
 title="Toggle Fullscreen"
 >
 {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
 </button>
 <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
 <button
 onClick={handleDownload}
 className="p-2 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 transition-all font-semibold flex items-center gap-2 text-sm"
 >
 <Download size={18} /> <span className="hidden sm:inline">Export</span>
 </button>
 </div>
 </div>

 <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
 {/* TOC Sidebar */}
 <AnimatePresence>
 {showTOC && (
 <motion.aside
 initial={{ opacity: 0, x: -20, width: 0 }}
 animate={{ opacity: 1, x: 0, width: '280px' }}
 exit={{ opacity: 0, x: -20, width: 0 }}
 className="lg:col-span-3 overflow-hidden flex flex-col glass-card rounded-xl"
 >
 <div className="p-5 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
 <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
    <AlignLeft size={16} /> Document Outline
 </h3>
 </div>
 <div className="flex-1 overflow-y-auto p-5">
 <nav className="space-y-3">
 {toc.map((item, idx) => (
 <div 
 key={idx}
 className={cn(
 "text-sm font-medium transition-colors cursor-pointer hover:text-blue-600 dark:hover:text-blue-400",
 item.level === 1 ? "text-ios-text-light dark:text-ios-text-dark mt-6 first:mt-0 font-bold" : "text-gray-600 dark:text-gray-400",
 item.level === 2 ? "pl-3" : item.level === 3 ? "pl-6" : "pl-9"
 )}
 >
 {item.text}
 </div>
 ))}
 </nav>
 </div>
 </motion.aside>
 )}
 </AnimatePresence>

 <div className={cn(
 "flex-1 flex flex-col gap-6 transition-all duration-300",
 showTOC ? "lg:col-span-9" : "lg:col-span-12"
 )}>
 <div className={cn(
 "grid gap-6 h-full",
 viewMode === 'split' ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
 )}>
 {/* Editor */}
 {(viewMode === 'editor' || viewMode === 'split') && (
 <motion.div 
 layout
 className="flex flex-col glass-card rounded-xl overflow-hidden"
 >
 <div className="flex items-center justify-between px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
 <div className="flex items-center gap-2">
   <FileEdit size={16} className="text-gray-400" />
   <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Markdown Source</span>
 </div>
 <div className="flex gap-4">
 <span className="text-[10px] font-bold text-gray-400">{markdown.length} CHR</span>
 <span className="text-[10px] font-bold text-gray-400">{markdown.split(/\s+/).filter(Boolean).length} WRD</span>
 </div>
 </div>
 <div className="flex-1 relative">
    <Editor
       height="100%"
       defaultLanguage="markdown"
       value={markdown}
       onChange={(val) => setMarkdown(val || '')}
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
 </motion.div>
 )}

 {/* Preview */}
 {(viewMode === 'preview' || viewMode === 'split') && (
 <motion.div 
 layout
 className="flex flex-col glass-card rounded-xl overflow-hidden"
 >
 <div className="flex items-center justify-between px-5 py-3 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
 <div className="flex items-center gap-2">
 <Eye size={16} className="text-blue-600" />
 <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Live Preview</span>
 </div>
 <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-sm">
 <Sparkles size={12} className="animate-pulse" />
 <span className="text-[10px] font-bold uppercase tracking-widest">Mermaid Ready</span>
 </div>
 </div>
 <div 
 ref={previewRef}
 className="flex-1 p-8 overflow-y-auto w-full prose dark:prose-invert prose-blue max-w-none prose-headings:font-semibold prose-a:text-blue-600"
 dangerouslySetInnerHTML={{ __html: html }}
 />
 </motion.div>
 )}
 </div>
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
