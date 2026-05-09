import fs from 'fs';
let code = fs.readFileSync('src/icons/CustomIcons.tsx', 'utf-8');
code = code.replace(/fill=\"currentColor\" fillOpacity=\"0\.1\"/g, 'fill=\"url(#soft-glow)\"');
code = code.replace(/fill=\"currentColor\" fillOpacity=\"0\.2\"/g, 'fill=\"url(#strong-glow)\"');
fs.writeFileSync('src/icons/CustomIcons.tsx', code);
