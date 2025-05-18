export interface Testimonial {
  name: string
  profile: string
  content: string
  highlight: string
}

export const testimonials: Testimonial[] = [
  {
    name: "김지영 님",
    profile: "/profile.png",
    content:
      "요이땅에서 친구들과 함께 걷기 챌린지를 하면서 건강도 챙기고 포인트도 모으니 일석이조입니다!",
    highlight: "매일매일 다른 재미있어요",
  },
  {
    name: "박민수 님",
    profile: "/profile2.png",
    content:
      "포인트로 다양한 혜택을 받을 수 있어서 동기부여가 됩니다. 추천해요!",
    highlight: "포인트 혜택이 최고",
  },
  {
    name: "이서연 님",
    profile: "/profile3.png",
    content:
      "챌린지 덕분에 운동 습관이 생겼어요. 매일 기록하는 재미도 쏠쏠합니다.",
    highlight: "운동 습관 형성",
  },
]
