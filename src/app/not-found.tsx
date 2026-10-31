import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-flectere-light flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-flectere-navy flex items-center justify-center text-flectere-gold font-bold text-2xl mb-4 shadow-md">
        404
      </div>
      <h1 className="text-2xl font-bold text-flectere-navy mb-2">Page Not Found</h1>
      <p className="text-sm text-flectere-slate mb-6 max-w-sm">
        The requested resource or operations screen could not be located on the Prestige ONE platform.
      </p>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 rounded-lg bg-flectere-navy text-white text-sm font-semibold hover:bg-flectere-navyLight transition-colors shadow-sm"
      >
        Return to Command Centre
      </Link>
    </div>
  );
}
