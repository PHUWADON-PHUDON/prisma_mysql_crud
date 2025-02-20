import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma:any = new PrismaClient();

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}) {
    try{
        const {id} = await params;

        const post:any = await prisma.post.findUnique({where:{id:parseInt(id)}});
    
        return(NextResponse.json(post));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}) {
    try{
        const {id} = await params;
        const {title,content,categoryid} = await req.json();

        const postupdate = await prisma.post.update({
            where:{id:parseInt(id)},
            data:{
                title,
                content,
                category_id:Number(categoryid)
            }
        });

        return(NextResponse.json(postupdate));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}) {
    try{
        const {id} = await params;

        const deletepost:any = await prisma.post.delete({
            where:{id:parseInt(id)}
        });

        return(NextResponse.json(deletepost));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}