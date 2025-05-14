# ───── 빌드 스테이지 ─────
FROM node:22-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_MAP_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_REDIRECT_URI
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_MAP_CLIENT_ID=$NEXT_PUBLIC_MAP_CLIENT_ID
ENV NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID
ENV NEXT_PUBLIC_KAKAO_REDIRECT_URI=$NEXT_PUBLIC_KAKAO_REDIRECT_URI
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# pnpm 설치 (corepack 사용)
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# package.json과 lock 파일 복사 후 종속성 설치
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 프로젝트 파일 복사 및 Next.js 빌드 실행
COPY . .
RUN pnpm build

# ───── 런타임 스테이지 ─────
FROM node:22-alpine AS runner
WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# 포트 노출
ENV PORT=3000
EXPOSE 3000

# Next.js standalone 실행
CMD ["node", "./server.js"]
