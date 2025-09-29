// api/lots/search.ts
export const runtime = 'edge';
import { jsonOK, jsonErr } from '../../lib/http';

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
  bid_deadline_at: string; // ISO
  published_at: string;    // ISO
  status: LotStatus;
};

const MOCK_LOTS: Lot[] = [
  {
    id: 'L-1001',
    source: 'etender',
    url: 'https://etender.uzex.uz/lots/2/1001',
    title: 'Поставка автошин 195/65R15 (Tunga Zodiak)',
    description: 'Поставка автошин для служебного автопарка; сертификат соответствия обязателен.',
    category: 'Авто и шины',
    buyer: 'МВД РУз',
    region: 'Ташкент',
    budget_amount: 950_000_000,
    currency: 'UZS',
    bid_deadline_at: new Date(Date.now() + 28 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    status: 'open'
  },
  {
    id: 'L-1002',
    source: 'xarid',
    url: 'https://xarid.uzex.uz/lots/2/1002',
    title: 'Рукава всасывающие D125 мм, 4 м',
    description: 'Рукав всасывающий для забора воды, 2025 г.в., новый, без повреждений.',
    category: 'Пожарная безопасность',
    buyer: 'Министерство по ЧС',
    region: 'Самарканд',
    budget_amount: 320_000_000,
    currency: 'UZS',
    bid_deadline_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(),
    status: 'open'
  },
  {
    id: 'L-1003',
    source: 'etender',
    url: 'https://etender.uzex.uz/lots/2/1003',
    title: 'Комплекс психофизиологического тестирования "НС-Психотест"',
    description: 'Комплекс "НС-Психотест", поставка, обучение персонала, гарантия 12 мес.',
    category: 'Медоборудование',
    buyer: 'РНПЦ',
    region: 'Бухара',
    budget_amount: 125_000_000,
    currency: 'UZS',
    bid_deadline_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    published_at: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    status: 'closed'
  }
];

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').toLowerCase();

    // Пытаемся достать из Redis (если захотите, позже подключим)
    // Сейчас просто возвращаем мок-данные и фильтруем по q
    let items = MOCK_LOTS;

    if (q) {
      items = items.filter(l =>
        (l.title + ' ' + l.description + ' ' + l.buyer).toLowerCase().includes(q)
      );
    }

    return jsonOK({ ok: true, items });
  } catch (e: any) {
    // Никогда не роняем функцию — возвращаем пустой список
    return jsonOK({ ok: true, items: [], error: e?.message || String(e) });
  }
}
