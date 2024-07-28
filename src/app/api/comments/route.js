
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// get all comments of a post
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const postSlug = searchParams.get("postSlug");

    try {
        const comments = await prisma.comment.findMany({
        where: { 
            ...(postSlug && {postSlug }),
        },

        include: { user: true },
        });

        return new NextResponse(JSON.stringify(comments, { status: 200 }));
    } catch (err) {
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};

// create a comment
export const POST = async (req) => {
    const session = await auth();

    if (!session) {
        return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
        )
    }

    try {
        const body = await req.json();
        const comment = await prisma.comment.create({
            data: {
                ...body,
                userEmail: session.user.email,
            },

            include: { user: true },
        });

        return new NextResponse(JSON.stringify(comment, { status: 200 }));
    } catch (err) {
        console.log(err)
        return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
        );
    }
};
