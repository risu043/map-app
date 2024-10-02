import prisma from '../../lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { Database } from '../../types/supabase';

export async function GET() {
  try {
    const markers = await prisma.marker.findMany();
    return NextResponse.json(markers);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error fetching markers' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: Database['public']['Tables']['markers']['Insert'] =
      await req.json();
    const newMarker = await prisma.marker.create({
      data,
    });
    return NextResponse.json(newMarker, { status: 201 });
  } catch (error) {
    console.error('Error creating marker:', error);
    return NextResponse.json(
      { error: 'Error creating marker', details: (error as Error).message },
      { status: 500 }
    );
  }
}
