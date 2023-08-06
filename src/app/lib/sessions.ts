import * as jose from 'jose'

const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY as string)
const issuer = 'urn:teeny-tiny:issuer'
const audience = 'urn:teeny-tiny:audience'
const expiresAt = '10s'

export const encodeUserSession = async (userId: any) => {
  const jwt = await new jose.EncryptJWT({ 'user': userId })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresAt)
    .encrypt(secret)
  return jwt
}


export const decodeUserSession = async (jwt: any) => {
  try {
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer: issuer,
      audience: audience,
    })
    const {user} = payload
    return user
  } catch (error) {

  }
  return null
}

// async function verifySession () {
//   const userId = "1"
//   const jwtToken = await encodeUserSession(userId)
//   const user = await decodeUserSession(`${jwtToken}`)
//   console.log(user, userId === user)
// }

// verifySession().then(x=>console.log("verify")).catch(err=>console.log(err))