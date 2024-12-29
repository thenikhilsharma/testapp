import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/Users';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the user
    await User.create({ username, password: hashedPassword });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}