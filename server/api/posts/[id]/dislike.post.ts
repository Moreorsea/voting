export default defineEventHandler (async (event) => {
  const postId = Number(getRouterParam(event, 'id'));
  const userId = 1;

  if (!postId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid post id' });
  }
  const db = useDb();

  // была ли уже реакция этого пользователя
  const [existing] = await db.query(
    'SELECT id, type FROM reactions WHERE post_id = ? AND user_id = ? LIMIT 1',
    [postId, userId]
  );
  const reaction = (existing as { id: number; type: string; }[])[0];
  if (!reaction) {
    await db.query(
      'INSERT INTO reactions (post_id, user_id, type) VALUES (?, ?, ?)',
      [postId, userId, 'dislike']
    );
  } else if (reaction.type === 'dislike') {
    // повторный клик — снять дизлайк
    await db.query('DELETE FROM reactions WHERE id = ?', [reaction.id]);
  } else {
    // был like → заменить на dislike
    await db.query('UPDATE reactions SET type = ? WHERE id = ?', ['dislike', reaction.id]);
  }
  // пересчитать счётчики у поста
  await db.query(
    `UPDATE posts SET
       likes_count = (SELECT COUNT(*) FROM reactions WHERE post_id = ? AND type = 'like'),
       dislikes_count = (SELECT COUNT(*) FROM reactions WHERE post_id = ? AND type = 'dislike')
     WHERE id = ?`,
    [postId, postId, postId]
  );
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ? LIMIT 1', [postId]);
  return mapPost((rows as PostRow[])[0]);
});