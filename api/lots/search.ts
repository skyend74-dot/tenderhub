// api/lots/search.ts
export const runtime = 'edge';

// Минимальный мок, чтобы UI получил данные и не было 500
type LotStatus = 'open' | 'closed' | 'awarded' | 'cancelled' | 'unknown';
type Lot = {
  id: string;
  source: 'etender' | 'xarid';
  url: string;
  title: string;
  description: string;
  category: string;
  buyer: string;
  region: string;
  budget_amount: number;
  currency: 'UZS' | 'USD' | 'EUR';
  bid_deadline_at: string;
  published_at: string;
  status: LotStatus;
  starred?: boolean;
};

const MOCK_LOTS: Lot[] = [
  {
    id: "L-1001",
    source: "etender",
    url: "https://etender.uzex.uz/lots/2/1001",
    title: "Поставка автошин 195/65R15 (Tunga Zodiak)",
    description: "Поставка автошин для служебного автопарка; сертификат соответствия обязателен.",
    category: "Авто и шины",
    buyer: "МВД РУз",
    region: "Ташкент",
    budget_amount: 950_000_000,
    currency: "UZS",
    bid_deadline_at: new Date(Date.now() + 28*60*60*1000).toISOString(),
    published_at: new Date(Date.now() - 20*60*60*1000).toISOString(),
    status: "open",
    starred: true,
  },
  {
    id: "L-1002",
    source: "xarid",
    url: "https://xarid.uzex.uz/lots/2/1002",
    title: "Рукава всасывающие D125 мм, 4 м",
    description: "Рукав всасывающий для забора воды, 2025 г.в., новый, без повреждений.",
    category: "Пожарная безопасность",
    buyer: "Министерство по ЧС",
    region: "Самарканд",
    budget_amount: 320_000_000,
    currency: "UZS",
    bid_deadline_at: new Date(Date.now() + 6*60*60*1000).toISOString(),
    published_at: new Date(Date.now() - 40*60*60*1000).toISOString(),
    status: "open",
  },
  {
    id: "L-1003",
    source: "etender",
    url: "https://etender.uzex.uz/lots/2/1003",
    title: "Комплекс психофизиологического тестирования \"НС-Психотест\"",
    description: "Поставка, обучение персонала, гарантия 12 мес.",
    category: "Медоборудование",
    buyer: "РНПЦ",
    region: "Бухара",
    budget_amount: 125_000_000,
    currency: "UZS",
    bid_deadline_at: new Date(Date.now() - 2*60*60*1000).toISOString(),
    published_at: new Date(Date.now() - 96*60*60*1000).toISOString(),
    status: "closed",
  },
];

export default async function handler(req: Request) {
  // Простейшие фильтры по query-параметрам (опционально)
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').toLowerCase();
  const minBudget = Number(searchParams.get('min_budget') || '0');

  let items = MOCK_LOTS;

  if (q) {
    items = items.filter(l =>
      (l.title + ' ' + l.description + ' ' + l.buyer).toLowerCase().includes(q)
    );
  }
  if (!Number.isNaN(minBudget) && minBudget > 0) {
    items = items.filter(l => l.budget_amount >= minBudget);
  }

  return new Response(
    JSON.stringify({ ok: true, total: items.length, items }),
    {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    }
  );
}
