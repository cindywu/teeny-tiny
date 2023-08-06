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
  
  // LOWER is dangerous bc while this works for text between TLD
  // it causes problems for string after TLD
  // works for github.com/cindy vs GIThub.com/cindy
  // but will not always work for https://imgur.com/a/aKPHvY3 v https://imgur.com/a/akphvy3
  //
  // await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_index" ON "links" ((LOWER("url")));`
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "url_index" ON "links" ("url");`
  
  await sql`CREATE TABLE IF NOT EXISTS "visits" (
    "id" serial PRIMARY KEY NOT NULL,
    "link_id" integer NOT NULL,
    "created_at" timestamp DEFAULT now()
  );`

  await sql`
  DO $$ BEGIN
    ALTER TABLE "visits" ADD CONSTRAINT "visits_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE no action ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN null;
  END $$;`

  console.log("Db response for new table", dbResponse)
}

configureDatabase().catch(err=>console.log("db config err", err))

export async function addLink(url: string): Promise<{data: any, status: number}> {
  const short = randomShortStrings()
  const newLink = {url: url, short: short}
  let response : any = [{message: `${url} is not valid. Please try again.`}]
  let responseStatus = 400
  try {
    response = await db.insert(LinksTable).values(newLink).returning()
    responseStatus = 201
  } catch ({name, message}: any) {
    console.log({name, message})
    if (`${message}.includes("duplicate key value violates unique constraint "url_index")`) {
      response = [{message: `${url} has already been added.`}]
    }
  }
  return {data: response, status: responseStatus}
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