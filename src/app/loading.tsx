import { Container } from "@/components/Container";

/**
 * Shown only while a client-side navigation waits on the server. Pages here
 * are prerendered and links prefetch, so it rarely appears. A status line
 * rather than a spinner: the motion budget has no room for one (SOP 2.4).
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="bg-paper">
      <Container className="py-24">
        <p className="text-base text-ink-500">Loading the page&hellip;</p>
      </Container>
    </div>
  );
}
