import { prisma } from "@/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, url, isFavorite, collectionId } =
      await req.json();
    const updatedBookmark = await prisma.bookmark.update({
      where: { id },
      data: {
        title,
        description,
        url,
        isFavorite,
        collectionId,
      },
    });

    return NextResponse.json(updatedBookmark);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bookmark" },
      { status: 500 }
    );
  }
}