import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL as string)

export async function helloWorld() {
  const [dbResponse] = await sql`SELECT NOW();`
  return dbResponse
}