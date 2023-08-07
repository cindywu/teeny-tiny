/* 
Next.js/Edge function method for hasing passwords 
Using the Web API Crypto feature instead of
Built-in Node.js Crypto
*/

// copied from: https://gist.github.com/codingforentrepreneurs/6ee26d3b37956bdfb026089cb3c7f06e

export default async function pbkdf2(password: any, salt: any, iterations: any, keylen: any) {
  const enc = new TextEncoder();
  const passwordBuffer = enc.encode(password);
  const saltBuffer = enc.encode(salt);

  const importedKey = await crypto.subtle.importKey(
    'raw', 
    passwordBuffer, 
    {name: 'PBKDF2'}, 
    false, 
    ['deriveBits', 'deriveKey']
  );

  const derivedKeyBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: iterations,
      hash: 'SHA-256'
    }, 
    importedKey, 
    keylen * 8 // keylen in bits
  );

  const derivedKeyArray = new Uint8Array(derivedKeyBuffer);

  // Convert to HEX
  let hex = '';
  for(let i = 0; i < derivedKeyArray.length; i++) {
    hex += derivedKeyArray[i].toString(16).padStart(2, '0');
  }

  return hex;
}