import { jsonOK, jsonErr } from '../../lib/http';
import { redis } from '../../lib/redis';

export default async function handler(req: Request) {
  if (req.method !== 'POST') return jsonErr('Use POST');
  const { token } = await req.json().catch(()=>({}));
  if (!token) return jsonErr('token required');
  const BOT_USERNAME = process.env.TG_BOT_USERNAME || 'TehSnabAligatorBot';
  await redis.set(`tg:token:${token}`, { status: 'pending', createdAt: Date.now() }, 60*60*24);
  const deep = `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(token)}`;
  return jsonOK({ link: deep });
}
