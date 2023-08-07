import pbkdf2 from './pbkdf2'

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : "salt"
const hashIterations= 10000

export const runtime = 'edge'

export function hashPassword(rawPasswordString: string) {
  const key = pbkdf2(rawPasswordString, saltKey, hashIterations, 64)
  return key
}

export function isMatchingPassword(enteredRawPassword: string, storedHash: any) {
  const hash = pbkdf2(enteredRawPassword, saltKey, hashIterations, 64)
  return storedHash === hash
}

// function verifyPasswordWorking() {
//   const pw = "abc123"
//   const pwHash = hashPassword(pw)
//   const isValid = isMatchingPassword(pw, pwHash)
// }

// verifyPasswordWorking()

