import { NextResponse } from "next/server";

type ContactBody = Record<string, unknown>;

function isRecord(value: unknown): value is ContactBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(body: ContactBody, key: string, maxLength: number): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, maxLength).trim() : "";
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  if (!isRecord(input)) {
    return errorResponse("Invalid request body", 400);
  }

  if (typeof input.website === "string" && input.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = readText(input, "name", 100);
  const email = readText(input, "email", 254);
  const phone = readText(input, "phone", 30);
  const service = readText(input, "service", 50);
  const message = readText(input, "message", 1000);

  if (!name || !email || !phone) {
    return errorResponse("Name, email, and phone are required", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorResponse("Please enter a valid email address", 400);
  }

  const sheetUrl = process.env.SHEET_URL?.trim();
  const secret = process.env.SHEET_SECRET?.trim();
  if (!sheetUrl || !secret) {
    return errorResponse("Server not configured", 500);
  }

  let scriptResponse: Response;
  let reply: string;
  try {
    scriptResponse = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, email, phone, service, message }),
      redirect: "follow",
    });
    reply = await scriptResponse.text();
  } catch (error) {
    console.error("Google Apps Script contact request failed.", error);
    return errorResponse("Could not save your message", 502);
  }

  if (!scriptResponse.ok || reply.trim() !== "ok") {
    console.error("Google Apps Script contact submission failed.", {
      status: scriptResponse.status,
      reply: reply.slice(0, 200),
    });
    return errorResponse("Could not save your message", 502);
  }

  return NextResponse.json({ ok: true });
}
