import { pool } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { date, type, sugar, user_id } = await req.json();
    const data = await pool.query(
      `INSERT INTO blood_sugar ( date, type, sugar, user_id ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [date, type, sugar, user_id]
    );
    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "Error",
      error: error.message || "Internal server error",
    });
  }
}