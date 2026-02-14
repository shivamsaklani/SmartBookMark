import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prismaclient";
import { validateUser } from "@/app/api/routes/auth/middleware";

export async function GET(request: NextRequest) {
    const user = await validateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const collections = await prisma.collection.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(collections);
    } catch (error) {
        console.error("Error fetching collections:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const user = await validateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, icon, color } = body;

        const collection = await prisma.collection.create({
            data: {
                userId: user.id,
                name,
                icon,
                color,
            },
        });

        return NextResponse.json(collection);
    } catch (error) {
        console.error("Error creating collection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
