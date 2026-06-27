import Link from 'next/link';
import type { Metadata } from 'next';
import { getMarkdownFiles } from '@/lib/markdown';

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getMarkdownFiles('posts');
  const tags = new Set<string>();
  posts.forEach(post => {
    const postTags = post.tags as string[] | undefined;
    postTags?.forEach(t => tags.add(t.toLowerCase()));
  });
  return Array.from(tags).map(tag => ({ tag }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag} | Antonijo Đođ` };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;

  const allPosts = getMarkdownFiles('posts').sort((a, b) => {
    const dateA = new Date(String(a.date ?? 0)).getTime();
    const dateB = new Date(String(b.date ?? 0)).getTime();
    return dateB - dateA;
  });

  const posts = allPosts.filter(post => {
    const tags = post.tags as string[] | undefined;
    return tags?.some(t => t.toLowerCase() === tag);
  });

  return (
    <main style={{ padding: '200px 150px' }}>
      <div className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href="/pensieve">The Pensieve</Link>
      </div>

      <h1
        style={{
          margin: '0 0 40px',
          color: 'var(--lightest-slate)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(26px, 5vw, 50px)',
        }}>
        <span style={{ color: 'var(--green)' }}>#</span>
        {tag}
      </h1>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {posts.map((post, i) => {
          const dateStr = post.date
            ? new Date(String(post.date)).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '';

          return (
            <li key={i} style={{ borderBottom: '1px solid var(--lightest-navy)', padding: '20px 0' }}>
              <Link href={`/pensieve/${post.slug}`} className="hover:text-[var(--green)]">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <h2 style={{ margin: 0, color: 'var(--lightest-slate)', fontSize: 'var(--fz-xxl)', fontWeight: 600 }}>
                    {String(post.title ?? post.slug)}
                  </h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-xs)', color: 'var(--slate)' }}>
                    {dateStr}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
