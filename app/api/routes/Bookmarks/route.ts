import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prismaclient";
import { validateUser } from "@/app/api/routes/auth/middleware";

export async function GET(request: NextRequest) {
    const user = await validateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: user.id },
            include: {
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Transform response to match frontend type
        const formattedBookmarks = bookmarks.map((b) => ({
            ...b,
            tags: b.tags.map((bt) => bt.tag.name),
            createdAt: b.createdAt.toISOString(),
        }));

        return NextResponse.json(formattedBookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
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
        const { url, title, description, isFavorite, collectionId, tags } = body;

        // Handle Tags: Array of strings ["tag1", "tag2"]
        // We need to FindOrCreate Tag, then create BookmarkTag

        // Create the bookmark first
        const bookmark = await prisma.bookmark.create({
            data: {
                userId: user.id,
                url,
                title,
                description,
                isFavorite: isFavorite || false,
                collectionId: collectionId || null,
                // Using nested writes for tags
                tags: {
                    create: tags && Array.isArray(tags) ? tags.map((tagName: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tagName },
                                create: { name: tagName }
                            }
                        }
                    })) : []
                }
            },
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        // Transform
        const formattedBookmark = {
            ...bookmark,
            tags: bookmark.tags.map(bt => bt.tag.name),
            createdAt: bookmark.createdAt.toISOString()
        }

        return NextResponse.json(formattedBookmark);
    } catch (error) {
        console.error("Error creating bookmark:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
