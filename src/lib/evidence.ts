/**
 * Confidence levels for every operational claim we hold.
 *
 * high        PM site visit, PM measurement, or an official government source,
 *             AND a named verifier.
 * medium      Supplier official information, or trade press.
 * low         Secondary web sources.
 * unverified  The default for anything AI-generated.
 *
 * A supplier's own website is MEDIUM at best, never high. If a camp's site
 * says it has 52 tents, that stays medium until someone from PM Travel has
 * been there and counted.
 *
 * Lives here rather than in the Evidence component so that data modules can
 * import it without pulling in React.
 */
export type Confidence = "high" | "medium" | "low" | "unverified";
