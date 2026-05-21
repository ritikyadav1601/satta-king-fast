#!/usr/bin/env node

const fs = require("fs");
const mongoose = require("mongoose");

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  loadEnv();

  const args = parseArgs(process.argv.slice(2));
  const { syncA7Results, printA7SyncReport } = await import("../lib/a7Sync.mjs");
  const report = await syncA7Results(args);

  printA7SyncReport(report, args.dryRun);
  await mongoose.disconnect();
}

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match) process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

function parseArgs(args) {
  const parsed = { dryRun: false, resultDate: "", smart: false, windowMinutes: 20, now: "" };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") parsed.dryRun = true;
    if (args[i] === "--smart") parsed.smart = true;
    if (args[i] === "--date") parsed.resultDate = args[i + 1] || "";
    if (args[i] === "--window-minutes") parsed.windowMinutes = Number(args[i + 1] || 20);
    if (args[i] === "--now") parsed.now = args[i + 1] || "";
  }
  if (parsed.resultDate && !/^\d{4}-\d{2}-\d{2}$/.test(parsed.resultDate)) {
    throw new Error("--date must use YYYY-MM-DD format.");
  }
  if (!Number.isInteger(parsed.windowMinutes) || parsed.windowMinutes < 1 || parsed.windowMinutes > 120) {
    throw new Error("--window-minutes must be a number from 1 to 120.");
  }
  if (parsed.now && !/^\d{1,2}:\d{2}$/.test(parsed.now)) {
    throw new Error("--now must use HH:mm format.");
  }
  return parsed;
}
