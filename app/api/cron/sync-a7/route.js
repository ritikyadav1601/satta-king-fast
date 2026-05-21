import { NextResponse } from "next/server";
import { syncA7Results } from "@/lib/a7Sync.mjs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request) {
  if (process.env.CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const report = await syncA7Results({
    smart: true,
    windowMinutes: 20
  });

  return NextResponse.json({ ok: true, report });
}
