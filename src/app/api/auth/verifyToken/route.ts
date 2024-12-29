import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header missing or invalid');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'jwtsecret02');
    console.log('Token decoded successfully:', decoded);

    // Send user information back
    return NextResponse.json({ user: { username: (decoded as jwt.JwtPayload).username } }, { status: 200 });
  } catch (error) {
    console.error('Token verification failed:', (error as Error).message);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}