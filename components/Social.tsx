import Side from './Side';
import Icon from './icons/Icon';
import { socialMedia } from '@/lib/config';

const Social = () => (
  <Side orientation="left">
    <ul
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}
      className="after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:bg-[var(--light-slate)]">
      {socialMedia.map(({ url, name }, i) => (
        <li key={i} className="last:mb-5">
          <a
            href={url}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2.5 hover:-translate-y-[3px] focus:-translate-y-[3px] transition-transform duration-[var(--transition)]">
            <span style={{ display: 'block', width: '20px', height: '20px' }}>
              <Icon name={name} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </Side>
);

export default Social;
