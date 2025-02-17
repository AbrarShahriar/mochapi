"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    id: number;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET_KEY); // Signing JWT requires a Uint8Array. So, we convert our string key to a Uint8Array

export async function createSession(payload: Session) {
  const expiredAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 day expiry

  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey);

  cookies().set("session", session, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    expires: expiredAt,
    path: "/",
  });
}

export async function getSession() {
  const cookie = cookies().get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload }: any = await jose.jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.error("Failed to verify session", error);
    redirect("/auth/signin");
  }
}

export async function deleteSession() {
  await cookies().delete("session");
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jose.jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Invalid Session.");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}
