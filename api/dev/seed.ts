// api/dev/seed.ts — простейший edge-handler
export const config = { runtime: 'edge' };

export default async function handler(_req: Request) {
  // Для лога в Runtime Logs
  console.log('seed called at', new Date().toISOString());

  return new Response(
    JSON.stringify({ ok: true, seeded: 0 }),
    { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } }
  );
}
