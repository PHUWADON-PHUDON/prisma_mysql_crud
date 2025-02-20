import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma:any = new PrismaClient();

export async function GET(req:NextRequest) {
    try{
        const category:any = await prisma.category.findMany();

        return(NextResponse.json(category));

    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}

export async function POST(req:NextRequest) {
    try{
        const {category} = await req.json();

        const createcategory:any = await prisma.category.create({
            data:{
                name:category
            }
        });

        return(NextResponse.json(createcategory));
    }
    catch(err) {
        return(NextResponse.json(err,{status:500}));
    }
}