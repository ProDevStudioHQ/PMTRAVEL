import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { WhatsappIcon } from "@/components/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { ZelligeStar, highlight } from "@/components/moroccan";
import { RFQ_HREF, whatsappLink } from "@/lib/company";
import { en } from "@/i18n/dictionaries/en";

type Props = {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  whatsappMessage?: string;
};

/**
 * Closing band before the footer: indigo, zellige pattern, large serif title,
 * quote + WhatsApp. The root layout renders a default one on every page; a
 * page that renders its own (class .cta-band) hides the default via CSS.
 */
export function CtaBand({
  title = "Let's build your next Morocco programme.",
  body = "Send your brief and receive a costed proposal at net rates — or message our operations desk now.",
  primaryLabel = en.cta.b2bQuote,
  primaryHref = RFQ_HREF,
  whatsappMessage,
}: Props) {
  return (
    <section className="cta-band on-dark surface-deep zellige-bg relative overflow-hidden bg-indigo text-sand">
      <ZelligeStar spin className="pointer-events-none absolute -top-24 -right-24 size-[26rem] text-gold/25 sm:size-[32rem]" />
      <Container className="section-y relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow eyebrow-on-dark">Work with us</p>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] font-medium text-sand">{highlight(title)}</h2>
          <p className="mt-6 max-w-2xl text-lg text-sand/80">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primaryHref} tone="dark" arrow>
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={whatsappLink(whatsappMessage)} variant="whatsapp" tone="dark" icon={<WhatsappIcon size={18} />}>
              {en.cta.whatsappOps}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
