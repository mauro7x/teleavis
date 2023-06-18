export function extractOriginalUrlFromCookie(cookie: string): string | null {
  if (!cookie) return null;

  const matches = cookie.match(/(^|;)\s*originalUrl=([^;]+)/);
  if (matches) {
    return decodeURIComponent(matches[2]);
  }
  return null;
}
