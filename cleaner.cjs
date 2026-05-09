const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components');

function cleanClasses(content) {
  // Common duplicated or long class clusters
  content = content.replace(/bg-white\s+dark:bg-\[#1C1C1E\]\s+rounded-xl\s+border\s+border-ios-border-light\s+dark:border-ios-border-dark\s+shadow-sm/g, 'glass-card rounded-xl');
  content = content.replace(/bg-gray-50\s+dark:bg-\[#2C2C2E\]/g, 'bg-ios-bg-light dark:bg-[#2C2C2E]');
  return content;
}

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = cleanClasses(content);
      
      // Also fix multiple glass-card instances
      newContent = newContent.replace(/glass-card rounded-xl\s+glass-card/g, 'glass-card rounded-xl');
      newContent = newContent.replace(/glass-card\s+rounded-xl\s+glass-card\s+rounded-xl/g, 'glass-card rounded-xl');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Cleaned ${file}`);
      }
    }
  }
}

walk(dir);
