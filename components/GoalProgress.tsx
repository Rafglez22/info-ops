interface GoalProgressProps {
  current: number;
  goal: number;
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

export default function GoalProgress({ current, goal }: GoalProgressProps) {
  const pct = Math.min((current / goal) * 100, 100);

  return (
    <div
      style={{
        backgroundColor: '#0d0f1a',
        border: '1px solid #22c55e33',
        borderLeft: '3px solid #22c55e',
        borderRadius: '8px',
        padding: '16px 24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Monthly Cash Goal
        </span>
        <span style={{ fontSize: '13px', color: '#8b90a8' }}>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>{fmt(current)}</span>
          {' / '}
          <span>{fmt(goal)}</span>
          {'  '}
          <span style={{ color: '#4a9eff', fontWeight: 600 }}>{Math.round(pct)}%</span>
        </span>
      </div>
      <div style={{ height: '8px', backgroundColor: '#1e2235', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            backgroundColor: '#22c55e',
            borderRadius: '4px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}
