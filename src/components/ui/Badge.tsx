'use client';

interface BadgeProps {
  label: string;
  variant?: 'category' | 'outOfStock';
}

export default function Badge({ label, variant = 'category' }: BadgeProps) {
  const variants = {
    category:
      'bg-amber/20 text-amber text-xs px-2 py-0.5 rounded-full uppercase tracking-wide font-semibold',
    outOfStock:
      'bg-vintage-red/20 text-vintage-red text-xs px-2 py-0.5 rounded-full uppercase tracking-wide font-semibold',
  };

  return <span className={variants[variant]}>{label}</span>;
}
