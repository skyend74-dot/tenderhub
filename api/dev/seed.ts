// api/dev/seed.ts — максимально простой edge-хэндлер без зависимостей
export const runtime = 'edge';

export default async function handler() {
  // для отладки — сообщение попадёт в Runtime Logs
  console.log('seed called at', new Date().toISOString());

  return new Response(
    JSON.stringify({ ok: true, seeded: 0 }),
    { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } }
  );
}
