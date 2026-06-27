import Link from 'next/link';
import type { Metadata } from 'next';
import { getMarkdownFiles } from '@/lib/markdown';
import Icon from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'Archive | Antonijo Đođ',
};

export default function Archive() {
  const projects = getMarkdownFiles('projects');
  const featured = getMarkdownFiles('featured');

  const all = [...projects, ...featured]
    .sort((a, b) => {
      const dateA = new Date(String(a.date ?? 0)).getTime();
      const dateB = new Date(String(b.date ?? 0)).getTime();
      return dateB - dateA;
    });

  return (
    <main className="fill-height" style={{ padding: '200px 150px' }}>
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
        All Projects
      </h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '40px' }}>
        <thead>
          <tr
            style={{
              textAlign: 'left',
              color: 'var(--green)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fz-xs)',
            }}>
            <th style={{ padding: '10px 20px 10px 0' }}>Year</th>
            <th style={{ padding: '10px 20px' }}>Title</th>
            <th style={{ padding: '10px 20px' }} className="hidden md:table-cell">
              Built with
            </th>
            <th style={{ padding: '10px 20px' }} className="hidden sm:table-cell">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {all.map((project, i) => {
            const parsedYear = project.date
              ? new Date(String(project.date)).getFullYear()
              : NaN;
            const year = parsedYear && parsedYear >= 2010 ? parsedYear : '—';
            const tech = project.tech as string[] | undefined;
            const external = project.external as string | undefined;
            const github = project.github as string | undefined;
            const link = external || github;

            return (
              <tr
                key={i}
                style={{
                  borderTop: '1px solid var(--lightest-navy)',
                  color: 'var(--light-slate)',
                  fontSize: 'var(--fz-sm)',
                  transition: 'var(--transition)',
                }}
                className="hover:bg-[var(--light-navy)] hover:text-[var(--white)]">
                <td
                  style={{
                    padding: '12px 20px 12px 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fz-xs)',
                    color: 'var(--green)',
                  }}>
                  {String(year)}
                </td>
                <td style={{ padding: '12px 20px', color: 'var(--lightest-slate)', fontWeight: 600 }}>
                  {String(project.title ?? '')}
                </td>
                <td
                  style={{ padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fz-xxs)' }}
                  className="hidden md:table-cell">
                  {tech?.join(' · ')}
                </td>
                <td style={{ padding: '12px 20px' }} className="hidden sm:table-cell">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="External Link"
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="hover:text-[var(--green)]">
                      <span style={{ display: 'block', width: '20px', height: '20px' }}>
                        <Icon name={external ? 'External' : 'GitHub'} />
                      </span>
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
