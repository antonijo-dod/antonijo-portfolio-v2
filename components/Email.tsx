import Side from './Side';
import { email } from '@/lib/config';

const Email = () => (
  <Side orientation="right">
    <div className="flex flex-col items-center relative after:content-[''] after:block after:w-px after:h-[90px] after:mx-auto after:bg-light-slate">
      <a
        href={`mailto:${email}`}
        className="my-5 mx-auto p-[10px] font-mono text-fz-xxs tracking-[0.1em] [writing-mode:vertical-rl] hover:-translate-y-[3px] focus:-translate-y-[3px] [transition:var(--transition)]">
        {email}
      </a>
    </div>
  </Side>
);

export default Email;
