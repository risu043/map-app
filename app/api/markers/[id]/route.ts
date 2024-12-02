import prisma from '../../../lib/db';
import { Database } from '../../../types/supabase';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const marker = await prisma.marker.findUnique({
      where: { id: id },
    });
    return NextResponse.json(marker);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: `Error fetching marker': ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const data: Database['public']['Tables']['markers']['Update'] =
      await req.json();

    const updatedMarker = await prisma.marker.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedMarker);
  } catch (error) {
    console.error('Error updating Marker:', error);
    return NextResponse.json(
      { error: 'Failed to update Marker' },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = parseInt(params.id, 10);

//     await prisma.marker.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: 'Marker deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting Marker:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete Marker' },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const marker = await prisma.marker.findUnique({ where: { id } });
    if (!marker) {
      return NextResponse.json({ error: 'Marker not found' }, { status: 404 });
    }

    await prisma.marker.delete({ where: { id } });
    return NextResponse.json({ message: 'Marker deleted successfully' });
  } catch (error) {
    console.error('Error deleting Marker:', error);
    return NextResponse.json(
      { error: 'Failed to delete Marker' },
      { status: 500 }
    );
  }
}
