import type { Metadata } from 'next';
import { Geist, Geist_Mono, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const dmSerif  = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'LabFlow — Assignment System',
  description: 'A modern lab assignment management system for teachers and students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0d0f12] text-white">{children}</body>
    </html>
  );
}
