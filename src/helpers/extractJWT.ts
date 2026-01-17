import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Verify JWT in Edge runtime using the Web Crypto based `jose` library.
// Returns the `id` from the token payload or `null` if verification fails.
export async function extractJWT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) return null;

    // jose uses Web Crypto under the hood and works in Edge runtime.
    const secret = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET || ""
    );
    const { payload } = await jwtVerify(token, secret);
    return (payload as any)?.id ?? null;
  } catch (e: any) {
    // On any error (invalid token, expired, missing secret) return null
    return null;
  }
}
