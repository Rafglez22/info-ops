'use client';

import { Payment } from '@/lib/types';
import { FEE_RATES } from '@/lib/mockData';
import { useState } from 'react';

interface PaymentsProps {
  payments: Payment[];
}

type PaymentView = 'weekly' | 'student';

function fmt$(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

function fmtDate(iso: string) {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PaymentCard({ payment }: { payment: Payment }) {
  const owed = payment.revenue - payment.collected;
  const feeRate = FEE_RATES[payment.paymentPlatform] ?? 0;
  const afterFees = payment.collected * (1 - feeRate);
  const isPaid = owed <= 0;

  return (
    <div
      style={{
        backgroundColor: '#0d0f1a',
        border: `1px solid ${isPaid ? '#22c55e22' : '#f9731622'}`,
        borderRadius: '8px',
        padding: '12px 14px',
        marginBottom: '8px',
      }}
    >
      {payment.depositOnly && (
        <div style={{ marginBottom: '4px' }}>
          <span style={{ backgroundColor: '#1e3a5f', color: '#4a9eff', borderRadius: '4px', padding: '1px 6px', fontSize: '10px', fontWeight: 700, border: '1px solid #4a9eff44' }}>
            DEPOSIT
          </span>
        </div>
      )}

      <div style={{ fontWeight: 600, fontSize: '13px', color: '#e8eaf0', marginBottom: '8px' }}>
        {payment.leadName}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Revenue</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#eab308' }}>{fmt$(payment.revenue)}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Collected</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#22c55e' }}>{fmt$(payment.collected)}</div>
        </div>
      </div>

      {isPaid ? (
        <div style={{ color: '#22c55e', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>✓ Payment Complete</div>
      ) : (
        <div style={{ color: '#f97316', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>{fmt$(owed)} owed</div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>After Fees</div>
          <div style={{ fontSize: '12px', color: '#8b90a8' }}>{fmt$(afterFees)} ({Math.round(feeRate * 100)}% {payment.paymentPlatform})</div>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '11px', color: '#50546a' }}>
        First payment: {fmtDate(payment.firstPaymentDate)}
      </div>
    </div>
  );
}

function WeeklyView({ payments }: { payments: Payment[] }) {
  const maxWeek = Math.max(...payments.map((p) => p.weekNumber), 1);
  const weeks = Array.from({ length: maxWeek }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', alignItems: 'flex-start' }}>
      {weeks.map((week) => {
        const weekPayments = payments.filter((p) => p.weekNumber === week);
        return (
          <div key={week} style={{ minWidth: '220px', maxWidth: '240px', flexShrink: 0 }}>
            <div
              style={{
                marginBottom: '10px',
                padding: '6px 10px',
                backgroundColor: '#0a0c16',
                borderRadius: '6px',
                border: '1px solid #1e2235',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b90a8', letterSpacing: '0.06em' }}>
                Week {week}
              </span>
              <span style={{ fontSize: '11px', color: '#4a9eff', fontWeight: 600 }}>
                {fmt$(weekPayments.reduce((a, p) => a + p.collected, 0))}
              </span>
            </div>
            {weekPayments.map((p) => <PaymentCard key={p.id} payment={p} />)}
          </div>
        );
      })}
    </div>
  );
}

function StudentView({ payments }: { payments: Payment[] }) {
  // Group by leadEmail
  const studentMap = new Map<string, { name: string; email: string; payments: Payment[] }>();
  payments.forEach((p) => {
    if (!studentMap.has(p.leadEmail)) {
      studentMap.set(p.leadEmail, { name: p.leadName, email: p.leadEmail, payments: [] });
    }
    studentMap.get(p.leadEmail)!.payments.push(p);
  });
  const students = Array.from(studentMap.values());

  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', alignItems: 'flex-start' }}>
      <div style={{ minWidth: '220px', maxWidth: '240px', flexShrink: 0 }}>
        <div style={{ padding: '6px 10px', backgroundColor: '#0a0c16', borderRadius: '6px', border: '1px solid #1e2235', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#50546a', letterSpacing: '0.06em' }}>UNASSIGNED</span>
        </div>
        <div style={{ color: '#2a2f45', fontSize: '12px', padding: '20px 0', textAlign: 'center' }}>—</div>
      </div>
      {students.map((s) => (
        <div key={s.email} style={{ minWidth: '220px', maxWidth: '240px', flexShrink: 0 }}>
          <div
            style={{
              padding: '6px 10px',
              backgroundColor: '#0a0c16',
              borderRadius: '6px',
              border: '1px solid #1e2235',
              marginBottom: '10px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#e8eaf0' }}>{s.name}</div>
            <div style={{ fontSize: '10px', color: '#50546a' }}>{s.email}</div>
          </div>
          {s.payments.map((p) => <PaymentCard key={p.id} payment={p} />)}
        </div>
      ))}
    </div>
  );
}

export default function Payments({ payments }: PaymentsProps) {
  const [view, setView] = useState<PaymentView>('weekly');

  return (
    <div>
      <p style={{ fontSize: '11px', color: '#50546a', marginBottom: '14px' }}>
        {view === 'student'
          ? 'Drag payment cards between columns to re-attribute them. Revenue share & coach payments are hidden.'
          : 'Payment tracking by cohort week. Green = fully collected. Orange = balance outstanding.'}
      </p>

      {view === 'weekly' ? <WeeklyView payments={payments} /> : <StudentView payments={payments} />}
    </div>
  );
}
