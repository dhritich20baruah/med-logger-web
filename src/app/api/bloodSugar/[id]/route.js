import { pool } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const user_id = req.url.split("bloodSugar/")[1];

  const data = await pool.query(
    `SELECT date, type, sugar FROM blood_sugar WHERE user_id = $1`,
    [user_id]
  );
  return NextResponse.json({ readings: data.rows });
}