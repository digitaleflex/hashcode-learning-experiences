import crypto from "node:crypto";

export const ADMIN_COOKIE = "hashcode_admin_session";

function secret() {
  const value = process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("ADMIN_PASSWORD is missing");
  return value;
}

export function adminToken() {
  return crypto.createHmac("sha256", secret()).update("hashcode-sessions-admin-v1").digest("hex");
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;
  const expected = adminToken();
  if (token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function verifyAdminPassword(password: string) {
  const expected = secret();
  if (password.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}