import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function POST(req,res){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const { name, age, weight, height  } = await req.json()
        const data = await pool.query(`INSERT INTO user_info (name, age, weight, height) VALUES ($1, $2, $3, $4) RETURNING *`, [name, age, weight, height])
        return NextResponse.json({status: "OK", data: data.rows[0].id})
    }catch(error){
        console.error(error);
        return NextResponse.json({status: "Error", error: error.message || "Internal server error" });
    }
}