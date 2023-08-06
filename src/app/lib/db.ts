import { drizzle } from 'drizzle-orm/neon-http'
import { neon, neonConfig } from '@neondatabase/serverless'
import { LinksTable } from './schema'
import { desc, eq } from 'drizzle-orm'
const sql = neon(process.env.DATABASE_URL as string)
neonConfig.fetchConnectionCache = true
const db = drizzle(sql)
import randomShortStrings from './randomShortStrings'

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
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_index" ON "links" ("url");`
  // LOWER is dangerous bc while this works for text between TLD
  // it causes problems for string after TLD
  // works for github.com/cindy vs GIThub.com/cindy
  // but will not always work for https://imgur.com/a/aKPHvY3 v https://imgur.com/a/akphvy3
  //
  // await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_index" ON "links" ((LOWER("url")));`
  console.log("Db response for new table", dbResponse)
}

configureDatabase().catch(err=>console.log("db config err", err))

export async function addLink(url: string) {
  const short = randomShortStrings()
  const newLink = {url: url, short: short}
  return await db.insert(LinksTable).values(newLink).returning()
}

export async function getLinks(limit?: number, offset?: number) {
  const lookupLimit = limit ? limit : 10
  const lookupOffset = offset ? offset : 0
  return await db.select().from(LinksTable).limit(lookupLimit).offset(lookupOffset)
}

export async function getShortLinkRecord(shortSlugValue: string) {
  return await db.select().from(LinksTable).where(eq(LinksTable.short, shortSlugValue))
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