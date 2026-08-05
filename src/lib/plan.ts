/* Plans offered on the pricing section, carried through to the intake form so a
   visitor never has to restate a choice they already made. Consumer plans land
   on the scan-type picker; business plans take a separate path. */

export const plans = {
  "single-scan": { label: "Single Scan", audience: "consumer" },
  membership: { label: "Annual Membership", audience: "consumer" },
  corporate: { label: "Corporate Wellness", audience: "business" },
} as const;

export type PlanId = keyof typeof plans;

export const PLAN_EVENT = "futurescan:plan";

export function isPlanId(value: string | null): value is PlanId {
  return value !== null && value in plans;
}

/** Records the choice in the URL (so the link is shareable) and tells the
    intake form about it without a page reload. */
export function selectPlan(plan: PlanId) {
  const url = new URL(window.location.href);
  url.searchParams.set("plan", plan);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new CustomEvent<PlanId>(PLAN_EVENT, { detail: plan }));
}

/** Reads ?plan= on mount so a shared or reloaded link arrives pre-selected. */
export function planFromLocation(): PlanId | null {
  const plan = new URLSearchParams(window.location.search).get("plan");
  return isPlanId(plan) ? plan : null;
}

/** Clears the choice from the URL when the visitor changes their mind. */
export function clearPlanFromLocation() {
  const url = new URL(window.location.href);
  url.searchParams.delete("plan");
  window.history.replaceState(null, "", url);
}
