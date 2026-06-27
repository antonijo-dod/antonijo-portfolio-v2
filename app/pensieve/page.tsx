import Link from 'next/link';
import type { Metadata } from 'next';
import { getMarkdownFiles } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Pensieve | Antonijo Đođ',
};

export default function Pensieve() {
  const posts = getMarkdownFiles('posts').sort((a, b) => {
    const dateA = new Date(String(a.date ?? 0)).getTime();
    const dateB = new Date(String(b.date ?? 0)).getTime();
    return dateB - dateA;
  });

  return (
    <main style={{ padding: '200px 150px' }}>
      <div className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href="/">Antonijo Đođ</Link>
      </div>

      <h1
        style={{
          margin: '0 0 20px',
          color: 'var(--lightest-slate)',
          fontSize: 'clamp(40px, 8vw, 80px)',
        }}>
        The Pensieve
      </h1>

      <p style={{ marginBottom: '40px', color: 'var(--slate)', maxWidth: '600px' }}>
        A collection of posts about things I&apos;ve learned, built, or found interesting.
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post, i) => {
          const tags = post.tags as string[] | undefined;
          const title = String(post.title ?? post.slug);
          const dateStr = post.date ? new Date(String(post.date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

          return (
            <li
              key={i}
              style={{
                borderBottom: '1px solid var(--lightest-navy)',
                padding: '20px 0',
              }}>
              <Link
                href={`/pensieve/${post.slug}`}
                style={{ display: 'block' }}
                className="hover:text-[var(--green)]">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
                  <h2
                    style={{
                      margin: 0,
                      color: 'var(--lightest-slate)',
                      fontSize: 'var(--fz-xxl)',
                      fontWeight: 600,
                      transition: 'var(--transition)',
                    }}
                    className="group-hover:text-[var(--green)]">
                    {title}
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--fz-xs)',
                      color: 'var(--slate)',
                      whiteSpace: 'nowrap',
                    }}>
                    {dateStr}
                  </span>
                </div>

                {tags && tags.length > 0 && (
                  <ul
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      listStyle: 'none',
                      padding: 0,
                      margin: '10px 0 0',
                    }}>
                    {tags.map((tag, j) => (
                      <li
                        key={j}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--fz-xxs)',
                          color: 'var(--green)',
                          padding: '2px 8px',
                          border: '1px solid var(--green)',
                          borderRadius: 'var(--border-radius)',
                        }}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
