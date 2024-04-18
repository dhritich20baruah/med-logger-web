import { pool } from "@/utils/dbConnect"
import { NextResponse } from "next/server"

export async function POST(req,res){
    if(req.method !== 'POST'){
        return res.status(405).end()
    }

    try{
        const { userID  } = await req.json()
        const data = await pool.query(`SELECT * FROM user_info WHERE id = $1`, [userID])
        return NextResponse.json({status: "OK", userInfo: data.rows[0]})
    }catch(error){
        console.error(error);
        return NextResponse.json({status: "Error", error: error.message || "Internal server error" });
    }
}