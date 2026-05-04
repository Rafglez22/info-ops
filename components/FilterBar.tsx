'use client';

import { SETTERS, PLATFORMS, CONTENT_PIECES, FUNNELS } from '@/lib/mockData';

interface FilterBarProps {
  filters: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const SOURCES = ['youtube', 'instagram', 'tiktok', 'facebook', 'All'];
const MEDIUMS = ['organic', 'paid', 'All'];
const DM_OPTIONS = ['All', 'yes', 'no'];
const TYPES = ['live', 'dm_close', 'All'];

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

function FilterSelect({ label, value, options, onChange }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        backgroundColor: value && value !== 'All' ? '#1e2a3a' : '#0d0f1a',
        border: `1px solid ${value && value !== 'All' ? '#4a9eff55' : '#1e2235'}`,
        borderRadius: '6px',
        color: value && value !== 'All' ? '#4a9eff' : '#8b90a8',
        fontSize: '12px',
        padding: '5px 10px',
        cursor: 'pointer',
        outline: 'none',
        fontWeight: 500,
      }}
    >
      <option value="All">{label}</option>
      {options.filter((o) => o !== 'All').map((o) => (
        <option key={o} value={o}>
          {o.charAt(0).toUpperCase() + o.slice(1).replace('_', ' ')}
        </option>
      ))}
    </select>
  );
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <FilterSelect label="Type" value={filters.type} options={TYPES} onChange={(v) => onChange('type', v)} />
      <FilterSelect label="Setter" value={filters.setter} options={SETTERS} onChange={(v) => onChange('setter', v)} />
      <FilterSelect label="Platform" value={filters.platform} options={PLATFORMS} onChange={(v) => onChange('platform', v)} />
      <FilterSelect label="DM Close" value={filters.dmClose} options={DM_OPTIONS} onChange={(v) => onChange('dmClose', v)} />
      <FilterSelect label="Source" value={filters.source} options={SOURCES} onChange={(v) => onChange('source', v)} />
      <FilterSelect label="Content" value={filters.content} options={CONTENT_PIECES} onChange={(v) => onChange('content', v)} />
      <FilterSelect label="Funnel" value={filters.funnel} options={FUNNELS} onChange={(v) => onChange('funnel', v)} />
      {Object.values(filters).some((v) => v && v !== 'All') && (
        <button
          onClick={() => {
            ['type', 'setter', 'platform', 'dmClose', 'source', 'content', 'funnel'].forEach((k) =>
              onChange(k, 'All')
            );
          }}
          style={{
            backgroundColor: 'transparent',
            border: '1px solid #ef444444',
            borderRadius: '6px',
            color: '#ef4444',
            fontSize: '12px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
