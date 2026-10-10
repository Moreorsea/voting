import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

type UserRow = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  password_hash: string;
  created_at: Date | string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string; }>(event);
  const email = body?.email?.trim();
  const password = body?.password;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    });
  }

  const db = useDb();
  const [rows] = await db.query(
    'SELECT id, username, email, avatar, password_hash, created_at FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  const user = (rows as UserRow[])[0];

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    });
  }

  const { jwtSecret } = useRuntimeConfig();
  const secret = new TextEncoder().encode(jwtSecret);

  const token = await new SignJWT({
    sub: String(user.id),
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return {
    token,
    user: mapAuthUser(user),
  };
});
