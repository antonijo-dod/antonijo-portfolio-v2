import Side from './Side';
import Icon from './icons/Icon';
import { socialMedia } from '@/lib/config';

const Social = () => (
  <Side orientation="left">
    <ul className="flex flex-col items-center m-0 p-0 list-none after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:bg-light-slate">
      {socialMedia.map(({ url, name }, i) => (
        <li key={i} className="last:mb-5">
          <a
            href={url}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2.5 hover:-translate-y-[3px] focus:-translate-y-[3px] [transition:var(--transition)]">
            <span className="block w-5 h-5">
              <Icon name={name} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  </Side>
);

export default Social;
