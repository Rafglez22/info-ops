import { NextResponse } from 'next/server';
import { sheetsUrl, parseCsv } from '@/lib/sheets';
import { Payment } from '@/lib/types';

export async function GET() {
  try {
    const url = sheetsUrl('Payments');
    const res = await fetch(url, { next: { revalidate: 30 } }); // cache 30s
    if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`);

    const text = await res.text();
    const rows = parseCsv(text);

    const payments: Payment[] = rows.map((r) => ({
      id: r.id || '',
      leadId: r.lead_id || '',
      leadName: r.lead_name || '',
      leadEmail: r.lead_email || '',
      revenue: parseFloat(r.revenue) || 0,
      collected: parseFloat(r.collected) || 0,
      paymentPlatform: (r.payment_platform as Payment['paymentPlatform']) || 'stripe',
      firstPaymentDate: r.first_payment_date || '',
      depositOnly: r.deposit_only === 'TRUE',
      weekNumber: parseInt(r.week_number) || 1,
    }));

    return NextResponse.json({ payments, source: 'sheets' });
  } catch (err) {
    console.error('Sheets payments fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch from Google Sheets', detail: String(err) },
      { status: 500 }
    );
  }
}
