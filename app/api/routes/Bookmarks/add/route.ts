import { prisma } from "@/prismaclient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      url,
      title,
      description,
      tags,
      collectionId,
      userId,
      isFavorite,
    } = body;

    const bookmark = await prisma.bookmark.create({
      data: {
        url,
        title,
        description,
        userId,
        collectionId: collectionId || null,
        isFavorite: isFavorite ?? false,

        tags: {
          create: tags?.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}