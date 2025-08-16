import React from 'react';
import './Button.css';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  className,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
