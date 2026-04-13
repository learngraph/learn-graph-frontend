import { Link } from "react-router-dom";

export default function EmptyLanding() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        LearnGraph
      </h1>
      <p className="text-sm text-foreground/60 max-w-md">
        Deployment shell. Prior marketing page is available below.
      </p>
      <Link
        to="/learn"
        className="text-sm font-medium text-accent hover:text-accent/80 underline underline-offset-4"
      >
        Marketing home
      </Link>
      <Link
        to="/service"
        className="text-sm font-medium text-accent hover:text-accent/80 underline underline-offset-4"
      >
        Service offering
      </Link>
    </main>
  );
}
