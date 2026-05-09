const fs = require('fs');

const replaceInFile = (path, replacements) => {
  let content = fs.readFileSync(path, 'utf8');
  for (const r of replacements) {
     content = content.replace(r.target, r.replacement);
  }
  fs.writeFileSync(path, content);
  console.log(`Updated ${path}`);
};

// JsonToCode
replaceInFile('src/components/JsonToCode.tsx', [
  { target: 'Source JSON', replacement: "{t('jsonToCodeParams.sourceJson')}" },
  { target: 'Root Name', replacement: "{t('jsonToCodeParams.rootName')}" },
  { target: 'placeholder="Root Name"', replacement: 'placeholder={t(\'jsonToCodeParams.rootName\')}' },
  { target: '// Generating...', replacement: "t('jsonToCodeParams.generating')" },
  { target: '// Provide valid JSON', replacement: "t('jsonToCodeParams.provideValid')" },
  { target: '\\`// Error: ${e.message}\\`', replacement: "\\`\\${t('jsonToCodeParams.schemaError')} \\${e.message}\\`" }
]);

// TimeConverter
replaceInFile('src/components/TimeConverter.tsx', [
  { target: '> Now', replacement: '> {t(\'timeParams.now\')}' },
  { target: 'Conversion Tool', replacement: "{t('timeParams.conversionTool')}" },
  { target: 'System Time Explorer', replacement: "{t('timeParams.sysTimeExplorer')}" },
  { target: 'Highly accurate browser-local clock processing.', replacement: "{t('timeParams.sysTimeDesc')}" },
  { target: "label: 'Year'", replacement: "label: t('timeParams.year')" },
  { target: "label: 'Month'", replacement: "label: t('timeParams.month')" },
  { target: "label: 'Day'", replacement: "label: t('timeParams.day')" },
  { target: "label: 'Day of Week'", replacement: "label: t('timeParams.dayOfWeek')" },
  { target: "label: 'Day of Year'", replacement: "label: t('timeParams.dayOfYear')" },
  { target: "label: 'Is Leap Year'", replacement: "label: t('timeParams.isLeapYear')" },
  { target: "? 'Yes' : 'No'", replacement: "? t('timeParams.yes') : t('timeParams.no')" }
]);

// UuidGenerator
replaceInFile('src/components/UuidGenerator.tsx', [
  { target: '>Algorithm<', replacement: ">{t('uuidParams.algorithm')}<" },
  { target: '>Batch Size: {count}<', replacement: ">{t('uuidParams.batchSize')}: {count}<" },
  { target: '>Pro Tip: ULIDs are lexicographically sortable and contain timestamp data.<', replacement: ">{t('uuidParams.proTip')}<" },
  { target: '>Result Pool<', replacement: ">{t('uuidParams.resultPool')}<" },
  { target: '> Generated<', replacement: "> {t('uuidParams.generated')}<" },
  { target: "t === 'v4' ? 'UUID v4 (Random)' : t === 'v1' ? 'UUID v1 (Time)' : 'ULID (Sortable)'", replacement: "t === 'v4' ? t_i18n('uuidParams.uuidv4') : t === 'v1' ? t_i18n('uuidParams.uuidv1') : t_i18n('uuidParams.ulid')" } // need to check the scope
]);

// IpCalculator
replaceInFile('src/components/IpCalculator.tsx', [
  { target: 'IP Address', replacement: "{t('ipParams.ipAddress')}" },
  { target: 'CIDR Mask', replacement: "{t('ipParams.cidrMask')}" },
  { target: 'Class Detection', replacement: "{t('ipParams.classDetection')}" },
  { target: "? 'Private Network' : 'Public/Other'", replacement: "? t('ipParams.private') : t('ipParams.public')" },
  { target: 'Invalid IP or Mask', replacement: "{t('ipParams.invalid')}" },
  { target: "label: 'Network Address'", replacement: "label: t('ipParams.networkAddress')" },
  { target: "label: 'Broadcast Address'", replacement: "label: t('ipParams.broadcastAddress')" },
  { target: "label: 'Total Hosts'", replacement: "label: t('ipParams.totalHosts')" },
  { target: "label: 'Usable Range'", replacement: "label: t('ipParams.usableRange')" },
  { target: "label: 'Subnet Mask'", replacement: "label: t('ipParams.subnetMask')" }
]);

// UrlParser
replaceInFile('src/components/UrlParser.tsx', [
  { target: 'Raw URL Input', replacement: "{t('urlParams.rawInput')}" },
  { target: 'Invalid URL format', replacement: "{t('urlParams.invalid')}" },
  { target: ' Components<', replacement: " {t('urlParams.components')}<" },
  { target: "label: 'Protocol'", replacement: "label: t('urlParams.protocol')" },
  { target: "label: 'Hostname'", replacement: "label: t('urlParams.hostname')" },
  { target: "label: 'Port'", replacement: "label: t('urlParams.port')" },
  { target: "label: 'Pathname'", replacement: "label: t('urlParams.pathname')" },
  { target: "label: 'Hash'", replacement: "label: t('urlParams.hash')" },
  { target: "'None'", replacement: "t('urlParams.none')" },
  { target: 'Query Parameters', replacement: "{t('urlParams.queryParams')}" },
  { target: 'No parameters detected', replacement: "{t('urlParams.noParams')}" },
  { target: 'Canonical Href', replacement: "{t('urlParams.canonical')}" },
  { target: "'Copy Full URL'", replacement: "t('urlParams.copyFull')" }
]);

// UnitConverter
replaceInFile('src/components/UnitConverter.tsx', [
  { target: 'Source Value & Unit', replacement: "{t('unitParams.sourceValue')}" },
  { target: '>Target Unit<', replacement: ">{t('unitParams.targetUnit')}<" },
  { target: 'Result Output', replacement: "{t('unitParams.resultOutput')}" },
  { target: "'Copy Result'", replacement: "t('unitParams.copyResult')" },
  { target: 'Precision Fact', replacement: "{t('unitParams.precisionFact')}" },
  { target: '>\\n                  Calculations use standard international SI factors with 4-decimal precision for scientific accuracy. Output parsing correctly localizes structural zeroes.\\n                <', replacement: '>\\n                  {t(\'unitParams.precisionDesc\')}\\n                <' }
]);
