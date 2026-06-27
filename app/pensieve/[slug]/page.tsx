import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllSlugs, getMarkdownBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('posts');
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMarkdownBySlug('posts', slug);
  if (!post) return {};
  return {
    title: `${String(post.title ?? slug)} | Antonijo Đođ`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getMarkdownBySlug('posts', slug);

  if (!post) notFound();

  const tags = post.tags as string[] | undefined;
  const dateStr = post.date
    ? new Date(String(post.date)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main style={{ padding: '200px 150px', maxWidth: '860px', margin: '0 auto' }}>
      <div className="breadcrumb">
        <span className="arrow">&larr;</span>
        <Link href="/pensieve">The Pensieve</Link>
      </div>

      <header style={{ marginBottom: '50px' }}>
        <h1
          style={{
            color: 'var(--lightest-slate)',
            fontSize: 'clamp(26px, 5vw, 50px)',
            lineHeight: 1.1,
            margin: '0 0 10px',
          }}>
          {String(post.title ?? slug)}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fz-xs)',
            color: 'var(--slate)',
            margin: 0,
          }}>
          {dateStr}
        </p>

        {tags && tags.length > 0 && (
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              listStyle: 'none',
              padding: 0,
              margin: '15px 0 0',
            }}>
            {tags.map((tag, i) => (
              <li key={i}>
                <Link
                  href={`/pensieve/tags/${tag.toLowerCase()}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fz-xxs)',
                    color: 'var(--green)',
                    padding: '2px 8px',
                    border: '1px solid var(--green)',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'var(--transition)',
                  }}
                  className="hover:bg-[var(--green-tint)]">
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div
        style={{ color: 'var(--light-slate)', fontSize: 'var(--fz-lg)', lineHeight: 1.6 }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
