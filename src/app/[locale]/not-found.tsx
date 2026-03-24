import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-heading font-bold text-amber">404</h1>
      <p className="text-xl text-cream/70 mt-4">
        Page not found / 페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-amber text-amber px-8 py-3 rounded uppercase tracking-wider font-semibold hover:bg-amber hover:text-bg-dark transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
