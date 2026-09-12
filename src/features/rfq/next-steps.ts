/**
 * What happens to a requirement once it arrives. Shown beside the form and in
 * its confirmation, from one list so the two can never describe different
 * processes. There is deliberately no "by when": a response time we have not
 * measured would be a promise (AGENT-PROMPTS hard stop 10, decisions.md D6).
 */
export const RFQ_NEXT_STEPS = [
  "We qualify the brief and come back on anything unclear.",
  "We match it against suppliers and venues we have verified.",
  "We cost it, with every line marked requested, on option, held or confirmed.",
] as const;
