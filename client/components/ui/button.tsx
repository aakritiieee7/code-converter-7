import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  href?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = {
      primary: 'bg-gray-900 text-white hover:bg-gray-700 dark:bg-gradient-to-r dark:from-deep-purple dark:to-hot-pink dark:text-white dark:hover:shadow-lg dark:hover:shadow-hot-pink/30 dark:hover:scale-105',
      
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-transparent',
      
      outline: 'border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-white/20 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white',
      
      ghost: 'text-gray-600 hover:bg-gray-900/5 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white',
    };

    const sizeStyles = {
      sm: 'h-9 rounded-md px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 rounded-md px-8 text-base',
      icon: 'h-10 w-10',
    };

    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={finalClassName}>
          {children}
        </Link>

      );
    }

    return (
      <button className={finalClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;