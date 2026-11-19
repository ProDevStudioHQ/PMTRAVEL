import Link from "next/link";
import { Lock } from "lucide-react";
import { cmsPageMetadata } from "@/lib/page-seo";
import { Container } from "@/components/Container";
import { SiteImage } from "@/components/SiteImage";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { partnerLogin } from "@/features/enquiry/actions";
import { LOGIN_HREF, PARTNER_HREF } from "@/lib/company";

export const generateMetadata = cmsPageMetadata({
  title: "Partner Login",
  description:
    "Partner login for PM Travel Agency trade partners: access your Morocco net rates, files and documents. New to PM Travel Agency? Request partner access online.",
  path: LOGIN_HREF,
  noindex: true,
});

export default function PartnerLoginPage() {
  return (
    <section className="grid min-h-[100svh] bg-sand lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <SiteImage imageKey="d6-dmc-riad-patio" fill priority sizes="50vw" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-midnight/30" />
      </div>
      <Container className="flex flex-col justify-center pt-32 pb-16 lg:max-w-xl lg:px-16">
        <span className="grid size-12 place-items-center rounded-full border border-gold text-terracotta">
          <Lock aria-hidden="true" size={20} strokeWidth={1.5} />
        </span>
        <p className="eyebrow mt-6">Partner area</p>
        <h1 className="t-h2 mt-3">Partner Login</h1>
        <p className="mt-3 text-muted">Access your net rates, files and documents.</p>
        <div className="mt-8">
          <EnquiryForm
            kind="contact"
            action={partnerLogin}
            idPrefix="login"
            fields={[
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "username", wide: true },
              { name: "password", label: "Password", type: "password", required: true, autoComplete: "current-password", wide: true },
            ]}
            submitLabel="Log in"
            successTitle=""
            successBody=""
            footnote={false}
          />
        </div>
        <p className="mt-8 text-sm text-muted">
          Not a partner yet?{" "}
          <Link href={PARTNER_HREF} className="font-medium text-terracotta-700 underline underline-offset-4">
            Request partner access
          </Link>
        </p>
      </Container>
    </section>
  );
}
