export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id || Number.isNaN(Number(id))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' });
  }

  const db = useDb();
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ? LIMIT 1', [id]);
  const post = (rows as PostRow[])[0];

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
  }

  return mapPost(post);
});
