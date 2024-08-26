import mongoose from "mongoose"
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/db/index'; 
import User from '@/model/user.model'; 

export async function GET() {
  await dbConnect();

  try {

    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json(
        { success: false, message: 'User is not authenticated.' },
        { status: 401 }
      );
    }


    const userId = new mongoose.Types.ObjectId(session.user._id);

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }


    return NextResponse.json(
      { success: true, isAcceptingMessages: user.isAcceptingMessages },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
