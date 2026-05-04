'use client';

import { useState, useMemo, useEffect } from 'react';
import { mockLeads, mockPayments } from '@/lib/mockData';
import { Lead, Payment } from '@/lib/types';
import { filterLeads } from '@/lib/mockData';
import Pipeline from '@/components/Pipeline';
import Payments from '@/components/Payments';
import FilterBar from '@/components/FilterBar';

type LeadsTab = 'pipeline' | 'payments';
type OperatorFilter = 'view' | 'coach' | 'operator';

export default function LeadsPage() {
  const [tab, setTab] = useState<LeadsTab>('pipeline');
  const [operatorMode, setOperatorMode] = useState<OperatorFilter>('operator');
  const [filters, setFilters] = useState<Record<string, string>>({
    type: 'All', setter: 'All', platform: 'All',
    dmClose: 'All', source: 'All', content: 'All', funnel: 'All',
  });
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [dataSource, setDataSource] = useState<'mock' | 'sheets'>('mock');

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const [leadsRes, paymentsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/payments'),
        ]);
        if (!leadsRes.ok || !paymentsRes.ok) throw new Error('API error');
        const [leadsJson, paymentsJson] = await Promise.all([
          leadsRes.json(),
          paymentsRes.json(),
        ]);
        if (!cancelled && leadsJson.leads && paymentsJson.payments) {
          setLeads(leadsJson.leads);
          setPayments(paymentsJson.payments);
          setDataSource('sheets');
        }
      } catch {
        // mock data already set
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredLeads = useMemo(() => filterLeads(leads, filters), [leads, filters]);

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
    color: active ? '#e8eaf0' : '#8b90a8',
    backgroundColor: active ? '#4a9eff22' : 'transparent',
    border: `1px solid ${active ? '#4a9eff55' : '#1e2235'}`,
    cursor: 'pointer', letterSpacing: '0.04em',
  });

  const opBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px', borderRadius: '6px', fontSize: '11px',
    fontWeight: active ? 700 : 500,
    color: active ? '#eab308' : '#50546a',
    backgroundColor: active ? '#2a1f0a' : 'transparent',
    border: `1px solid ${active ? '#eab30844' : '#1e2235'}`,
    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em',
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#e8eaf0', margin: 0 }}>Leads</h1>
        <span style={{
          fontSize: '11px', fontWeight: 600,
          color: dataSource === 'sheets' ? '#22c55e' : '#eab308',
          backgroundColor: dataSource === 'sheets' ? '#22c55e15' : '#eab30815',
          border: `1px solid ${dataSource === 'sheets' ? '#22c55e44' : '#eab30844'}`,
          borderRadius: '4px', padding: '3px 8px',
        }}>
          {dataSource === 'sheets' ? '● Live — Google Sheets' : '● Demo data'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        <button style={tabBtnStyle(tab === 'pipeline')} onClick={() => setTab('pipeline')}>PIPELINE</button>
        <button style={tabBtnStyle(tab === 'payments')} onClick={() => setTab('payments')}>PAYMENTS</button>
      </div>

      {tab === 'pipeline' && (
        <>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#50546a', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>View as:</span>
            {(['view', 'coach', 'operator'] as OperatorFilter[]).map((mode) => (
              <button key={mode} style={opBtnStyle(operatorMode === mode)} onClick={() => setOperatorMode(mode)}>
                {mode}
              </button>
            ))}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <FilterBar filters={filters} onChange={handleFilter} />
          </div>
          <Pipeline leads={filteredLeads} />
        </>
      )}

      {tab === 'payments' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <FilterBar filters={filters} onChange={handleFilter} />
          </div>
          <Payments payments={payments} />
        </>
      )}
    </div>
  );
}
