interface MetricCardProps {
  label: string;
  value: string;
  color?: 'green' | 'blue' | 'orange' | 'red' | 'yellow' | 'white';
  size?: 'large' | 'normal';
  fullWidth?: boolean;
}

const COLOR_MAP = {
  green: '#22c55e',
  blue: '#4a9eff',
  orange: '#f97316',
  red: '#ef4444',
  yellow: '#eab308',
  white: '#e8eaf0',
};

const BORDER_MAP = {
  green: '#22c55e33',
  blue: '#4a9eff33',
  orange: '#f9731633',
  red: '#ef444433',
  yellow: '#eab30833',
  white: '#e8eaf022',
};

export default function MetricCard({ label, value, color = 'white', size = 'normal', fullWidth = false }: MetricCardProps) {
  const c = COLOR_MAP[color];
  const b = BORDER_MAP[color];

  return (
    <div
      style={{
        backgroundColor: '#0d0f1a',
        border: `1px solid ${b}`,
        borderLeft: `3px solid ${c}`,
        borderRadius: '8px',
        padding: size === 'large' ? '20px 24px' : '16px 20px',
        flex: fullWidth ? '1 1 100%' : '1 1 0',
        minWidth: size === 'large' ? '200px' : '140px',
      }}
    >
      <div style={{ fontSize: '11px', color: '#50546a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: size === 'large' ? '32px' : '22px', fontWeight: 700, color: c, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}
