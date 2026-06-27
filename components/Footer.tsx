import Icon from './icons/Icon';
import { socialMedia } from '@/lib/config';

const Footer = () => (
  <footer
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70px',
      padding: '15px',
      textAlign: 'center',
    }}>
    {/* Social icons: mobile only */}
    <div className="block md:hidden w-full max-w-[270px] mx-auto mb-2.5 text-[var(--light-slate)]">
      <ul style={{ display: 'flex', justifyContent: 'space-between', padding: 0, margin: 0, listStyle: 'none' }}>
        {socialMedia.map(({ name, url }, i) => (
          <li key={i}>
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5">
              <span style={{ display: 'block', width: '20px', height: '20px' }}>
                <Icon name={name} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div
      style={{
        color: 'var(--light-slate)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fz-xxs)',
        lineHeight: 1,
      }}>
      <span>Designed &amp; Built by Antonijo Đođ</span>
    </div>
  </footer>
);

export default Footer;
