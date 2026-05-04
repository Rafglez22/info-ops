import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Info Ops',
  description: 'Call funnel tracking dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#07080f', color: '#e8eaf0' }}>
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
