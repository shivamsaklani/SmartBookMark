import { prisma } from "@/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const deletedBookmark = await prisma.bookmark.delete({
      where: { id },
    });

    return NextResponse.json(deletedBookmark);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bookmark" },
      { status: 500 }
    );
  }
}