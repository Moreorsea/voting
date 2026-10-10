export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' });
  }

  const body = await readBody<{ title?: string; content?: string; }>(event);
  const title = body?.title?.trim();
  const content = body?.content?.trim();

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and content are required',
    });
  }

  const db = useDb();

  const [existing] = await db.query(
    'SELECT id FROM posts WHERE id = ? LIMIT 1',
    [id]
  );

  if (!(existing as { id: number; }[])[0]) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
  }

  await db.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
  );

  const [rows] = await db.query(
    'SELECT * FROM posts WHERE id = ? LIMIT 1',
    [id]
  );

  return mapPost((rows as PostRow[])[0]);
});
