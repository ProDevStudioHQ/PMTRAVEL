"use client";

/**
 * Floating chat bubble above the WhatsApp button. Opens a small chat panel
 * whose message goes through the contact form engine: it reaches the CRM as a
 * lead and the B2B inbox (b2b@…) like any website enquiry, so nothing is lost
 * when nobody is online.
 */
import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Mail, X } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsappIcon } from "@/components/Icon";
import type { FieldConfig } from "@/components/forms/fields";

const CHAT_FIELDS: FieldConfig[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", wide: true },
  { name: "message", label: "Message", type: "textarea", required: true, rows: 3, wide: true },
];

export function ChatButton({ email, whatsappHref }: { email: string; whatsappHref: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat with our B2B team"
          className="fixed right-4 bottom-[9.5rem] z-50 flex max-h-[calc(100dvh-11rem)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-ivory text-ink shadow-overlay sm:right-6 sm:bottom-[10.5rem]"
        >
          <div className="flex items-start justify-between gap-3 bg-midnight px-5 py-4 text-sand">
            <div className="min-w-0">
              <p className="font-medium">Chat with our B2B team</p>
              <p className="notranslate truncate text-sm text-sand/75" translate="no">
                {email}
              </p>
            </div>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-9 shrink-0 place-items-center rounded-full border border-sand/30">
              <X aria-hidden="true" size={18} />
              <span className="sr-only">Close chat</span>
            </button>
          </div>
          <div className="overflow-y-auto px-5 py-4">
            <p className="mb-4 inline-block rounded-2xl rounded-tl-sm bg-sand px-4 py-3 text-sm">
              Hello! Send us your question and our B2B team will reply by email, usually within a few hours on working days.
            </p>
            <EnquiryForm
              kind="contact"
              idPrefix="chat"
              fields={CHAT_FIELDS}
              defaults={{ subject: "Website chat" }}
              submitLabel="Send message"
              successTitle="Message sent"
              successBody={`Our B2B team will reply to you by email from ${email}.`}
              compact
            />
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 underline underline-offset-4">
                <Mail aria-hidden="true" size={16} /> Email us
              </a>
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4">
                  <WhatsappIcon size={16} /> WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-[5.5rem] z-40 grid size-14 place-items-center rounded-full bg-terracotta text-white shadow-overlay transition-transform hover:scale-105 sm:right-6 sm:bottom-[6.5rem]"
      >
        {open ? <X aria-hidden="true" size={26} /> : <MessageCircle aria-hidden="true" size={26} />}
        <span className="sr-only">{open ? "Close chat" : "Chat with our B2B team"}</span>
      </button>
    </>
  );
}
