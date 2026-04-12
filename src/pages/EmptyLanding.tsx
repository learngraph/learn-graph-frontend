import { Link } from "react-router-dom";

export default function EmptyLanding() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        LearnGraph
      </h1>
      <p className="text-sm text-white/60 max-w-md">
        Deployment shell. Prior marketing page is available below.
      </p>
      <Link
        to="/learn"
        className="text-sm font-medium text-lime-400 hover:text-lime-300 underline underline-offset-4"
      >
        Marketing home
      </Link>
    </main>
  );
}
