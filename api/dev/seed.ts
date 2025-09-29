export const runtime = 'edge';

export default function handler() {
  // демо-ответ, чтобы UI видел хотя бы один лот
  const items = [
    {
      id: 'L-1001',
      source: 'etender',
      url: '#',
      title: 'Поставка автошин 195/65R15',
      description: 'Демо-лот',
      category: 'Авто и шины',
      buyer: 'МВД РУз',
      region: 'Ташкент',
      budget_amount: 950000000,
      currency: 'UZS',
      bid_deadline_at: new Date(Date.now()+28*3600e3).toISOString(),
      published_at: new Date(Date.now()-20*3600e3).toISOString(),
      status: 'open'
    }
  ];
  return new Response(JSON.stringify({ items }), {
    status: 200, headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}
