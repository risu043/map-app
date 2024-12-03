import prisma from '../../lib/db';
import { type NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const page = Number(searchParams.get('page') || '1');
//     const filter = searchParams.get('filter') || '';
//     const category = searchParams.get('category') || '';

//     const whereClause = {
//       title: {
//         contains: filter,
//       },
//       ...(category && { category: category }),
//     };

//     const hitCount = await prisma.marker.count({
//       where: whereClause,
//     });

//     const markers = await prisma.marker.findMany({
//       where: whereClause,
//       include: {
//         _count: {
//           select: { posts: true },
//         },
//       },
//       take: 3,
//       skip: (page - 1) * 3,
//     });

//     return NextResponse.json({
//       markers,
//       hitCount,
//     });
//   } catch (error) {
//     console.error('Request error', error);
//     return NextResponse.json(
//       { error: 'Error fetching markers' },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { page, filter, category } = await req.json();

    const whereClause = {
      title: {
        contains: filter || '',
      },
      ...(category && { category }),
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
      take: 3,
      skip: (page - 1) * 3,
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
