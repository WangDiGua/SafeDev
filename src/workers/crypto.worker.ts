/**
 * SafeDev Crypto Worker
 * Offloads heavy cryptographic operations from the main thread.
 */

self.onmessage = async (e: MessageEvent) => {
  const { val, method } = e.data;

  try {
    if (method.startsWith('SHA')) {
      const msgUint8 = new TextEncoder().encode(val);
      const hashBuffer = await crypto.subtle.digest(method, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      self.postMessage({ result: hashHex });
    } else if (method === 'Base64 Encode') {
      self.postMessage({ result: btoa(unescape(encodeURIComponent(val))) });
    } else if (method === 'Base64 Decode') {
      self.postMessage({ result: decodeURIComponent(escape(atob(val))) });
    } else if (method === 'URL Encode') {
      self.postMessage({ result: encodeURIComponent(val) });
    } else if (method === 'URL Decode') {
      self.postMessage({ result: decodeURIComponent(val) });
    }
  } catch (error) {
    self.postMessage({ error: 'Processing failed' });
  }
};
