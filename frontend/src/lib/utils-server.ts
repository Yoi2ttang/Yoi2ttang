export const objectToSearchParams = (
  params?: Record<string, string | number | boolean>,
) => {
  if (!params) {
    return ""
  }

  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
}
