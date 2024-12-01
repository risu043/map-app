import prisma from '../../lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const filter = searchParams.get('filter') || '';
    const category = searchParams.get('category') || '';
    const page = searchParams.get('page')
      ? Number(searchParams.get('page'))
      : 1;

    const markers = await prisma.marker.findMany({
      where: {
        title: {
          contains: filter,
        },
        ...(category && { category: category }),
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
      take: 3,
      skip: (page - 1) * 3,
    });
    return NextResponse.json(markers);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error fetching markers' },
      { status: 500 }
    );
  }
}
