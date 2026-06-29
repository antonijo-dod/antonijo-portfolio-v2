import Icon from "./icons/Icon";
import { socialMedia } from "@/lib/config";

const Footer = () => (
  <footer className="flex flex-col items-center justify-center min-h-[70px] p-[15px] text-center">
    <div className="block md:hidden w-full max-w-[270px] mx-auto mb-2.5 text-light-slate">
      <ul className="flex justify-between p-0 m-0 list-none">
        {socialMedia.map(({ name, url }, i) => (
          <li key={i}>
            <a
              href={url}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2.5"
            >
              <span className="block w-5 h-5">
                <Icon name={name} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="text-light-slate font-mono text-fz-xxs leading-none">
      <span>Designed &amp; Built by Antonijo Dod</span>
    </div>
  </footer>
);

export default Footer;
