import Image from 'next/image';
import { useTheme } from '../../Context/Themecontext';
import Button from '../Button/Button';
import imgDay from '../../assets/dayIcon.svg';
import imgNight from '../../assets/nightIcon.svg';
import { LIGHT, DARK } from '../../const';

const mapThemeToImage = {
  [LIGHT]: imgDay,
  [DARK]: imgNight,
};

const ToggleThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const icon = mapThemeToImage[theme] || imgDay;

  return (
    <Button className="theme-toggle secondary" onClick={() => toggleTheme()}>
      <Image
        src={icon}
        alt={theme}
        width={25}
        height={25}
        style={{
          height: '25px',
          width: '25px',
        }}
      />
    </Button>
  );
};
export default ToggleThemeButton;
