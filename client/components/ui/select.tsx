import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, className = '', ...props }) => {
  const baseStyles = 'p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hot-pink';
  const themeStyles = 'bg-gray-50 border-gray-300 text-gray-900 dark:bg-brand-dark/50 dark:border-white/20 dark:text-white';
  const finalClassName = `${baseStyles} ${themeStyles} ${className}`;

  return (
    <select className={finalClassName} {...props}>
      {children}
    </select>
  );
};

export default Select;