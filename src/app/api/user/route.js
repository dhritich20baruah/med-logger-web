import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function POST(req,res){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const { name, age, weight, height  } = await req.json()
        const data = await pool.query(`INSERT INTO user_info (name, age, weight, height) VALUES ($1, $2, $3, $4) RETURNING *`, [name, age, weight, height])
        console.log(data.rows[0].id)
        return NextResponse.json({data: data.rows[0].id})
    }catch(error){
        console.error(error);
        return NextResponse.json({ error: error.message || "Internal server error" });
    }
}