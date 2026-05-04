import { NextResponse } from 'next/server';
import { sheetsUrl, parseCsv } from '@/lib/sheets';
import { Lead } from '@/lib/types';

export async function GET() {
  try {
    const url = sheetsUrl('Leads');
    const res = await fetch(url, { next: { revalidate: 30 } }); // cache 30s
    if (!res.ok) throw new Error(`Sheets fetch failed: ${res.status}`);

    const text = await res.text();
    const rows = parseCsv(text);

    const leads: Lead[] = rows.map((r) => ({
      id: r.id || '',
      name: r.name || '',
      email: r.email || '',
      appointmentDatetime: r.appointment_datetime || '',
      status: (r.status as Lead['status']) || 'new_call',
      setter: r.setter || '',
      platform: r.platform || '',
      source: r.source || '',
      medium: r.medium || '',
      campaign: r.campaign || '',
      content: r.content || '',
      funnel: r.funnel || '',
      callType: (r.call_type as Lead['callType']) || 'live',
      dmClose: r.dm_close === 'TRUE',
      callNotes: r.call_notes || '',
      salesCallRecordingUrl: r.sales_call_recording_url || '',
      postCallFormUrl: r.post_call_form_url || '',
      closedDate: r.closed_date || undefined,
    }));

    return NextResponse.json({ leads, source: 'sheets' });
  } catch (err) {
    console.error('Sheets leads fetch error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch from Google Sheets', detail: String(err) },
      { status: 500 }
    );
  }
}
