'use client';

export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
      style={{ backgroundImage: 'url(/images/brand/grain.svg)' }}
    />
  );
}
