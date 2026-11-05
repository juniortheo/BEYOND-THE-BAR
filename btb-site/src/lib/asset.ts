/** Resolve a file in /public so it works for both root-hosted and relative builds. */
export const asset = (path: string) =>
  /^(data:|https?:|blob:)/.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
