import mongoose from "mongoose"
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { dbConnect } from '@/db/index'; 
import User from '@/model/user.model'; 



export async function PUT(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const toggleParam = searchParams.get('toggle');
    

    const toggle = toggleParam === 'true' ? true : (toggleParam === 'false' ? false : null);

    if (toggle === null) {
      return NextResponse.json(
        { success: false, message: 'Invalid toggle value. Must be "true" or "false".' },
        { status: 400 }
      );
    }


    await User.findByIdAndUpdate(userId, { isAcceptingMessages: toggle });

    return NextResponse.json(
      { success: true, message: 'Toggle status updated successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in PUT route:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
