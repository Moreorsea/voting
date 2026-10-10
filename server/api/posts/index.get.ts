export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const sort = query.sort === 'rating' ? 'rating' : 'date';
  const order = query.order === 'asc' ? 'ASC' : 'DESC';
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit)) || 10);
  const offset = (page - 1) * limit;
  // UNSIGNED: likes - dislikes может быть < 0 → CAST в SIGNED
  const orderBy =
    sort === 'rating'
      ? `(CAST(likes_count AS SIGNED) - CAST(dislikes_count AS SIGNED)) ${order}`
      : `created_at ${order}`;


  console.log('SORT', sort);
  console.log(JSON.stringify(query, null, 2));
  const db = useDb();
  const [rows] = await db.query(
    `SELECT * FROM posts ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  const [countRows] = await db.query(
    'SELECT COUNT(*) AS total FROM posts'
  );
  const total = Number((countRows as { total: number; }[])[0].total);
  return {
    posts: (rows as PostRow[]).map(mapPost),
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
});
