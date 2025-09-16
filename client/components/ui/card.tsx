import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardContentProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardContentProps> = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardContentProps> = ({ className = '', children, ...props }) => {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardFooter: React.FC<CardContentProps> = ({ className = '', children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};