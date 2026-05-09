import fs from 'fs';
import path from 'path';

const i18nPath = 'src/i18n.ts';
let i18n = fs.readFileSync(i18nPath, 'utf8');

const toolsDesc = {
  diff: 'Compare text diffs across strings line by line.',
  textAnalyze: 'Deep character, word, and entropy text analysis.',
  jsonToCode: 'Convert JSON payloads into strongly-typed code interfaces across languages.',
  uuid: 'Cryptographically secure identifier generation.',
  bcrypt: 'Industrial-strength one-way password hashing engine.',
  urlParser: 'Deconstruct and encode URL components precisely.',
  base64: 'Adaptive binary-to-text transformation engine.',
  ipCalc: 'Calculate network ranges, broadcast addresses, and subnet details.',
  cron: 'Translate Crontab expressions into human-readable text.',
  baseConvert: 'Adaptive radix conversion system for binary & positional notation.',
  qrcode: 'Generate high-quality QR codes with custom styling.',
  unitConvert: 'Instant conversion across various physical and digital units.',
  json: 'Local formatting with zero leaks.',
  jwt: 'Local decoding for sensitive tokens.',
  crypto: 'Native Web Crypto operations.',
  regex: 'Real-time local matching.',
  binary: 'Elite hexadecimal inspector and data entropy analyzer.',
};

const toolsDescZh = {
  diff: '逐行比对文本差异。',
  textAnalyze: '深度字符、单词及文本信息熵分析。',
  jsonToCode: '将 JSON 载荷转换为跨语言的强类型代码接口。',
  uuid: '密码学安全的唯一标识符生成。',
  bcrypt: '工业级单向密码哈希引擎。',
  urlParser: '精确解析和编码 URL 组件。',
  base64: '自适应的二进制到文本转换引擎。',
  ipCalc: '计算网络范围、广播地址及子网详情。',
  cron: '将 Crontab 表达式翻译为人类可读格式。',
  baseConvert: '实用的二进制及位置记数法自适应进制转换系统。',
  qrcode: '生成自定义样式的高质量二维码。',
  unitConvert: '各类物理和数字单位之间的即时转换。',
  json: '本地格式化，零泄漏。',
  jwt: '本地安全解码敏感令牌。',
  crypto: '原生的 Web Crypto 操作。',
  regex: '实时的本地正则匹配。',
  binary: '精英级十六进制检查及数据信息熵分析仪。',
};

const toolsDescJa = {
  diff: 'テキストの差分を行単位で比較します。',
  textAnalyze: '高度な文字、単語、エントロピーテキスト分析。',
  jsonToCode: 'JSONペイロードを言語を越えた強力な型付きコードインターフェースに変換します。',
  uuid: '暗号論的に安全な識別子生成。',
  bcrypt: '業界標準の堅牢な一方向パスワードハッシュエンジン。',
  urlParser: 'URLコンポーネントを正確に分解およびエンコードします。',
  base64: '適応型バイナリからテキストへの変換エンジン。',
  ipCalc: 'ネットワーク範囲、ブロードキャストアドレス、およびサブネットの詳細を計算します。',
  cron: 'Crontab式を人間が読めるテキストに翻訳します。',
  baseConvert: 'バイナリおよび位取り記数法のための適応型基数変換システム。',
  qrcode: 'カスタムスタイルで高品質なQRコードを生成します。',
  unitConvert: 'さまざまな物理的およびデジタル単位の即時変換。',
  json: '情報漏洩ゼロのローカルフォーマット。',
  jwt: '繊細なトークンのためのローカルデコード。',
  crypto: 'ネイティブWeb Crypto操作。',
  regex: 'リアルタイムのローカルマッチング。',
  binary: '高度な16進数インスペクターおよびデータエントロピーアナライザー。',
};

// Insert into English
i18n = i18n.replace(/tools: \{[\s\S]*?\},/, (match) => {
  return match + '\n      toolsDesc: ' + JSON.stringify(toolsDesc, null, 8).replace(/\n/g, '\n      ') + ',';
});

// Insert into Chinese
i18n = i18n.replace(/(zh:\s*\{\s*translation:\s*\{[\s\S]*?)tools: \{[\s\S]*?\},/g, (match, prefix) => {
  if (match.includes('文本差异')) // check if inside zh
    return match + '\n      toolsDesc: ' + JSON.stringify(toolsDescZh, null, 8).replace(/\n/g, '\n      ') + ',';
  return match;
});

// Insert into Japanese
i18n = i18n.replace(/(ja:\s*\{\s*translation:\s*\{[\s\S]*?)tools: \{[\s\S]*?\},/g, (match, prefix) => {
  if (match.includes('テキスト差分')) // check if inside ja
    return match + '\n      toolsDesc: ' + JSON.stringify(toolsDescJa, null, 8).replace(/\n/g, '\n      ') + ',';
  return match;
});

fs.writeFileSync(i18nPath, i18n);

const componentsPath = 'src/components';
const files = fs.readdirSync(componentsPath).filter(f => f.endsWith('.tsx'));

const componentToolMap = {
  'BinaryLab.tsx': 'binary',
  'BcryptLab.tsx': 'bcrypt',
  'Base64Smart.tsx': 'base64',
  'BaseConverter.tsx': 'baseConvert',
  'IpCalculator.tsx': 'ipCalc',
  'JsonToCode.tsx': 'jsonToCode',
  'UnitConverter.tsx': 'unitConvert',
  'QrCodeLab.tsx': 'qrcode',
  'CronExplainer.tsx': 'cron',
  'UrlParser.tsx': 'urlParser',
  'UuidGen.tsx': 'uuid',
  'JsonConverter.tsx': 'converter', // Wait JsonConverter uses json? No wait ToolLayout is not used in JsonConverter? Let's check
};

for (const file of files) {
  if (!componentToolMap[file]) continue;
  const toolKey = componentToolMap[file];
  const filePath = path.join(componentsPath, file);
  let code = fs.readFileSync(filePath, 'utf8');

  // Find ToolLayout element and replace title and shortDesc
  code = code.replace(/title="[^"]+"/, `title={t('tools.${toolKey}')}`);
  code = code.replace(/shortDesc="[^"]+"/, `shortDesc={t('toolsDesc.${toolKey}')}`);
  
  // also add fallback for tools that have no 'title' prop currently but have shortDesc (like BcryptLab, Base64Smart, etc. since they use ToolLayout)
  if (code.includes('<ToolLayout') && !code.includes('title=') && toolKey) {
     code = code.replace(/<ToolLayout/, `<ToolLayout title={t('tools.${toolKey}')}`);
  }

  fs.writeFileSync(filePath, code);
}
