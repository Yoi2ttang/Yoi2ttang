import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }

  return null
}

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
