import IconFacebook from './IconFacebook';
import IconExternal from './IconExternal';
import IconFolder from './IconFolder';
import IconFork from './IconFork';
import IconGitHub from './IconGitHub';
import IconInstagram from './IconInstagram';
import IconLinkedin from './IconLinkedin';
import IconLogo from './IconLogo';
import IconStar from './IconStar';
import IconTwitter from './IconTwitter';

interface IconProps {
  name: string;
}

const Icon = ({ name }: IconProps) => {
  switch (name) {
    case 'Facebook':
      return <IconFacebook />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Instagram':
      return <IconInstagram />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Logo':
      return <IconLogo />;
    case 'Star':
      return <IconStar />;
    case 'Twitter':
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

export default Icon;
