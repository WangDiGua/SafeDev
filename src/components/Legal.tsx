import React from 'react';
import { Shield, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Privacy() {
 return (
 <div className="min-h-screen bg-ios-bg-light dark:bg-[#2C2C2E] py-20 px-8 selection:bg-blue-500/10">
 <div className="max-w-3xl mx-auto space-y-12">
 <Link to="/home" className="inline-flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-all">
 <ArrowLeft size={14} /> Back to Tools
 </Link>
 <header className="space-y-4">
 <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500">
 <Shield size={32} strokeWidth={2.5} />
 </div>
 <h1 className="text-5xl font-black tracking-tighter">Privacy Policy</h1>
 <p className="text-gray-500 font-bold">Last updated: May 2026</p>
 </header>

 <article className="prose prose-neutral dark:prose-invert prose-headings:font-black prose-headings:tracking-tight max-w-none">
 <h2>1. Our Privacy Philosophy</h2>
 <p>
 SafeDev is built on the principle of <strong>Zero-Knowledge Computing</strong>. We believe that developer tools should not be a vector for data leakage. Our architecture is designed so that your data never touches our servers.
 </p>

 <h2>2. Data Collection (Or Lack Thereof)</h2>
 <p>
 All computations (JSON formatting, cryptography, JWT decoding) are performed exclusively in your browser using standard Web APIs.
 </p>
 <ul>
 <li><strong>No Tracking</strong>: We do not use intrusive analytics or fingerprinting.</li>
 <li><strong>Local Storage</strong>: Some preferences (like theme) are stored in your localStorage, which never leaves your device.</li>
 <li><strong>No Backend</strong>: We do not have a database that stores your tool inputs.</li>
 </ul>

 <h2>3. Advertising and Cookies</h2>
 <p>
 We use Google AdSense to serve ads. These partners may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized advertising by visiting Google's Ad Settings.
 </p>

 <h2>4. Third-Party Links</h2>
 <p>
 Our tools may contain links to external sites (e.g., official documentation). We are not responsible for the privacy practices of those sites.
 </p>
 </article>
 </div>
 </div>
 );
}

export function Terms() {
 return (
 <div className="min-h-screen bg-ios-bg-light dark:bg-[#2C2C2E] py-20 px-8 selection:bg-blue-500/10">
 <div className="max-w-3xl mx-auto space-y-12">
 <Link to="/home" className="inline-flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest hover:opacity-70 transition-all">
 <ArrowLeft size={14} /> Back to Tools
 </Link>
 <header className="space-y-4">
 <div className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500">
 <FileText size={32} strokeWidth={2.5} />
 </div>
 <h1 className="text-5xl font-black tracking-tighter">Terms of Service</h1>
 <p className="text-gray-500 font-bold">Effective Date: May 2026</p>
 </header>

 <article className="prose prose-neutral dark:prose-invert prose-headings:font-black prose-headings:tracking-tight max-w-none">
 <h2>1. Use of Service</h2>
 <p>
 SafeDev provides a suite of local-first developer tools. By using our service, you agree to these terms. Since the software runs entirely on your client, you are responsible for the security of your own environment.
 </p>

 <h2>2. Disclaimers</h2>
 <p>
 The tools are provided "AS IS" without warranty of any kind. While we strive for 100% accuracy in our algorithms (e.g., AES, SHA), we are not liable for any data loss, security breaches on your device, or incorrect calculations.
 </p>

 <h2>3. Intellectual Property</h2>
 <p>
 The design, name "SafeDev", and original code are the intellectual property of the SafeDev team. You may use the tools for personal and commercial purposes, but you may not scrape, clone, or redistribute the site as your own.
 </p>

 <h2>4. Prohibited Uses</h2>
 <p>
 You may not attempt to inject malicious code into our site or use our tools for illegal activities (e.g., password cracking for unauthorized access).
 </p>
 </article>
 </div>
 </div>
 );
}
