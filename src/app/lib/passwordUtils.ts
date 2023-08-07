import { pbkdf2Sync } from 'node:crypto'

const saltKey = process.env.SALT_KEY ? process.env.SALT_KEY : "salt"

const hashIterations= 10000

export function hashPassword(rawPasswordString: string) {
  const key = pbkdf2Sync(rawPasswordString, saltKey, hashIterations, 64, 'sha512')
  return key.toString("hex")
}

export function isMatchingPassword(enteredRawPassword: string, storedHash: any) {
  const hash = pbkdf2Sync(enteredRawPassword, saltKey, hashIterations, 64, 'sha512').toString("hex")
  return storedHash === hash
}

// function verifyPasswordWorking() {
//   const pw = "abc123"
//   const pwHash = hashPassword(pw)
//   const isValid = isMatchingPassword(pw, pwHash)
//   console.log({isValid})
// }

// verifyPasswordWorking()

