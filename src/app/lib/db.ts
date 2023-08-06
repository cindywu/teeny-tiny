import { drizzle } from 'drizzle-orm/neon-http'
import { neon, neonConfig } from '@neondatabase/serverless'
import { LinksTable } from './schema'
import { desc } from 'drizzle-orm'
const sql = neon(process.env.DATABASE_URL as string)
neonConfig.fetchConnectionCache = true
const db = drizzle(sql)

export async function helloWorld() {
  const start = new Date()
  const [dbResponse] = await sql`SELECT NOW();`
  const dbNow = dbResponse && dbResponse.now? dbResponse.now : ""
  const end = new Date()

  return {dbNow: dbNow, latency: Math.abs(end.getTime()-start.getTime())}
}

async function configureDatabase() {
  const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "links" (
    "id" serial PRIMARY KEY NOT NULL,
    "url" text NOT NULL,
    "short" varchar(50),
    "created_at" timestamp DEFAULT now()
  );`
  console.log("Db response for new table", dbResponse)
}

configureDatabase().catch(err=>console.log("db config err", err))

export async function addLink(url: string) {
  const newLink = {url: url}
  return await db.insert(LinksTable).values(newLink).returning()
}

export async function getLinks(limit?: number, offset?: number) {
  const lookupLimit = limit ? limit : 10
  const lookupOffset = offset ? offset : 0
  return await db.select().from(LinksTable).limit(lookupLimit).offset(lookupOffset)
}

export async function getMinLinks(limit?: number, offset?: number) {
  const lookupLimit = limit ? limit : 10
  const lookupOffset = offset ? offset : 0
  return await db.select({
    id: LinksTable.id,
    url: LinksTable.url,
    timestamp: LinksTable.createdAt,
  }).from(LinksTable).limit(lookupLimit).offset(lookupOffset).orderBy(desc(LinksTable.createdAt))
}