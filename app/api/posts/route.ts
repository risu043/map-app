import prisma from '../../lib/db';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        markerId: data.markerId,
        userId: data.userId,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Error creating post', details: (error as Error).message },
      { status: 500 }
    );
  }
}
