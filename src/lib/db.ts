import Dexie, { type Table } from 'dexie';

export interface JSONData {
  id?: number;
  name: string;
  content: string;
  updatedAt: number;
}

export interface CryptoHistory {
  id?: number;
  type: string; // hash, base64
  input: string;
  output: string;
  updatedAt: number;
}

export interface JWTData {
  id?: number;
  token: string;
  name: string;
  updatedAt: number;
}

export interface RegexData {
  id?: number;
  pattern: string;
  flags: string;
  testString: string;
  name: string;
  updatedAt: number;
}

export class SafeDevDB extends Dexie {
  jsonData!: Table<JSONData>;
  cryptoHistory!: Table<CryptoHistory>;
  jwtData!: Table<JWTData>;
  regexData!: Table<RegexData>;

  constructor() {
    super('SafeDevDB');
    this.version(1).stores({
      jsonData: '++id, name, updatedAt',
      cryptoHistory: '++id, type, updatedAt',
      jwtData: '++id, name, updatedAt',
      regexData: '++id, name, updatedAt'
    });
  }
}

export const db = new SafeDevDB();
