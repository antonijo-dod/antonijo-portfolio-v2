import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Social from '@/components/Social';
import Email from '@/components/Email';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Antonijo Đođ | Web Developer',
  description:
    'Antonijo Đođ is a web developer specializing in building exceptional digital experiences.',
  openGraph: {
    title: 'Antonijo Đođ | Web Developer',
    description: 'Antonijo Đođ is a web developer specializing in building exceptional digital experiences.',
    images: ['/images/og.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <a
          href="#content"
          style={{
            position: 'absolute',
            top: 'auto',
            left: '-999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            zIndex: -99,
          }}
          className="focus:static focus:w-auto focus:h-auto focus:p-4 focus:outline-none focus:rounded focus:bg-[var(--light-navy)] focus:text-green focus:font-mono focus:text-fz-sm focus:z-[99]">
          Skip to Content
        </a>

        <div
          id="root"
          style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gridTemplateColumns: '100%',
          }}>
          <Nav />
          <Social />
          <Email />

          <div id="content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
