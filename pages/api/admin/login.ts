import type { NextApiRequest, NextApiResponse } from "next";

function cookie(name: string, value: string, maxAgeSec: number) {
  const secure = process.env.NODE_ENV === "production" ? "Secure; " : "";
  return `${name}=${value}; Path=/; Max-Age=${maxAgeSec}; HttpOnly; SameSite=Lax; ${secure}`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return res.status(500).json({ ok: false, error: "ADMIN_PASSWORD_NOT_SET" });

  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const { password } = req.body || {};
  if (password !== pw) return res.status(401).json({ ok: false });

  res.setHeader("Set-Cookie", cookie("rofik_admin", "1", 60 * 60 * 24 * 30));
  return res.status(200).json({ ok: true });
}
