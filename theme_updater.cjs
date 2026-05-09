const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');

const replacements = [
  { p: /dark:bg-\[#161B22\]/g, r: 'dark:bg-[#1C1C1E]' },
  { p: /dark:bg-\[#0D1117\]/g, r: 'dark:bg-[#2C2C2E]' },
  { p: /dark:border-gray-800/g, r: 'dark:border-ios-border-dark' },
  { p: /border-gray-200 dark:border-ios-border-dark/g, r: 'border-ios-border-light dark:border-ios-border-dark' },
  { p: /border-gray-200/g, r: 'border-ios-border-light' },
  { p: /text-gray-900 dark:text-white/g, r: 'text-ios-text-light dark:text-ios-text-dark' },
  { p: /text-gray-500 max-w-xl mx-auto/g, r: 'text-ios-muted-light dark:text-ios-muted-dark max-w-xl mx-auto' }
];

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { p, r } of replacements) {
        if (p.test(content)) {
          content = content.replace(p, r);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

walk(dir);
