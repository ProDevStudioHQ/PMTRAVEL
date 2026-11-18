"use client";

/**
 * Client Component: the short B2B quote form, pre-filled from ?product= when a
 * visitor arrives from an experience or tour page ("Request this for your
 * clients"). Rendered inside <Suspense> so the page stays static.
 */
import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { QUICK_QUOTE_FIELDS } from "@/components/forms/configs";

export function QuoteForm() {
  const params = useSearchParams();
  const product = params.get("product")?.slice(0, 120) ?? "";
  return <QuoteFormInner product={product} />;
}

export function QuoteFormInner({ product = "" }: { product?: string }) {
  return (
    <EnquiryForm
      kind="quote"
      fields={QUICK_QUOTE_FIELDS}
      defaults={product ? { product, notes: `Interested in: ${product}\n` } : {}}
      submitLabel="Send quote request"
      successTitle="Quote request received"
      successBody="Thank you. Our operations team will review your brief and send a costed proposal, within 24 hours for standard requests."
    />
  );
}
