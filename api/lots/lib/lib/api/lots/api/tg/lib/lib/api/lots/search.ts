import { jsonOK } from '../../lib/http';
import { redis } from '../../lib/redis';

export default async function handler() {
  const items = (await redis.lrange('lots:latest', 0, 50)) || [
    {
      id: 'L-1001', source: 'etender', title: 'Автошины', buyer: 'МВД РУз',
      region: 'Ташкент', url: '#', budget_amount: 950000000, currency: 'UZS',
      status: 'open', bid_deadline_at: new Date(Date.now()+3*3600e3).toISOString(),
      published_at: new Date(Date.now()-18*3600e3).toISOString(), description: 'Демо'
    },
  ];
  return jsonOK({ items });
}
