import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        tools: 'Tools',
        settings: 'Settings',
        json: 'JSON Workbench',
        jwt: 'JWT Lab',
        crypto: 'Crypto Engine',
        regex: 'Regex Visualizer',
        binary: 'Binary Lab',
        about: 'About',
        save: 'Save',
        copy: 'Copy',
        copied: 'Copied',
        delete: 'Delete',
        clear: 'Clear All',
        history: 'History',
        essentials: 'Essentials',
        input: 'Input',
        output: 'Output',
        offline: 'Offline Ready',
        theme: 'Appearance',
        language: 'Language',
        search: 'Search Results',
        badge: 'STABLE v2.0 - NEXT GEN ARCHITECTURE',
        heroDesc: 'Local-first, secure, and blazing fast utilities for daily engineering tasks.',
        searchPlaceholder: 'Search tools, formats, protocols...',
        allAvailable: 'All available',
        categories: {
          explore: 'Explore',
          security: 'Security',
          dev: 'Dev Kit',
          network: 'Relay',
          temporal: 'Temporal',
          visual: 'Visual'
        }
      },
      json: {
        title: 'JSON Workbench',
        desc: 'Local formatting with zero leaks.',
        pretty: 'Pretty',
        minify: 'Minify',
        placeholder: 'Paste your JSON here...',
        archives: 'Saved Archives'
      },
      jwt: {
        title: 'JWT Lab',
        desc: 'Local decoding for sensitive tokens.',
        placeholder: 'Paste JWT here...'
      },
      crypto: {
        title: 'Crypto Engine',
        desc: 'Native Web Crypto operations.',
        algorithm: 'Algorithm',
        result: 'Result'
      },
      regex: {
        title: 'Regex Visualizer',
        desc: 'Real-time local matching.',
        testString: 'Test String',
        visualizer: 'Visualizer'
      },
      converter: {
        title: 'Format Converter',
        desc: 'Convert between JSON, YAML, CSV and TOML.',
        to: 'To'
      },
      markdown: {
        title: 'Markdown Lab',
        desc: 'Live preview with safe rendering.',
        placeholder: 'Write markdown here...'
      },
      password: {
        title: 'Password Engine',
        desc: 'Generate secure cryptographically strong keys.',
        length: 'Length',
        strength: 'Strength:',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        veryStrong: 'Very Strong'
      },
      time: {
        title: 'Time Portal',
        desc: 'Unix timestamp and ISO date conversion.',
        now: 'Now',
        timestamp: 'Unix Timestamp',
        date: 'Standard Date'
      },
      color: {
        title: 'Color Studio',
        desc: 'Transform between different color spaces.',
        picker: 'Color Picker'
      },
      tools: {
        diff: 'Text Diff',
        textAnalyze: 'Text Analyzer',
        jsonToCode: 'Type Generator',
        uuid: 'UUID/ULID Gen',
        bcrypt: 'BCrypt Lab',
        urlParser: 'URL Parser',
        base64: 'Smart Base64',
        ipCalc: 'IP Calculator',
        cron: 'Cron Explainer',
        baseConvert: 'Base Converter',
        qrcode: 'QR Code Lab',
        unitConvert: 'Unit Converter'
      },
      toolsDesc: {
              "diff": "Compare text diffs across strings line by line.",
              "textAnalyze": "Deep character, word, and entropy text analysis.",
              "jsonToCode": "Convert JSON payloads into strongly-typed code interfaces across languages.",
              "uuid": "Cryptographically secure identifier generation.",
              "bcrypt": "Industrial-strength one-way password hashing engine.",
              "urlParser": "Deconstruct and encode URL components precisely.",
              "base64": "Adaptive binary-to-text transformation engine.",
              "ipCalc": "Calculate network ranges, broadcast addresses, and subnet details.",
              "cron": "Translate Crontab expressions into human-readable text.",
              "baseConvert": "Adaptive radix conversion system for binary & positional notation.",
              "qrcode": "Generate high-quality QR codes with custom styling.",
              "unitConvert": "Instant conversion across various physical and digital units.",
              "json": "Local formatting with zero leaks.",
              "jwt": "Local decoding for sensitive tokens.",
              "crypto": "Native Web Crypto operations.",
              "regex": "Real-time local matching.",
              "binary": "Elite hexadecimal inspector and data entropy analyzer."
      },
      jsonToCodeParams: {
        sourceJson: 'Source JSON',
        rootName: 'Root Name',
        copy: 'Copy',
        generating: '// Generating...',
        provideValid: '// Provide valid JSON',
        schemaError: '// Error:'
      },
      cronParams: {
        desc: 'Translate Crontab expressions into human-readable text.',
        expression: 'Expression (5 or 6 fields)',
        everyMinute: 'Every Minute',
        everyHour: 'Every Hour',
        midnightDaily: 'Midnight Daily',
        weeklySun: 'Weekly Sun',
        weekdays: 'Weekdays 9-5',
        interpretation: 'Human Interpretation',
        upcoming: 'Upcoming Execution Times',
        invalid: 'Invalid Expression',
        noFuture: 'No future dates available',
      },
      timeParams: {
        now: 'Now',
        conversionTool: 'Conversion Tool',
        sysTimeExplorer: 'System Time Explorer',
        sysTimeDesc: 'Highly accurate browser-local clock processing.',
        year: 'Year',
        month: 'Month',
        day: 'Day',
        dayOfWeek: 'Day of Week',
        dayOfYear: 'Day of Year',
        isLeapYear: 'Is Leap Year',
        yes: 'Yes',
        no: 'No'
      },
      colorParams: {
        interactivePicker: 'Interactive Picker',
        absoluteValues: 'Absolute Values',
        dynamicPreview: 'Dynamic Target Preview',
        contrast: 'WCAG AA Contrast:',
        generative: 'Generative Palettes',
        tints: 'Tints',
        shades: 'Shades'
      },
      uuidParams: {
        algorithm: 'Algorithm',
        batchSize: 'Batch Size',
        proTip: 'Pro Tip: ULIDs are lexicographically sortable and contain timestamp data.',
        resultPool: 'Result Pool',
        generated: 'Generated',
        uuidv4: 'UUID v4 (Random)',
        uuidv1: 'UUID v1 (Time)',
        ulid: 'ULID (Sortable)'
      },
      ipParams: {
        ipAddress: 'IP Address',
        cidrMask: 'CIDR Mask',
        classDetection: 'Class Detection',
        private: 'Private Network',
        public: 'Public/Other',
        invalid: 'Invalid IP or Mask',
        networkAddress: 'Network Address',
        broadcastAddress: 'Broadcast Address',
        totalHosts: 'Total Hosts',
        usableRange: 'Usable Range',
        subnetMask: 'Subnet Mask'
      },
      urlParams: {
        rawInput: 'Raw URL Input',
        invalid: 'Invalid URL format',
        components: 'Components',
        protocol: 'Protocol',
        hostname: 'Hostname',
        port: 'Port',
        pathname: 'Pathname',
        hash: 'Hash',
        none: 'None',
        queryParams: 'Query Parameters',
        noParams: 'No parameters detected',
        canonical: 'Canonical Href',
        copyFull: 'Copy Full URL'
      },
      unitParams: {
        sourceValue: 'Source Value & Unit',
        targetUnit: 'Target Unit',
        resultOutput: 'Result Output',
        copyResult: 'Copy Result',
        precisionFact: 'Precision Fact',
        precisionDesc: 'Calculations use standard international SI factors with 4-decimal precision for scientific accuracy. Output parsing correctly localizes structural zeroes.'
      },
      about: {
        title: 'SafeDev Philosophy',
        subtitle: 'Secure workspace for developers.',
        feature1: 'Local Processing',
        feature1Desc: 'Data never leaves your browser.',
        feature2: 'Performance',
        feature2Desc: 'Optimized Native APIs.',
        feature3: 'Persistence',
        feature3Desc: 'IndexedDB auto-saving.',
        feature4: 'PWA',
        feature4Desc: 'Works offline anywhere.'
      }
    }
  },
  zh: {
    translation: {
      common: {
        tools: '工具',
        settings: '设置',
        json: 'JSON 工作台',
        jwt: 'JWT 实验室',
        crypto: '加解密引擎',
        regex: '正则可视化',
        binary: '二进制实验室',
        about: '关于项目',
        save: '打开',
        copy: '复制',
        copied: '已复制',
        delete: '删除',
        clear: '清空全部',
        history: '历史记录',
        essentials: '常用必备',
        input: '输入数据',
        output: '输出预览',
        offline: '断网可用',
        theme: '外观主题',
        language: '界面语言',
        search: '搜索结果',
        badge: 'STABLE v2.0 - 新一代架构',
        heroDesc: '本地优先，安全，极速的日常开发工程师工具集。',
        searchPlaceholder: '搜索工具，格式，协议...',
        allAvailable: '所有工具',
        categories: {
          explore: '浏览导航',
          security: '安全实验室',
          dev: '开发工具箱',
          network: '网络中继',
          temporal: '时间算力',
          visual: '视觉设计'
        }
      },
      json: {
        title: 'JSON 工作台',
        desc: '本地极速格式化，数据绝对安全。',
        pretty: '美化',
        minify: '压缩',
        placeholder: '在此粘贴 JSON 数据...',
        archives: '已存档案'
      },
      jwt: {
        title: 'JWT 实验室',
        desc: '纯前端算法解构，保护敏感信息。',
        placeholder: '在此粘贴 Token...'
      },
      crypto: {
        title: '加解密引擎',
        desc: '基于原生 Web Crypto API 实现。',
        algorithm: '选择算法',
        result: '计算结果'
      },
      regex: {
        title: '正则可视化',
        desc: '本地实时匹配，丝滑且私密。',
        testString: '测试文本',
        visualizer: '可视化预览'
      },
      converter: {
        title: '结构转换器',
        desc: '在 JSON、YAML、CSV 等格式间无缝转换。',
        to: '转换为'
      },
      markdown: {
        title: 'Markdown 工作台',
        desc: '实时预览，支持安全渲染。',
        placeholder: '在此输入 Markdown 内容...'
      },
      password: {
        title: '强密码生成',
        desc: '生成具备加密安全强度的密钥。',
        length: '长度',
        strength: '强度：',
        weak: '弱',
        medium: '中',
        strong: '强',
        veryStrong: '极强'
      },
      time: {
        title: '时间戳转换',
        desc: 'Unix 时间戳与标准时间实时对换。',
        now: '当前时间',
        timestamp: 'Unix 时间戳',
        date: '标准日期'
      },
      color: {
        title: '颜色转换站',
        desc: '支持常用颜色空间互转与拾色。',
        picker: '颜色选取'
      },
      tools: {
        diff: '文本对比',
        textAnalyze: '文本分析',
        jsonToCode: '结构转代码',
        uuid: '唯一标识生成',
        bcrypt: 'BCrypt/Argon2',
        urlParser: 'URL 解析',
        base64: '智能 Base64',
        ipCalc: 'IP 计算器',
        cron: 'Cron 解释',
        baseConvert: '多进制转换',
        qrcode: '二维码生成',
        unitConvert: '单位转换器'
      },
      jsonToCodeParams: {
        sourceJson: '源 JSON',
        rootName: '根节点名称',
        copy: '复制',
        generating: '// 正在生成...',
        provideValid: '// 请提供有效的 JSON',
        schemaError: '// 错误:'
      },
      cronParams: {
        desc: '将 Crontab 表达式翻译为人类可读的文字。',
        expression: '表达式 (5 或 6 个字段)',
        everyMinute: '每分钟',
        everyHour: '每小时',
        midnightDaily: '每日零点',
        weeklySun: '每周日',
        weekdays: '工作日 9-5',
        interpretation: '人类可读解释',
        upcoming: '即将执行的时间',
        invalid: '无效的表达式',
        noFuture: '没有未来的日期',
      },
      timeParams: {
        now: '当前时刻',
        conversionTool: '转换工具',
        sysTimeExplorer: '系统时间探测器',
        sysTimeDesc: '基于浏览器本地的高精度时钟处理。',
        year: '年',
        month: '月',
        day: '日',
        dayOfWeek: '星期',
        dayOfYear: '年中某天',
        isLeapYear: '是否闰年',
        yes: '是',
        no: '否'
      },
      colorParams: {
        interactivePicker: '沉浸式拾色器',
        absoluteValues: '绝对数值',
        dynamicPreview: '动态目标预览',
        contrast: 'WCAG AA 对比度:',
        generative: '衍生色板',
        tints: '亮色色阶',
        shades: '暗色色阶'
      },
      uuidParams: {
        algorithm: '算法选择',
        batchSize: '生成数量',
        proTip: '提示: ULID 是按字典序排序的，并包含时间戳数据。',
        resultPool: '结果池',
        generated: '已生成',
        uuidv4: 'UUID v4 (随机)',
        uuidv1: 'UUID v1 (时间)',
        ulid: 'ULID (可排序)'
      },
      ipParams: {
        ipAddress: 'IP 地址',
        cidrMask: 'CIDR 掩码',
        classDetection: '网络类型检测',
        private: '局域网 (局域)',
        public: '公网/其他',
        invalid: '无效的 IP 或掩码',
        networkAddress: '网络地址',
        broadcastAddress: '广播地址',
        totalHosts: '总主机数',
        usableRange: '可用范围',
        subnetMask: '子网掩码'
      },
      urlParams: {
        rawInput: '输入原始 URL',
        invalid: '无效的 URL 格式',
        components: 'URL 结构解析',
        protocol: '协议',
        hostname: '主机名',
        port: '端口',
        pathname: '路径',
        hash: '哈希',
        none: '无',
        queryParams: '查询参数',
        noParams: '未检测到参数',
        canonical: 'Canonical Href',
        copyFull: '复制完整链接'
      },
      unitParams: {
        sourceValue: '源数值与单位',
        targetUnit: '目标单位',
        resultOutput: '转换结果',
        copyResult: '复制结果',
        precisionFact: '精度说明',
        precisionDesc: '计算使用标准国际 SI 系数，精确到 4 位小数以确保科学准确性。输出解析正确地处理结构化零点。'
      },
      about: {
        title: 'SafeDev 设计理念',
        subtitle: '为开发者打造的私密工作区。',
        feature1: '完全本地化',
        feature1Desc: '数据永不离开您的浏览器。',
        feature2: '极致性能',
        feature2Desc: '基于原生 Web API 的毫秒级响应。',
        feature3: '状态持久',
        feature3Desc: '利用 IndexedDB 实现自动存档。',
        feature4: '离线支持',
        feature4Desc: '支持断网环境持续工作。'
      }
    }
  },
  ja: {
    translation: {
      common: {
        tools: 'ツール',
        settings: '設定',
        json: 'JSON ワークベンチ',
        jwt: 'JWT ラボ',
        crypto: '暗号化エンジン',
        regex: '正規表現',
        binary: 'バイナリラボ',
        about: '概要',
        save: '開く',
        copy: 'コピー',
        copied: 'コピー済み',
        delete: '削除',
        clear: 'すべて消去',
        history: '履歴',
        essentials: '必須ツール',
        input: '入力',
        output: '出力',
        offline: 'オフライン対応',
        theme: '外観',
        language: '言語',
        search: '検索結果',
        badge: 'STABLE v2.0 - 次世代アーキテクチャ',
        heroDesc: 'ローカルファーストで安全かつ超高速な日常ツール。',
        searchPlaceholder: 'ツール、フォーマット、プロトコルを検索...',
        allAvailable: 'すべてのツール',
        categories: {
          explore: 'ブラウズ',
          security: 'セキュリティ',
          dev: '開発キット',
          network: 'ネットワーク',
          temporal: '時間',
          visual: 'ビジュアル'
        }
      },
      json: {
        title: 'JSON ワークベンチ',
        desc: 'ローカルフォーマット、データの漏洩ゼロ。',
        pretty: '整形',
        minify: '圧縮',
        placeholder: 'ここにJSONを貼り付けてください...',
        archives: '保存済みアーカイブ'
      },
      jwt: {
        title: 'JWT ラボ',
        desc: '機密トークンのローカルデコード。',
        placeholder: 'JWTを貼り付けてください...'
      },
      crypto: {
        title: '暗号化エンジン',
        desc: 'ネイティブ Web Crypto 操作。',
        algorithm: 'アルゴリズム',
        result: '結果'
      },
      regex: {
        title: '正規表現視覚化',
        desc: 'リアルタイムのローカルマッチング。',
        testString: 'テスト文字列',
        visualizer: 'ビジュアライザー'
      },
      converter: {
        title: 'フォーマット変換',
        desc: 'JSON、YAML、CSV等の間で変換します。',
        to: '変換先'
      },
      markdown: {
        title: 'Markdown ラボ',
        desc: '安全なレンダリングによるリアルタイムプレビュー。',
        placeholder: 'ここにMarkdownを入力してください...'
      },
      password: {
        title: 'パスワード生成',
        desc: '暗号的に強力なパスワードを生成します。',
        length: '長さ',
        strength: '強度:',
        weak: '弱い',
        medium: '普通',
        strong: '強い',
        veryStrong: '非常に強い'
      },
      time: {
        title: 'タイムスタンプ',
        desc: 'Unixタイムスタンプと標準時間の相互変換。',
        now: '現在時刻',
        timestamp: 'Unixタイムスタンプ',
        date: '標準時刻'
      },
      color: {
        title: 'カラースタジオ',
        desc: '異なる色空間の間で変換します。',
        picker: 'カラーピッカー'
      },
      tools: {
        diff: 'テキスト比較',
        textAnalyze: 'テキスト分析',
        jsonToCode: '型ジェネレーター',
        uuid: 'UUID生成',
        bcrypt: 'BCryptラボ',
        urlParser: 'URL解析',
        base64: 'Base64ツール',
        ipCalc: 'IP計算',
        cron: 'Cron説明',
        baseConvert: '進数変換',
        qrcode: 'QRコード',
        unitConvert: '単位変換'
      },
      jsonToCodeParams: {
        sourceJson: 'ソース JSON',
        rootName: 'ルート名',
        copy: 'コピー',
        generating: '// 生成中...',
        provideValid: '// 有効なJSONを入力してください',
        schemaError: '// エラー:'
      },
      cronParams: {
        desc: 'Crontab式を人間が読めるテキストに変換します。',
        expression: '式 (5 または 6 フィールド)',
        everyMinute: '毎分',
        everyHour: '毎時',
        midnightDaily: '毎日深夜',
        weeklySun: '毎週日曜',
        weekdays: '平日 9-5',
        interpretation: '人間の解釈',
        upcoming: '次回の実行時間',
        invalid: '無効な式',
        noFuture: '利用可能な将来の日付はありません',
      },
      timeParams: {
        now: '現在',
        conversionTool: '変換ツール',
        sysTimeExplorer: 'システム時間',
        sysTimeDesc: '高精度のブラウザーローカルクロック処理。',
        year: '年',
        month: '月',
        day: '日',
        dayOfWeek: '曜日',
        dayOfYear: '通日',
        isLeapYear: '閏年か',
        yes: 'はい',
        no: 'いいえ'
      },
      colorParams: {
        interactivePicker: 'カラーピッカー',
        absoluteValues: '絶対値',
        dynamicPreview: 'プレビュー',
        contrast: 'WCAG AA コントラスト:',
        generative: 'カラーパレット生成',
        tints: 'ティント',
        shades: 'シェード'
      },
      uuidParams: {
        algorithm: 'アルゴリズム',
        batchSize: '生成数',
        proTip: 'ヒント: ULIDは辞書順に並び替え可能で、タイムスタンプが含まれています。',
        resultPool: '結果',
        generated: '生成済み',
        uuidv4: 'UUID v4 (ランダム)',
        uuidv1: 'UUID v1 (時間)',
        ulid: 'ULID (ソート可能)'
      },
      ipParams: {
        ipAddress: 'IPアドレス',
        cidrMask: 'CIDR マスク',
        classDetection: 'クラス検出',
        private: 'プライベート',
        public: 'パブリック/その他',
        invalid: '無効な IP または マスク',
        networkAddress: 'ネットワークアドレス',
        broadcastAddress: 'ブロードキャストアドレス',
        totalHosts: 'ホスト総数',
        usableRange: '利用可能な範囲',
        subnetMask: 'サブネットマスク'
      },
      urlParams: {
        rawInput: 'URL入力',
        invalid: '無効なURL形式',
        components: 'コンポーネント',
        protocol: 'プロトコル',
        hostname: 'ホスト名',
        port: 'ポート',
        pathname: 'パス名',
        hash: 'ハッシュ',
        none: 'なし',
        queryParams: 'クエリパラメータ',
        noParams: 'パラメータなし',
        canonical: '正規 URL',
        copyFull: '完全な URL をコピー'
      },
      unitParams: {
        sourceValue: '元の単位と値',
        targetUnit: '変換先の単位',
        resultOutput: '結果',
        copyResult: '結果をコピー',
        precisionFact: '精度について',
        precisionDesc: '計算には科学的精度のために標準的な国際単位系（SI）係数が4桁の精度で使用されます。'
      },
      about: {
        title: 'SafeDev の哲学',
        subtitle: '安全な作業スペース',
        feature1: 'ローカル処理',
        feature1Desc: 'データはブラウザに留まります。',
        feature2: 'パフォーマンス',
        feature2Desc: '最適化されたネイティブAPI。',
        feature3: '永続化',
        feature3Desc: 'IndexedDB 自動保存。',
        feature4: 'PWA',
        feature4Desc: 'オフラインでも動作します。'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
