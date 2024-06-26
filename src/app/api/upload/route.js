import {join} from 'path'
import { writeFile } from "fs/promises";
import {NextResponse} from 'next/server'

export async function POST(req,res){
    const data = await req.formData()
    const file = data.get('file')

    if(!file){
        return NextResponse.json({ success: false})
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('/', 'webpage/reactnative/med-logger-web/public', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ success: true })
}

