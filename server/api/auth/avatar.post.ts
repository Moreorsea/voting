import { mkdir, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { randomUUID } from 'node:crypto';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default defineEventHandler(async (event) => {
  const authUser = await requireAuthUser(event);
  const form = await readMultipartFormData(event);
  const file = form?.find((part) => part.name === 'avatar');

  if (!file?.data?.length || !file.type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Avatar file is required',
    });
  }

  if (!ALLOWED_TYPES[file.type]) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only JPEG, PNG, WebP and GIF are allowed',
    });
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is too large (max 2MB)',
    });
  }

  const ext = ALLOWED_TYPES[file.type] || extname(file.filename || '') || '.jpg';
  const fileName = `${authUser.id}-${randomUUID()}${ext}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');

  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, fileName), file.data);

  const avatarUrl = `/uploads/avatars/${fileName}`;
  const db = useDb();

  await db.query('UPDATE users SET avatar = ? WHERE id = ?', [
    avatarUrl,
    authUser.id,
  ]);

  return {
    user: {
      ...authUser,
      avatar: avatarUrl,
    },
  };
});
