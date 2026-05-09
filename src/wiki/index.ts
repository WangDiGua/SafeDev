export const WIKI_CONTENT: Record<string, any> = {
  json: `
## 什么是 JSON 数据格式？ (Concept Analysis)

JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式。它基于 JavaScript 的一个子集，但采用完全独立于语言的文本格式，这使得它成为理想的跨平台数据交换语言。

在现代 Web 开发中，JSON 已经几乎取代了 XML，成为 API 通信的事实标准。

## 为什么选择 SafeDev 本地处理？ (Security First)

大多数在线 JSON 格式化工具会将您的数据上传至服务器进行处理。如果您的 JSON 包含敏感信息（如用户 PII 数据、API 密钥或内部系统架构），这些数据可能会被抓取或存储。

**SafeDev 承诺：**
- **零上传**：所有代码在您的浏览器本地解析。
- **离线可用**：即使断网，格式化功能依然强劲。
- **无痕执行**：您的数据永远不会触达我们的后端。

## 最佳实践与调试技巧 (How-to & Best Practice)

格式化 JSON 不仅仅是为了美观，更是为了调试。

1. **检查尾部逗号**：JSON 标准严禁在最后一个元素后添加逗号，这常导致解析失败。
2. **双引号守则**：键（Key）必须使用双引号包裹，单引号将导致 \`SyntaxError\`。
3. **压缩 vs 格式化**：传输阶段使用压缩，开发调试阶段使用格式化。

## 常见问题 (FAQ)

**Q: 为什么提示 "Unexpected token"？**
A: 通常是因为遗漏了逗号、引号未闭合，或者包含了注释（标准 JSON 不支持注释）。

**Q: 是否支持超大 JSON？**
A: 是的，SafeDev 使用流式解析加速技术，支持单次处理兆级规模的数据文件。
  `,
  jwt: {
    en: `
## JSON Web Token (JWT) Concepts (Concept Analysis)

JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

It consists of three parts separated by dots (.):
1. **Header**: Defines the algorithm (e.g. HS256) and token type.
2. **Payload**: Stores actual claims like User ID and Expiration.
3. **Signature**: Used to verify message integrity.

## Security Bottom Line (Security Pain Points)

**DO NOT enter production tokens on random online debuggers.**
JWT is just Base64 encoded, not encrypted. Anyone can see the Payload. If you decode on an unsafe site, your credentials may leak.

At SafeDev, we use local Web APIs to disassemble the token, keeping your identity strictly private.

## How do developers verify it? (How-to Guide)

Standard verification in Node.js:
\`\`\`javascript
const jwt = require('jsonwebtoken');
const secret = 'your-256-bit-secret';

try {
  const decoded = jwt.verify(token, secret);
  console.log('User Authed:', decoded.sub);
} catch(err) {
  console.error('Invalid signature!');
}
\`\`\`

## FAQ

**Q: Does JWT encrypt my data?**
A: **No.** It is only signed. Payload data is plaintext. Do not put raw passwords in the payload.
    `,
    zh: `
## JSON Web Token (JWT) 深度解析 (Concept Analysis)

JWT 是一种开放标准 (RFC 7519)，它定义了一种紧凑且自包含的方式，用于在各方之间作为 JSON 对象安全地传输信息。

它由三部分组成，通过点 (.) 分隔：
1. **Header (头部)**：定义算法 (如 HS256) 和令牌类型。
2. **Payload (负载)**：存储实际的声明 (Claims)，如用户 ID 和过期时间。
3. **Signature (签名)**：用于验证消息在传输过程中未被更改。

## 安全红线：本地解码的重要性 (Security Pain Points)

**严禁在未知的在线调试站输入生产环境令牌。**
JWT 本身只是 Base64 编码，并不是加密。任何拿到令牌的人都能看到 Payload 中的内容。如果您在不安全的站点解析令牌，您的用户凭证可能会被拦截。

在 SafeDev，我们使用本地 Web API 对令牌进行拆解，确保您的身份信息绝对私密。

## 开发者如何验证签名？ (How-to Guide)

在 Node.js 中验证 JWT 的标准方式：
\`\`\`javascript
const jwt = require('jsonwebtoken');
const secret = 'your-256-bit-secret';

try {
  const decoded = jwt.verify(token, secret);
  console.log('User Authed:', decoded.sub);
} catch(err) {
  console.error('Invalid signature!');
}
\`\`\`

## FAQ：JWT 的常见误区

**Q: JWT 是否加密了我的数据？**
A: **默认不加密。** 它仅仅是签名了。Payload 的数据是肉眼可见的，请勿放置原始密码。
    `
  },
  crypto: `
## 现代加密技术概览 (Modern Crypto)

加密是保障互联网安全的核心基石。本工具集成了业界标准的哈希算法（SHA系列）和对称加密算法（AES）。

- **SHA-256**：不可逆的指纹提取，用于验证数据完整性。
- **AES-256-CBC**：目前公认的高强度对称加密，广泛应用于军方和金融系统。

## SafeDev 的安全屏障 (Why Local)

加密密钥是你数字世界的“核弹代码”。一旦这些密钥通过 HTTP 请求发送到某个第三方服务器，你的安全性就归零了。

SafeDev 所有的加解密操作均调用原生的 **Web Crypto API**，直接在您的硬件指令集层面执行，不经过任何中间环节。

## AES 加密最佳实践 (Best Practices)

1. **初始化向量 (IV)**：永远不要对不同的内容使用相同的 IV，否则会降低抵御差分攻击的能力。
2. **密钥强度**：确保您的密钥满足位数要求（AES-256 需要 32 个字符）。
3. **PBKDF2**：如果使用密码而不是原始密钥，建议先进行多次哈希派生。

## FAQ

**Q: 哈希和加密有什么区别？**
A: 哈希是单向的（不可逆），用于验证；加密是双向的（可逆），用于保护隐私。
  `,
  password: `
## 密码熵：什么是强大的密码？ (What is Entropy)

一个强大的密码不仅仅是长，更重要的是“熵值”。熵代表了不可预测性。

- **12 个混合字元**：大约相当于 72 位熵。
- **32 个全随机字元**：熵值超过 190 位，量子计算时代前绝对安全。

## 零信任生成的优势 (Security)

大多数密码生成器声称是随机的，但如果它们的随机源（Seed）是固定的，生成的序列就是可预测的。

SafeDev 使用浏览器底层的 \`crypto.getRandomValues()\` 接口，这是由操作系统内核提供熵源的高阶密码学随机函数，生成的每一串字符都是唯一的物理随机结果。

## 常见问题解答

**Q: 为什么我的 8 位密码依然不安全？**
A: 现代 GPU 每秒可以尝试数千亿次组合。8 位甚至 10 位密码在暴力破解面前只需几秒钟。建议至少使用 16 位以上。
  `
};
