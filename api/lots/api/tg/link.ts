export const runtime = 'edge';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Use POST' }), {
      status: 405, headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
  const { token } = await req.json().catch(() => ({}));
  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: 'token required' }), {
      status: 400, headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
  const bot = (process.env.TG_BOT_USERNAME || 'TehSnabAligatorBot').replace('@','');
  const link = `https://t.me/${bot}?start=${encodeURIComponent(token)}`;
  return new Response(JSON.stringify({ ok: true, link }), {
    status: 200, headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}
