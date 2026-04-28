export function resolveExternalCasterHandleUrl(handle: string): string | null {
  if (handle.startsWith("http")) return handle;
  if (/^(www\.)?twitch\.tv\//.test(handle)) return `https://${handle}`;
  if (/^(www\.)?twitter\.com\//.test(handle)) return `https://${handle}`;
  if (/^(www\.)?x\.com\//.test(handle)) return `https://${handle}`;
  return null;
}
