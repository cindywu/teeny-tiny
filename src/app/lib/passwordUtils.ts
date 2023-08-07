import pbkdf2 from './pbkdf2'

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : "salt"
const hashIterations= 10000

export const runtime = 'edge'

export async function hashPassword(rawPasswordString: string) {
  const key = await pbkdf2(rawPasswordString, saltKey, hashIterations, 64)
  return key
}

export async function isMatchingPassword(enteredRawPassword: string, storedHash: any) {
  const hash = await pbkdf2(enteredRawPassword, saltKey, hashIterations, 64)
  return storedHash === hash
}


