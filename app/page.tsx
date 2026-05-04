'use client';

import { useState, useMemo } from 'react';
import { mockLeads, mockPayments, computeMetrics, filterLeads, MONTHLY_GOAL } from '@/lib/mockData';
import FilterBar from '@/components/FilterBar';
import MetricCard from '@/components/MetricCard';
import GoalProgress from '@/components/GoalProgress';

type TimePeriod = 'day' | 'week' | 'month' | 'custom';

function fmt$(n: number) {
  return '$' + Math.round(n).toLocaleString();
}
function fmtPct(n: number) {
  return n.toFixed(2) + '%';
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<TimePeriod>('month');
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
  const metrics = useMemo(
    () => computeMetrics(filteredLeads, mockPayments),
    [filteredLeads]
  );

  const periodBtns: { label: string; value: TimePeriod }[] = [
    { label: 'DAY', value: 'day' },
    { label: 'WEEK', value: 'week' },
    { label: 'MONTH', value: 'month' },
    { label: 'CUSTOM', value: 'custom' },
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      {/* Time Period Selector */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {periodBtns.map((b) => (
          <button
            key={b.value}
            onClick={() => setPeriod(b.value)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: period === b.value ? '#e8eaf0' : '#50546a',
              backgroundColor: period === b.value ? '#4a9eff22' : 'transparent',
              border: `1px solid ${period === b.value ? '#4a9eff55' : '#1e2235'}`,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '28px' }}>
        <FilterBar filters={filters} onChange={handleFilter} />
      </div>

      {/* CASH BREAKDOWN */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          Cash Breakdown
        </span>
      </div>

      {/* Top 2 large metrics */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <MetricCard label="Total Revenue Generated" value={fmt$(metrics.totalRevenueGenerated)} color="yellow" size="large" />
        <MetricCard label="Total Cash Collected" value={fmt$(metrics.totalCashCollected)} color="green" size="large" />
      </div>

      {/* Row of 4 */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <MetricCard label="Cash Collected After Fees" value={fmt$(metrics.cashCollectedAfterFees)} color="green" />
        <MetricCard label="Cash to Be Collected" value={fmt$(metrics.cashToBeCollected)} color="orange" />
        <MetricCard label="Cash Per Call Taken" value={fmt$(metrics.cashPerCallTaken)} color="blue" />
        <MetricCard label="Average Order Value" value={fmt$(metrics.averageOrderValue)} color="blue" />
      </div>

      {/* Goal Progress */}
      <div style={{ marginBottom: '32px' }}>
        <GoalProgress current={metrics.totalCashCollected} goal={MONTHLY_GOAL} />
      </div>

      {/* SALES BREAKDOWN */}
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          Sales Breakdown
        </span>
      </div>

      {/* Row 1: Booked, Live, Cancelled, New */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <MetricCard label="Total Booked Calls" value={String(metrics.totalBookedCalls)} color="blue" />
        <MetricCard label="Total Live Calls" value={String(metrics.totalLiveCalls)} color="green" />
        <MetricCard label="Total Cancelled" value={String(metrics.totalCancelled)} color="red" />
        <MetricCard label="Total New" value={String(metrics.totalNew)} color="white" />
      </div>

      {/* Row 2: Closed, Deposits, No Closes, No Shows */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <MetricCard label="Closed Calls" value={String(metrics.closedCalls)} color="green" />
        <MetricCard label="Deposits" value={String(metrics.deposits)} color="blue" />
        <MetricCard label="No Closes" value={String(metrics.noCloses)} color="red" />
        <MetricCard label="No Shows" value={String(metrics.noShows)} color="red" />
      </div>

      {/* Row 3: Rates */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        <MetricCard label="Close Rate" value={fmtPct(metrics.closeRate)} color="green" />
        <MetricCard label="No-Close Rate" value={fmtPct(metrics.noCloseRate)} color="red" />
        <MetricCard label="Show Rate" value={fmtPct(metrics.showRate)} color="green" />
        <MetricCard label="No-Show Rate" value={fmtPct(metrics.noShowRate)} color="red" />
      </div>
    </div>
  );
}
