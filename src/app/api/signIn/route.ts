import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Users from '@/model/Users';

// Mock user data
// const users = [
//   {
//     id: 1,
//     username: 'testuser',
//     password: '$2b$10$EIX/8Y5O8Q5z5Y5O8Q5z5u5O8Q5z5Y5O8Q5z5Y5O8Q5z5Y5O8Q5z5Y' // hashed password for 'password123'
//   }
// ];

export async function POST(req: Request) {
  const { username, password } = await req.json();
  await dbConnect();

  // Find user by username
  const user = await Users.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: 'Invalid username or password' }, {status: 400});
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid username or password' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user.id, username: user.username }, 'jwtsecret02' , { expiresIn: '1h' });

  return NextResponse.json({ token }, {status: 200});
};