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

type MarkerUpdate = Omit<
  Database['public']['Tables']['markers']['Update'],
  'id'
>;

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;
    const data: MarkerUpdate = await req.json();

    const updatedMarker = await prisma.marker.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedMarker);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id;

    await prisma.marker.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
