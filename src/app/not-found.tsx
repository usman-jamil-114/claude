import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-32 text-center">
      <p className="font-display text-8xl font-black text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground">
        Go home
      </Link>
    </section>
  );
}
