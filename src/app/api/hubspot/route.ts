import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    console.error("HUBSPOT_ACCESS_TOKEN not configured");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    scanType,
    concern,
    preferredDate,
    heardAbout,
  } = body;

  if (!email || !firstName) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  // Push contact to HubSpot CRM
  const hubspotPayload = {
    properties: {
      firstname: firstName,
      lastname: lastName || "",
      email,
      phone: phone || "",
      // Custom properties — create these in HubSpot first
      scan_type: scanType || "",
      health_concerns: concern || "",
      preferred_timeframe: preferredDate || "",
      how_did_you_hear: heardAbout || "",
      lifecyclestage: "lead",
      hs_lead_status: "NEW",
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
