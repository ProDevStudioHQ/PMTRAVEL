import { afterEach, describe, expect, it, vi } from "vitest";
import { mapCrmFieldErrors, parseUtmCookie, sendLeadToCrm, toLeadInput } from "@/features/enquiry/crm";

const ctx = { pageUrl: "https://pm-travelagency.com/tours/group-tours/x", visitorIp: "203.0.113.7", captchaToken: "tok", reference: "PMQ-2611-ABCD" };

describe("toLeadInput", () => {
  it("maps the quote form to B2B_QUOTE", () => {
    const lead = toLeadInput(
      "quote",
      { agency: "Voyages", contactName: "Anna", email: "anna@v.fr", businessType: "Tour operator", pax: 12, dateFrom: "2027-05-02", dateTo: "2027-05-10", notes: "Riads please", programmeSlug: "imperial-cities", product: "Imperial Cities" },
      { ...ctx, utm: { source: "newsletter" } }
    )!;
    expect(lead).toMatchObject({
      formType: "B2B_QUOTE",
      name: "Anna",
      company: "Voyages",
      email: "anna@v.fr",
      clientType: "TOUR_OPERATOR",
      groupSize: 12,
      travelDates: "2027-05-02 to 2027-05-10",
      programmeSlug: "imperial-cities",
      consent: true,
      captchaToken: "tok",
      visitorIp: "203.0.113.7",
      utm: { source: "newsletter" },
    });
    expect(lead.message).toContain("Riads please");
    expect(lead.message).toContain("Requested product: Imperial Cities");
    expect(lead.message).toContain("PMQ-2611-ABCD");
  });

  it("keeps unmapped business types in the message and caps the message at 3000 chars", () => {
    const lead = toLeadInput("partner", { company: "X", contactName: "Bo", email: "b@x.com", businessType: "Group organiser", message: "m".repeat(5000) }, ctx)!;
    expect(lead.formType).toBe("PARTNER_REQUEST");
    expect(lead.clientType).toBeUndefined();
    expect(lead.message!.length).toBeLessThanOrEqual(3000);
  });

  it("maps contact phone to whatsapp and does not send the newsletter", () => {
    expect(toLeadInput("contact", { name: "Cy", email: "c@x.com", phone: "+33 6", message: "Hello there" }, ctx)).toMatchObject({ formType: "CONTACT", whatsapp: "+33 6" });
    expect(toLeadInput("newsletter", { email: "n@x.com" }, ctx)).toBeNull();
  });
});

describe("mapCrmFieldErrors (422)", () => {
  it("puts CRM field errors on the form's own fields", () => {
    expect(mapCrmFieldErrors("quote", { name: "Too short", email: "Invalid email", groupSize: "Too big", company: "Required" })).toEqual({
      contactName: "Too short",
      email: "Invalid email",
      pax: "Too big",
      agency: "Required",
    });
    expect(mapCrmFieldErrors("contact", { whatsapp: "Bad", message: "Too long" })).toEqual({ phone: "Bad", message: "Too long" });
  });

  it("turns captcha and consent errors into friendly ones, and unknown fields into a form error", () => {
    expect(mapCrmFieldErrors("pdf", { captchaToken: "x", consent: "Consent is required", pageUrl: "Invalid url" })).toEqual({
      captcha: "The security check failed. Please try again.",
      consent: "Please accept the privacy policy.",
      form: "Invalid url",
    });
  });
});

describe("sendLeadToCrm", () => {
  afterEach(() => vi.unstubAllGlobals());
  const input = toLeadInput("contact", { name: "Cy", email: "c@x.com", message: "Hello there" }, ctx)!;
  const answer = (status: number, body: unknown) => vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status })));

  it("reads 201, 422, 429 and failures", async () => {
    process.env.CRM_API_URL = "https://crm.test/api/public/v1";
    process.env.CRM_LEADS_KEY = "leads-key";
    answer(201, { id: "lead_1", message: "Received" });
    expect(await sendLeadToCrm(input)).toEqual({ status: "created", id: "lead_1" });
    answer(422, { error: { code: "VALIDATION_ERROR", message: "Please check the form", fields: { email: "Invalid email" } } });
    expect(await sendLeadToCrm(input)).toEqual({ status: "invalid", message: "Please check the form", fields: { email: "Invalid email" } });
    answer(429, { error: { code: "RATE_LIMITED" } });
    expect(await sendLeadToCrm(input)).toEqual({ status: "rate_limited" });
    answer(500, {});
    expect((await sendLeadToCrm(input)).status).toBe("failed");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
    expect(await sendLeadToCrm(input)).toEqual({ status: "failed", reason: "ECONNREFUSED" });
  });

  it("sends the leads key from the server", async () => {
    const f = vi.fn().mockResolvedValue(new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", f);
    await sendLeadToCrm(input);
    expect(f.mock.calls[0]![0]).toBe("https://crm.test/api/public/v1/leads");
    expect(f.mock.calls[0]![1].headers["x-api-key"]).toBe("leads-key");
  });
});

describe("parseUtmCookie", () => {
  it("reads the proxy's cookie and ignores junk", () => {
    expect(parseUtmCookie('{"source":"li","medium":"social"}')).toEqual({ source: "li", medium: "social", campaign: undefined });
    expect(parseUtmCookie("not json")).toBeUndefined();
    expect(parseUtmCookie("{}")).toBeUndefined();
    expect(parseUtmCookie(undefined)).toBeUndefined();
  });
});
