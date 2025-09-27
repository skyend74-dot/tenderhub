const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';

async function upstash(command: (string|number|boolean)[], fallback?: any) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return fallback ?? null;
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${UPSTASH_TOKEN}` },
    body: JSON.stringify({ commands: [command] }),
    cache: 'no-store'
  });
  const json = await res.json().catch(()=>null);
  return json?.result?.[0]?.result ?? null;
}

export const redis = {
  async set(key: string, value: any, ttlSec?: number) {
    const v = JSON.stringify(value);
    return ttlSec ? upstash(['SET', key, v, 'EX', String(ttlSec)]) : upstash(['SET', key, v]);
  },
  async get<T=any>(key: string): Promise<T | null> {
    const v = await upstash(['GET', key]);
    if (typeof v !== 'string') return v as any;
    try { return JSON.parse(v) as T; } catch { return v as any; }
  },
  async lpush(key: string, ...values: any[]) {
    return upstash(['LPUSH', key, ...values.map(v=>JSON.stringify(v))]);
  },
  async lrange<T=any>(key: string, start=0, stop=50): Promise<T[]> {
    const arr = await upstash(['LRANGE', key, String(start), String(stop)]);
    return Array.isArray(arr) ? arr.map((x: string)=>{ try { return JSON.parse(x); } catch { return x; } }) : [];
  },
};
