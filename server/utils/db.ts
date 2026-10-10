import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function useDb() {
  if (!pool) {
    const { db } = useRuntimeConfig();

    pool = mysql.createPool({
      host: db.host,
      port: db.port,
      user: db.user,
      password: db.password,
      database: db.database,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return pool;
}

export type PostRow = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date | string;
  updated_at: Date | string;
  likes_count: number;
  dislikes_count: number;
};

export function mapPost(row: PostRow) {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    likes: row.likes_count,
    dislikes: row.dislikes_count,
  };
}
