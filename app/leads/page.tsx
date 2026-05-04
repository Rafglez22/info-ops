'use client';

import { useState, useMemo } from 'react';
import { mockLeads, mockPayments, filterLeads } from '@/lib/mockData';
import Pipeline from '@/components/Pipeline';
import Payments from '@/components/Payments';
import FilterBar from '@/components/FilterBar';

type LeadsTab = 'pipeline' | 'payments';
type OperatorFilter = 'view' | 'coach' | 'operator';

export default function LeadsPage() {
  const [tab, setTab] = useState<LeadsTab>('pipeline');
  const [operatorMode, setOperatorMode] = useState<OperatorFilter>('operator');
  const [filters, setFilters] = useState<Record<string, string>>({
    type: 'All',
    setter: 'All',
    platform: 'All',
    dmClose: 'All',
    source: 'All',
    content: 'All',
    funnel: 'All',
  });

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredLeads = useMemo(() => filterLeads(mockLeads, filters), [filters]);

  const tabBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    color: active ? '#e8eaf0' : '#8b90a8',
    backgroundColor: active ? '#4a9eff22' : 'transparent',
    border: `1px solid ${active ? '#4a9eff55' : '#1e2235'}`,
    cursor: 'pointer',
    letterSpacing: '0.04em',
  });

  const opBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: active ? 700 : 500,
    color: active ? '#eab308' : '#50546a',
    backgroundColor: active ? '#2a1f0a' : 'transparent',
    border: `1px solid ${active ? '#eab30844' : '#1e2235'}`,
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#e8eaf0', marginBottom: '20px' }}>Leads</h1>

      {/* Pipeline / Payments tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        <button style={tabBtnStyle(tab === 'pipeline')} onClick={() => setTab('pipeline')}>
          PIPELINE
        </button>
        <button style={tabBtnStyle(tab === 'payments')} onClick={() => setTab('payments')}>
          PAYMENTS
        </button>
      </div>

      {tab === 'pipeline' && (
        <>
          {/* Operator filter row */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#50546a', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>View as:</span>
            {(['view', 'coach', 'operator'] as OperatorFilter[]).map((mode) => (
              <button key={mode} style={opBtnStyle(operatorMode === mode)} onClick={() => setOperatorMode(mode)}>
                {mode}
              </button>
            ))}
          </div>

          {/* Lead filters */}
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
          <Payments payments={mockPayments} />
        </>
      )}
    </div>
  );
}
