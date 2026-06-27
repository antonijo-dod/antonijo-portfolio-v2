import Side from './Side';
import { email } from '@/lib/config';

const Email = () => (
  <Side orientation="right">
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      className="after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:bg-[var(--light-slate)]">
      <a
        href={`mailto:${email}`}
        style={{
          margin: '20px auto',
          padding: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fz-xxs)',
          letterSpacing: '0.1em',
          writingMode: 'vertical-rl',
        }}
        className="hover:-translate-y-[3px] focus:-translate-y-[3px] transition-transform">
        {email}
      </a>
    </div>
  </Side>
);

export default Email;
