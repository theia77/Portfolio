import { Link } from "react-router-dom";
import { Helmet } from "../components/layout/Helmet.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Line } from "../components/ui/Line.jsx";
import { RevealText } from "../components/ui/RevealText.jsx";

export default function NotFound() {
  return (
    <>
      <Helmet title="Not found" description="Page not found." />

      <Container className="flex min-h-[80vh] flex-col justify-center py-24">
        <RevealText as="p" className="font-mono text-xs uppercase tracking-widest2 text-accent font-tabular">
          404
        </RevealText>

        <RevealText delay={0.06} as="h1" className="mt-4 font-display text-5xl text-ink sm:text-6xl">
          Page not found
        </RevealText>

        <RevealText delay={0.12} className="mt-4 max-w-sm text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </RevealText>

        <RevealText delay={0.18} className="mt-10 max-w-xs">
          <Line animate={false} className="mb-6 opacity-30" />
          <Link
            to="/"
            className="text-xs uppercase tracking-widest2 text-ink transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>
        </RevealText>
      </Container>
    </>
  );
}
