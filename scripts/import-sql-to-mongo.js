const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

function tableInsertBlocks(sql, table) {
  const regex = new RegExp("INSERT INTO `" + table + "` \\(([^)]+)\\) VALUES\\s*([\\s\\S]*?);", "g");
  const blocks = [];
  let match;
  while ((match = regex.exec(sql))) {
    const columns = match[1].split(",").map((column) => column.replace(/[` ]/g, ""));
    blocks.push({ columns, values: match[2] });
  }
  return blocks;
}

function parseRows(values) {
  const rows = [];
  let row = [];
  let value = "";
  let inString = false;
  let escaping = false;
  let inRow = false;

  for (let i = 0; i < values.length; i++) {
    const char = values[i];
    if (!inRow) {
      if (char === "(") {
        inRow = true;
        row = [];
        value = "";
      }
      continue;
    }
    if (escaping) {
      value += char;
      escaping = false;
      continue;
    }
    if (char === "\\" && inString) {
      escaping = true;
      continue;
    }
    if (char === "'") {
      inString = !inString;
      continue;
    }
    if (!inString && char === ",") {
      row.push(cleanValue(value));
      value = "";
      continue;
    }
    if (!inString && char === ")") {
      row.push(cleanValue(value));
      rows.push(row);
      inRow = false;
      value = "";
      continue;
    }
    value += char;
  }
  return rows;
}

function cleanValue(value) {
  const trimmed = value.trim();
  if (trimmed.toUpperCase() === "NULL") return null;
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed.replace(/\\'/g, "'");
}

function rowsFor(sql, table) {
  return tableInsertBlocks(sql, table).flatMap((block) =>
    parseRows(block.values).map((values) => Object.fromEntries(block.columns.map((column, index) => [column, values[index]])))
  );
}

async function main() {
  loadEnv();
  const sqlPath = process.argv[2] || path.resolve(process.cwd(), "../murgan_kalkasatta.sql");
  if (!process.env.MONGODB_URI) throw new Error("Set MONGODB_URI in .env first.");
  const sql = fs.readFileSync(sqlPath, "utf8");

  await mongoose.connect(process.env.MONGODB_URI);

  const Game = mongoose.models.Game || mongoose.model("Game", new mongoose.Schema({
    sqlId: { type: Number, unique: true, sparse: true },
    name: String,
    code: String,
    resultTime: String,
    isActive: Boolean,
    showIndex: Number,
    mid: Number
  }, { timestamps: true }));
  const GameResult = mongoose.models.GameResult || mongoose.model("GameResult", new mongoose.Schema({
    sqlId: { type: Number, unique: true, sparse: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", index: true },
    gameSqlId: Number,
    resultDate: String,
    result: String
  }, { timestamps: true }).index({ game: 1, resultDate: 1 }, { unique: true }));
  const Ad = mongoose.models.Ad || mongoose.model("Ad", new mongoose.Schema({
    sqlId: { type: Number, unique: true, sparse: true },
    gpayNumber: String,
    whatsappNumber: String,
    khaiwalName: String,
    website: String
  }, { timestamps: true }));
  const Contact = mongoose.models.Contact || mongoose.model("Contact", new mongoose.Schema({
    sqlId: { type: Number, unique: true, sparse: true },
    name: String,
    contactNumber: String
  }, { timestamps: true }));
  const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
    sqlId: { type: Number, unique: true, sparse: true },
    name: String,
    email: { type: String, unique: true },
    password: String
  }, { timestamps: true }));

  const games = rowsFor(sql, "tbl_game");
  const gameMap = new Map();
  for (const row of games) {
    const doc = await Game.findOneAndUpdate(
      { sqlId: row.id },
      {
        sqlId: row.id,
        name: row.name,
        code: row.code,
        resultTime: row.result_time,
        isActive: row.isactive === 1,
        showIndex: row.showindex || 0,
        mid: row.mid || 0
      },
      { upsert: true, new: true }
    );
    gameMap.set(row.id, doc._id);
  }

  for (const row of rowsFor(sql, "tbl_game_result")) {
    const game = gameMap.get(row.gameid);
    if (!game) continue;
    await GameResult.findOneAndUpdate(
      { game, resultDate: row.result_date },
      { sqlId: row.id, game, gameSqlId: row.gameid, resultDate: row.result_date, result: row.result || "" },
      { upsert: true, new: true }
    );
  }

  for (const row of rowsFor(sql, "tbl_ad")) {
    await Ad.findOneAndUpdate(
      { sqlId: row.id },
      { sqlId: row.id, gpayNumber: row.gpaynumber || "", whatsappNumber: row.whatsappnumber || "", khaiwalName: row.khaiwalname || "", website: row.website || "" },
      { upsert: true }
    );
  }

  for (const row of rowsFor(sql, "tbl_contact")) {
    await Contact.findOneAndUpdate(
      { sqlId: row.id },
      { sqlId: row.id, name: row.name || "", contactNumber: row.contactnumber || "" },
      { upsert: true }
    );
  }

  for (const row of rowsFor(sql, "users")) {
    await User.findOneAndUpdate(
      { email: row.email },
      { sqlId: row.id, name: row.name || "Admin", email: row.email, password: String(row.password || "").replace(/^\$2y\$/, "$2b$") },
      { upsert: true }
    );
  }

  console.log(`Imported ${games.length} games and ${rowsFor(sql, "tbl_game_result").length} results.`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
