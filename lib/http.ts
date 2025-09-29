export function jsonOK(data: any, init: number | ResponseInit = 200) {
  return new Response(JSON.stringify({ ok: true, ...data }), {
    status: typeof init === 'number' ? init : init.status ?? 200,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
export function jsonErr(message: string, status = 400) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
// ok
