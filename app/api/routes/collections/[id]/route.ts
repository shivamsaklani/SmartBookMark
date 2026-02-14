import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prismaclient";
import { validateUser } from "@/app/api/routes/auth/middleware";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // Updated type
) {
    const user = await validateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params; // Await params

    try {
        const body = await request.json();
        const { name, icon, color } = body;

        const existing = await prisma.collection.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== user.id) {
            return NextResponse.json({ error: "Not found or Unauthorized" }, { status: 404 });
        }

        const updatedCollection = await prisma.collection.update({
            where: { id },
            data: {
                name,
                icon,
                color,
            },
            include: {
                profiles: true // Optional Check
            }
        });

        return NextResponse.json(updatedCollection);
    } catch (error) {
        console.error("Error updating collection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // Updated type
) {
    const user = await validateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await context.params; // Await params

    try {
        const existing = await prisma.collection.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== user.id) {
            return NextResponse.json({ error: "Not found or Unauthorized" }, { status: 404 });
        }

        await prisma.collection.delete({
            where: { id },
        });

        // Also, update bookmarks that were in this collection to have collectionId = null (handled by OnDelete SetNull in schema)
        // No manual action needed if schema handles it.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting collection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
