import { useTheme, useUpdateTheme } from '../../Context/Themecontext';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import imgDay from '../../assets/dayIcon.svg';
import imgNight from '../../assets/nightIcon.svg';

const ToggleThemeButton: React.FC = () => {
  const [icon, setIcon] = useState(imgDay);
  const theme: string = useTheme();
  const toggleTheme = useUpdateTheme();

  useEffect(() => {
    if (theme === 'light') setIcon(imgDay);
    if (theme === 'dark') setIcon(imgNight);
  }, [theme]);

  return (
    <Button
      onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        position: 'absolute',
        top: '50px',
        right: '10px',
      }}
    >
      {' '}
      <img
        src={icon}
        alt="theme"
        style={{
          height: '25px',
          width: '25px',
        }}
      />{' '}
    </Button>
  );
};
export default ToggleThemeButton;
