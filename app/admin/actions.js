"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Ad from "@/models/Ad";
import Contact from "@/models/Contact";
import Game from "@/models/Game";
import GameResult from "@/models/GameResult";
import User from "@/models/User";

export async function saveContact(formData) {
  await requireAdmin();
  await connectDB();
  const id = formData.get("id");
  const data = {
    name: formData.get("name") || "",
    contactNumber: formData.get("contactNumber") || ""
  };
  if (id) await Contact.findByIdAndUpdate(id, data, { upsert: false });
  else await Contact.create(data);
  revalidatePath("/");
  redirect("/admin/dashboard?saved=1");
}

export async function saveAd(formData) {
  await requireAdmin();
  await connectDB();
  const id = formData.get("id");
  const data = {
    khaiwalName: formData.get("khaiwalName") || "",
    gpayNumber: formData.get("gpayNumber") || "",
    whatsappNumber: formData.get("whatsappNumber") || ""
  };
  if (id) await Ad.findByIdAndUpdate(id, data, { upsert: false });
  else await Ad.create(data);
  revalidatePath("/");
  redirect("/admin/ad?saved=1");
}

export async function saveGame(formData) {
  await requireAdmin();
  await connectDB();
  const id = formData.get("id");
  const data = {
    name: formData.get("name") || "",
    code: formData.get("code") || "",
    resultTime: formData.get("resultTime") || "00:00:00",
    showIndex: Number(formData.get("showIndex") || 0),
    isActive: true
  };
  if (id) await Game.findByIdAndUpdate(id, data);
  else await Game.create(data);
  revalidatePath("/");
  redirect("/admin/games?saved=1");
}

export async function deleteGame(formData) {
  await requireAdmin();
  await connectDB();
  const id = formData.get("id");
  if (id) await Game.findByIdAndUpdate(id, { isActive: false });
  revalidatePath("/");
  redirect("/admin/games?deleted=1");
}

export async function saveGameResult(formData) {
  await requireAdmin();
  await connectDB();
  const game = formData.get("game");
  const resultDate = formData.get("resultDate");
  const result = formData.get("result") || "";
  if (game && resultDate) {
    const gameDoc = await Game.findById(game).lean();
    await GameResult.findOneAndUpdate(
      { game, resultDate },
      { game, gameSqlId: gameDoc?.sqlId, resultDate, result },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  revalidatePath("/");
  redirect(`/admin/game/result?date=${resultDate || ""}&saved=1`);
}

export async function deleteGameResult(formData) {
  await requireAdmin();
  await connectDB();
  const id = formData.get("id");
  const date = formData.get("date");
  if (id) await GameResult.findByIdAndDelete(id);
  revalidatePath("/");
  redirect(`/admin/game/result?date=${date || ""}&deleted=1`);
}

export async function createAdminUser(formData) {
  await connectDB();
  const existing = await User.countDocuments();
  if (existing > 0) redirect("/admin/login");
  const password = await bcrypt.hash(formData.get("password") || "admin123", 10);
  await User.create({
    name: formData.get("name") || "Admin",
    email: formData.get("email") || "admin@example.com",
    password
  });
  redirect("/admin/login?created=1");
}
