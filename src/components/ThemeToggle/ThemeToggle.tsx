import { useTheme } from '../../Context/Themecontext';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import imgDay from '../../assets/dayIcon.svg';
import imgNight from '../../assets/nightIcon.svg';

const ToggleThemeButton: React.FC = () => {
  const [icon, setIcon] = useState(imgDay);
  const theme = useTheme();
  const toggleTheme = useTheme().toggleTheme;

  useEffect(() => {
    if (theme.theme === 'light') setIcon(imgDay);
    if (theme.theme === 'dark') setIcon(imgNight);
  }, [theme]);

  return (
    <Button className="theme-toggle secondary" onClick={() => toggleTheme()}>
      {' '}
      <img
        src={icon}
        alt="theme"
        style={{
          height: '25px',
          width: '25px',
        }}
      />
    </Button>
  );
};
export default ToggleThemeButton;
