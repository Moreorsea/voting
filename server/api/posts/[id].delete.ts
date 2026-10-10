export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' });
  }

  const db = useDb();

  const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
  const affectedRows = (result as { affectedRows: number; }).affectedRows;

  if (!affectedRows) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
  }

  return { success: true, id };
});
