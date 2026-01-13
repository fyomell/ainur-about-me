import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";
  res.setHeader("Set-Cookie", `rofik_admin=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; ${secure}`);
  return res.status(200).json({ ok: true });
}
