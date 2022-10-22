import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
  children: string;
}

const Button = ({ variant = 'default', children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx('w-full rounded-lg py-4 px-3 hover:opacity-90 transition-colors', {
        'bg-gray-700': variant === 'default',
        'bg-success': variant === 'success',
        'bg-warning': variant === 'warning',
        'bg-info': variant === 'info',
      })}
      {...props}
    >
      <span className="text-gray-100 text-lg">{children}</span>
    </button>
  );
};

export default Button;
