const COOKIE_NAME = "tsc_admin_session";

// Web Crypto (not Node's `crypto`) — this file is imported by middleware.ts,
// which runs on the Edge runtime and doesn't support Node's crypto module.
async function hmacSha256Hex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// One shared password for the two of you. The cookie value is an HMAC of the
// password + a secret only the server knows, so it can't be forged without
// knowing ADMIN_SESSION_SECRET — no session table needed for a two-person app.
export function expectedSessionToken(): Promise<string> {
  return hmacSha256Hex(process.env.ADMIN_PASSWORD!, process.env.ADMIN_SESSION_SECRET!);
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedSessionToken();
  return constantTimeEqual(token, expected);
}

export { COOKIE_NAME };
