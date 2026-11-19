import { WhatsappIcon } from "@/components/Icon";
import { buttonClasses } from "@/components/Button";
import { getSite } from "@/lib/cms";
import { waHref } from "@/lib/site-layout";

/**
 * Shown where CRM content should be but the CRM cannot be reached and Next has
 * nothing cached yet. Never an error page: the visitor gets a way to reach us.
 */
export async function Unavailable({ what = "These programmes", onDark = false }: { what?: string; onDark?: boolean }) {
  const { settings } = await getSite();
  return (
    <div role="status" className={`rounded-card border p-8 ${onDark ? "border-sand/20 bg-midnight-2 text-sand" : "border-line bg-ivory"}`}>
      <h2 className="t-h3">{what} are temporarily unavailable</h2>
      <p className={`mt-3 max-w-2xl ${onDark ? "text-sand/80" : "text-muted"}`}>
        Please try again in a few minutes, or message our operations desk and we will send you the details straight away.
      </p>
      <a
        href={waHref(settings.phones.whatsapp, "Hello PM Travel Agency, I would like details of your Morocco programmes.")}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses("primary", onDark ? "dark" : "light", "mt-6")}
      >
        <WhatsappIcon size={18} />
        <span>Ask us on WhatsApp</span>
      </a>
    </div>
  );
}
