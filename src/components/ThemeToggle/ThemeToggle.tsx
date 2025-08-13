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
  const theme = useTheme();
  const toggleTheme = theme.toggleTheme;
  const icon = mapThemeToImage[theme.theme] || imgDay;

  return (
    <Button className="theme-toggle secondary" onClick={() => toggleTheme()}>
      <img
        src={icon}
        alt={theme.theme}
        style={{
          height: '25px',
          width: '25px',
        }}
      />
    </Button>
  );
};
export default ToggleThemeButton;
