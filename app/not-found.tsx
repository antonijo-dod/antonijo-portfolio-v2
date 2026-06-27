import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-[25px]">
      <h1 className="mb-5 text-green font-mono text-[clamp(100px,25vw,200px)] leading-none">
        404
      </h1>

      <h2 className="mb-5 text-lightest-slate text-[clamp(30px,5vw,50px)]">
        Page Not Found
      </h2>

      <p className="mb-[40px] text-slate max-w-[400px]">
        The page you are looking for might have been removed, had its name changed, or is temporarily
        unavailable.
      </p>

      <Link href="/" className="btn">
        Go Home
      </Link>
    </main>
  );
}
