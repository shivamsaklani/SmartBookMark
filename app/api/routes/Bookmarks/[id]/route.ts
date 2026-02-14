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
        const { url, title, description, isFavorite, collectionId, tags } = body;

        // Check ownership
        const existing = await prisma.bookmark.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== user.id) {
            return NextResponse.json({ error: "Not found or Unauthorized" }, { status: 404 });
        }

        // Update tags if provided
        let tagUpdate = {};
        if (tags && Array.isArray(tags)) {
            // Delete existing BookmarkTag relations for this bookmark
            await prisma.bookmarkTag.deleteMany({
                where: { bookmarkId: id }
            });

            // Create new ones
            tagUpdate = {
                tags: {
                    create: tags.map((tagName: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tagName },
                                create: { name: tagName }
                            }
                        }
                    }))
                }
            }
        }

        const updatedBookmark = await prisma.bookmark.update({
            where: { id },
            data: {
                url,
                title,
                description,
                isFavorite,
                collectionId,
                ...tagUpdate
            },
            include: {
                tags: { include: { tag: true } }
            }
        });

        const formattedBookmark = {
            ...updatedBookmark,
            tags: updatedBookmark.tags.map(bt => bt.tag.name),
            createdAt: updatedBookmark.createdAt.toISOString()
        }

        return NextResponse.json(formattedBookmark);
    } catch (error) {
        console.error("Error updating bookmark:", error);
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
        const existing = await prisma.bookmark.findUnique({
            where: { id },
        });

        if (!existing || existing.userId !== user.id) {
            return NextResponse.json({ error: "Not found or Unauthorized" }, { status: 404 });
        }

        await prisma.bookmark.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
