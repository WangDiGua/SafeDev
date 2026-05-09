import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, ArrowRightLeft, Spline } from 'lucide-react';
import { DiffEditor } from '@monaco-editor/react';
import { ToolLayout } from './ToolLayout';
import { WIKI_CONTENT } from '../wiki';
import { useAppStore } from '../store/useAppStore';
import { cn } from '../lib/utils';

export function TextDiff() {
 const { t } = useTranslation();
 const theme = useAppStore(s => s.theme);
 const [oldText, setOldText] = useState('{\n "name": "SafeDev",\n "version": "1.0.0",\n "active": true\n}');
 const [newText, setNewText] = useState('{\n "name": "SafeDev Pro",\n "version": "1.1.0",\n "status": "online"\n}');
 const [inlineView, setInlineView] = useState(false);

 return (
 <ToolLayout
 toolId="diff"
 title={t('tools.diff')}
 shortDesc="Compare two text snippets side-by-side or inline using standard Diff Engine."
 wikiContent={WIKI_CONTENT.diff}
 >
 <div className="space-y-6 flex flex-col h-[700px]">
 <div className="flex justify-between items-center bg-gray-50 dark:bg-[#1C1C1E] p-4 rounded-lg border border-ios-border-light dark:border-ios-border-dark shadow-sm">
 <div className="flex items-center gap-4">
 <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
 <Spline size={18} />
 <span className="text-sm font-semibold uppercase tracking-widest">Engine: Monaco Diff</span>
 </div>
 <div className="w-px h-6 bg-gray-300 dark:bg-gray-800 mx-2" />
 <div className="flex items-center bg-white dark:bg-[#2C2C2E] border border-ios-border-light dark:border-ios-border-dark rounded-md p-1 shadow-sm">
 <button
 onClick={() => setInlineView(false)}
 className={cn(
 "px-4 py-1.5 text-xs font-semibold rounded transition-colors",
 !inlineView ? "bg-gray-100 dark:bg-[#222] text-black dark:text-white" : "text-gray-500 hover:text-black dark:hover:text-white"
 )}
 >
 Side-by-side
 </button>
 <button
 onClick={() => setInlineView(true)}
 className={cn(
 "px-4 py-1.5 text-xs font-semibold rounded transition-colors",
 inlineView ? "bg-gray-100 dark:bg-[#222] text-black dark:text-white" : "text-gray-500 hover:text-black dark:hover:text-white"
 )}
 >
 Inline
 </button>
 </div>
 </div>
 <div>
 <button 
 onClick={() => { setOldText(''); setNewText(''); }} 
 className="flex items-center gap-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-4 py-2 rounded-md transition-colors text-sm font-medium"
 >
 <Trash2 size={16} /> {t('common.clear')}
 </button>
 </div>
 </div>

 <div className="glass-card rounded-xl flex-1 flex flex-col bg-white dark:bg-[#1C1C1E] border border-ios-border-light dark:border-ios-border-dark shadow-sm overflow-hidden">
 <div className="grid grid-cols-2 border-b border-ios-border-light dark:border-ios-border-dark bg-ios-bg-light dark:bg-[#2C2C2E]">
 <div className="px-6 py-3 border-r border-ios-border-light dark:border-ios-border-dark flex items-center justify-between">
 <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Original Text (Left)</span>
 <ArrowRightLeft size={14} className="text-gray-400" />
 </div>
 <div className="px-6 py-3 flex items-center justify-between">
 <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Modified Text (Right)</span>
 <ArrowRightLeft size={14} className="text-gray-400" />
 </div>
 </div>
 
 <div className="flex-1 relative">
 <DiffEditor
 height="100%"
 language="plaintext"
 original={oldText}
 modified={newText}
 theme={theme === 'dark' ? 'vs-dark' : 'light'}
 options={{
 renderSideBySide: !inlineView,
 minimap: { enabled: false },
 fontSize: 14,
 fontFamily: 'var(--font-mono)',
 wordWrap: 'on',
 originalEditable: true,
 ignoreTrimWhitespace: false,
 readOnly: false
 }}
 onMount={(editor) => {
 // Sync editable changes manually if needed, but originalEditable: true allows editing the left pane.
 // We attach listeners to update state if they want to use the text later.
 const originalEditor = editor.getOriginalEditor();
 const modifiedEditor = editor.getModifiedEditor();
 
 originalEditor.onDidChangeModelContent(() => {
 setOldText(originalEditor.getValue());
 });
 modifiedEditor.onDidChangeModelContent(() => {
 setNewText(modifiedEditor.getValue());
 });
 }}
 />
 </div>
 </div>
 </div>
 </ToolLayout>
 );
}
