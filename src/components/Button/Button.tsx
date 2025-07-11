import React from "react";
import "./Button.css";

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
  style,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="regularButton"
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
