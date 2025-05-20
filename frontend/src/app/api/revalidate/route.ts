import { revalidateTag } from "next/cache"

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const tag = searchParams.get("tag")

  if (!tag) {
    return new Response("태그가 존재하지 않습니다.", { status: 400 })
  }

  // 캐시 무효화 실행
  revalidateTag(tag)

  return new Response(`태그 무효화 완료: ${tag}`, { status: 200 })
}
