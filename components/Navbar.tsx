'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Dashboard', href: '/' },
    { label: 'Leads', href: '/leads' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#0a0c16',
        borderBottom: '1px solid #1e2235',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '52px', gap: '32px' }}>
          {/* Brand */}
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#e8eaf0', letterSpacing: '0.05em' }}>
            INFO OPS
          </span>

          {/* Tab Links */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {tabs.map((tab) => {
              const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#e8eaf0' : '#8b90a8',
                    backgroundColor: active ? '#1e2235' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
