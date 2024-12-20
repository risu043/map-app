import prisma from '../../lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get('page') || '1');
    const filter = req.nextUrl.searchParams.get('filter') || '';
    const category = req.nextUrl.searchParams.get('category') || '';

    const whereClause = {
      title: {
        contains: filter,
      },
      ...(category && { category: category }),
    };

    const hitCount = await prisma.marker.count({
      where: whereClause,
    });

    const markers = await prisma.marker.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { posts: true },
        },
      },
      take: 6,
      skip: (page - 1) * 6,
    });

    return NextResponse.json({
      markers,
      hitCount,
    });
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error fetching markers' },
      { status: 500 }
    );
  }
}
