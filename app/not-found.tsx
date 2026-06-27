import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '0 25px',
      }}>
      <h1
        style={{
          margin: '0 0 20px',
          color: 'var(--green)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(100px, 25vw, 200px)',
          lineHeight: 1,
        }}>
        404
      </h1>

      <h2
        style={{
          margin: '0 0 20px',
          color: 'var(--lightest-slate)',
          fontSize: 'clamp(30px, 5vw, 50px)',
        }}>
        Page Not Found
      </h2>

      <p style={{ margin: '0 0 40px', color: 'var(--slate)', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily
        unavailable.
      </p>

      <Link
        href="/"
        style={{
          color: 'var(--green)',
          backgroundColor: 'transparent',
          border: '1px solid var(--green)',
          borderRadius: 'var(--border-radius)',
          padding: '1.25rem 1.75rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fz-sm)',
          lineHeight: 1,
          textDecoration: 'none',
          transition: 'var(--transition)',
          display: 'inline-block',
        }}
        className="hover:bg-[var(--green-tint)]">
        Go Home
      </Link>
    </main>
  );
}
