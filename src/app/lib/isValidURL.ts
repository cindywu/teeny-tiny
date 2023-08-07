// copied from gist: https://gist.github.com/codingforentrepreneurs/13e153d28e8c15b7b97331f7813fae9b

// Usage:
// const isValid = await isValidURL("http://mytest-domain.com", ["mytest-domain.com"])
// // false

// const isValid = await isValidURL("http://mytest.com", ["mytest-domain.com"])
// // true

// const isValid = await isValidURL("http://localhost:3000")
// // false
export default async function isValidURL(url: string, disallowedDomains: string[]) {
  // Construct a regular expression pattern to match disallowed domains
  const disallowedPattern = `^https?:\\/\\/(?:${disallowedDomains.join('|')})\\b`;
  let disallowedRegex = new RegExp(disallowedPattern, 'i');

  // Regular expression pattern to match a URL (excluding localhost)
  const urlPattern = /^(https?:\/\/)?((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
  let urlRegex = new RegExp(urlPattern);

  // Test the URL against both URL pattern and disallowed domain pattern
  return urlRegex.test(url) && !disallowedRegex.test(url);
}