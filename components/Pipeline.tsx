'use client';

import { Lead, CallStatus } from '@/lib/types';
import { useState } from 'react';

interface PipelineProps {
  leads: Lead[];
}

const COLUMNS: { key: CallStatus; label: string; color: string }[] = [
  { key: 'closed', label: 'CLOSED', color: '#22c55e' },
  { key: 'deposit', label: 'DEPOSITS', color: '#4a9eff' },
  { key: 'no_close', label: 'NO CLOSE', color: '#ef4444' },
  { key: 'no_show', label: 'NO SHOW', color: '#ef4444' },
  { key: 'cancelled', label: 'CANCELLED', color: '#8b90a8' },
  { key: 'disqualified', label: 'DISQUALIFIED', color: '#50546a' },
  { key: 'new_call', label: 'NEW CALLS', color: '#4a9eff' },
  { key: 'past_call', label: 'PAST CALLS', color: '#50546a' },
];

function formatDt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function LeadCard({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: '#0d0f1a',
        border: '1px solid #1e2235',
        borderRadius: '8px',
        padding: '12px 14px',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2a3050')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1e2235')}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ fontWeight: 600, fontSize: '13px', color: '#e8eaf0', marginBottom: '2px' }}>
        {lead.name}
      </div>
      <div style={{ fontSize: '11px', color: '#50546a', marginBottom: '8px' }}>{lead.email}</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Appointment</div>
          <div style={{ fontSize: '11px', color: '#8b90a8' }}>{formatDt(lead.appointmentDatetime)}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Setter</div>
          <div style={{ fontSize: '11px', color: '#8b90a8' }}>{lead.setter}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: expanded ? '10px' : '0' }}>
        {lead.source && lead.source !== 'N/A' && (
          <span style={tagStyle('#1e3a5f', '#4a9eff')}>{lead.source}</span>
        )}
        {lead.content && lead.content !== 'N/A' && (
          <span style={tagStyle('#1e2a3a', '#8b90a8')}>{lead.content}</span>
        )}
        {lead.dmClose && (
          <span style={tagStyle('#3a1e2a', '#a855f7')}>DM Close</span>
        )}
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #1e2235', paddingTop: '10px', marginTop: '4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <Field label="Source" value={lead.source} />
            <Field label="Medium" value={lead.medium} />
            <Field label="Campaign" value={lead.campaign} />
            <Field label="Content" value={lead.content} />
            <Field label="Funnel" value={lead.funnel} />
            <Field label="Call Type" value={lead.callType} />
          </div>

          {lead.callNotes && (
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>Call Notes</div>
              <div style={{ fontSize: '12px', color: '#8b90a8' }}>{lead.callNotes}</div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {lead.salesCallRecordingUrl && (
              <a
                href={lead.salesCallRecordingUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                style={linkBtnStyle}
              >
                Sales Call Recording ↗
              </a>
            )}
            {lead.postCallFormUrl && (
              <a
                href={lead.postCallFormUrl}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...linkBtnStyle, backgroundColor: '#1e3a2f', color: '#22c55e', borderColor: '#22c55e44' }}
              >
                Post Call Form ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#8b90a8' }}>{value || 'N/A'}</div>
    </div>
  );
}

function tagStyle(bg: string, color: string): React.CSSProperties {
  return { backgroundColor: bg, color, borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, border: `1px solid ${color}44` };
}

const linkBtnStyle: React.CSSProperties = {
  backgroundColor: '#1e2a3a',
  color: '#4a9eff',
  border: '1px solid #4a9eff44',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '11px',
  fontWeight: 500,
  textDecoration: 'none',
  cursor: 'pointer',
};

export default function Pipeline({ leads }: PipelineProps) {
  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', alignItems: 'flex-start' }}>
      {COLUMNS.map((col) => {
        const colLeads = leads.filter((l) => l.status === col.key);
        return (
          <div
            key={col.key}
            style={{
              minWidth: '240px',
              maxWidth: '260px',
              flexShrink: 0,
            }}
          >
            {/* Column Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
                padding: '6px 10px',
                backgroundColor: '#0a0c16',
                borderRadius: '6px',
                border: '1px solid #1e2235',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: col.color, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b90a8', letterSpacing: '0.06em' }}>{col.label}</span>
              <span
                style={{
                  marginLeft: 'auto',
                  backgroundColor: col.color + '22',
                  color: col.color,
                  borderRadius: '10px',
                  padding: '1px 7px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                {colLeads.length}
              </span>
            </div>

            {/* Cards */}
            <div>
              {colLeads.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#2a2f45', fontSize: '12px', padding: '20px 0' }}>—</div>
              ) : (
                colLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
