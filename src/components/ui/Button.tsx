'use client';

import { Link } from '@/i18n/navigation';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  disabled,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-block uppercase tracking-wider font-semibold px-8 py-3 transition-all duration-200 cursor-pointer';

  const variants = {
    primary:
      'bg-amber text-bg-dark hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-transparent border-2 border-amber text-amber hover:bg-amber hover:text-bg-dark disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
