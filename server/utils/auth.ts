import { jwtVerify } from 'jose';
import type { H3Event } from 'h3';

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  createdAt?: Date | string;
};

type UserRow = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  created_at?: Date | string;
};

export function mapAuthUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    avatar: row.avatar,
    createdAt: row.created_at,
  };
}

export async function requireAuthUser(event: H3Event) {
  const authHeader = getHeader(event, 'authorization');
  const token = authHeader?.replace(/^Bearer\s+/i, '').trim();

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { jwtSecret } = useRuntimeConfig();
  const secret = new TextEncoder().encode(jwtSecret);

  let payload: { sub?: string; };

  try {
    const verified = await jwtVerify(token, secret);
    payload = verified.payload as { sub?: string; };
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }

  const userId = Number(payload.sub);

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }

  const db = useDb();
  const [rows] = await db.query(
    'SELECT id, username, email, avatar, created_at FROM users WHERE id = ? LIMIT 1',
    [userId]
  );
  const user = (rows as UserRow[])[0];

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'User not found' });
  }

  return mapAuthUser(user);
}
