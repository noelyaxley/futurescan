import { NextRequest, NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const scanTypes = new Set([
  "full-body",
  "brain",
  "cardiac",
  "spine",
  "joint",
  "abdominal",
]);
const teamSizes = new Set(["10-25", "26-100", "101-500", "500+"]);
const plans = new Set(["single-scan", "membership", "corporate"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(req: NextRequest) {
  if (process.env.FUTURESCAN_ENQUIRIES_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Online enquiries are not currently available" },
      { status: 503 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const firstName = text(body.firstName, 80);
  const lastName = text(body.lastName, 80);
  const email = text(body.email, 254).toLowerCase();
  const phone = text(body.phone, 40);
  const scanType = text(body.scanType, 40);
  const concern = text(body.concern, 2000);
  const company = text(body.company, 160);
  const teamSize = text(body.teamSize, 40);
  const preferredDate = text(body.preferredDate, 40);
  const heardAbout = text(body.heardAbout, 80);
  const plan = text(body.plan, 40);
  const consent = body.consent === true;

  if (!firstName || !emailPattern.test(email) || !consent) {
    return NextResponse.json(
      { error: "Name, a valid email and consent are required" },
      { status: 422 }
    );
  }

  if (plan && !plans.has(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 422 });
  }

  const isBusiness = plan === "corporate";
  if (isBusiness) {
    if (!company || !teamSizes.has(teamSize)) {
      return NextResponse.json(
        { error: "Company and team size are required" },
        { status: 422 }
      );
    }
  } else if (!scanTypes.has(scanType)) {
    return NextResponse.json({ error: "Scan type is required" }, { status: 422 });
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    console.error("HUBSPOT_ACCESS_TOKEN not configured");
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable" },
      { status: 503 }
    );
  }

  // Push contact to HubSpot CRM
  const hubspotPayload = {
    properties: {
      firstname: firstName,
      lastname: lastName || "",
      email,
      phone: phone || "",
      // Custom properties — create these in HubSpot first:
      // scan_type, health_concerns, preferred_timeframe, how_did_you_hear,
      // selected_plan, team_size, privacy_consent
      scan_type: scanType || "",
      health_concerns: concern || "",
      preferred_timeframe: preferredDate || "",
      how_did_you_hear: heardAbout || "",
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
      // Only sent when the visitor supplied them, so an account without these
      // properties keeps working for the plain consumer enquiry.
      ...(company ? { company } : {}),
      ...(plan ? { selected_plan: plan } : {}),
      ...(teamSize ? { team_size: teamSize } : {}),
      ...(consent ? { privacy_consent: "true" } : {}),
    },
  };

  const res = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(hubspotPayload),
    }
  );

  if (!res.ok) {
    // If contact exists, try update via email
    if (res.status === 409) {
      const updateRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(hubspotPayload),
        }
      );
      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error("HubSpot update failed:", errText);
        return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
      }
    } else {
      const errText = await res.text();
      console.error("HubSpot create failed:", errText);
      return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
