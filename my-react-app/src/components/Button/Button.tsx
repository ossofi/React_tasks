import React from 'react';
import './Button.scss';
import type { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
