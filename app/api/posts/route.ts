import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma:any = new PrismaClient();

export async function GET(req:NextRequest) {
    try{
        const searchparams:any = req.nextUrl.searchParams;
        const search:string = searchparams.get("search") || "";
        const category:string = searchparams.get("category") || "";
        const sort:string = searchparams.get("sort") || "desc";

        const whereCondition = () => {
            if (category) {
                return({
                    title:{
                        contains:search
                    },
                    category_id:Number(category)
                });
            }
            else {
                return({
                    title:{
                        contains:search
                    },
                });
            }
        }

        const allcontent:any = await prisma.post.findMany({
            where:whereCondition(),
            orderBy:{
                createAt:sort
            } as any,
            include:{
                category:true
            }
        });

        return(NextResponse.json(allcontent));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}

export async function POST(req:Request) {
    try{
        const { title, content, category_id } = await req.json();

        const newpost:any = await prisma.post.create({
            data:{
                title,
                content,
                category_id:Number(category_id)
            }
        });

        return(NextResponse.json(newpost));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    } 
}