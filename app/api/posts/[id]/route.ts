import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const posts = await prisma.post.findMany({
      where: { markerId: id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: `Error fetching marker': ${error}` },
      { status: 500 }
    );
  }
}
