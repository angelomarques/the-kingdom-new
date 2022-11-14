import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  children: string;
}

const Button = ({
  variant = 'default',
  size = 'md',
  icon = null,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'w-full rounded-lg p-3 hover:opacity-90 transition-colors flex items-center justify-center gap-2',
        {
          'bg-gray-700': variant === 'default',
          'bg-success': variant === 'success',
          'bg-warning': variant === 'warning',
          'bg-info': variant === 'info',
          'border-2 border-gray-700': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {icon ? icon : null}
      <span
        className={clsx('text-gray-100 text-lg', {
          'text-sm': size === 'sm',
          'text-md': size === 'md',
          'text-lg': size === 'lg',
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
