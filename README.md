<div align="center">
    <img width="100%;" src='/docs/images/thumbnail.png' alt="썸네일" />
</div>

<br><br>

## ✨ 목차

- [1️⃣ 서비스 소개](#✨-서비스-소개)
- [2️⃣ 팀원 및 역할 분담](#✨-팀원-및-역할-분담)
- [3️⃣ 시스템 아키텍처](#✨-시스템-아키텍처)
- [4️⃣ 기술 스택](#✨-기술-스택)
- [5️⃣ 주요 기능](#✨-주요-기능)
- [6️⃣ 참고 문서](#✨-참고-문서)
- [7️⃣ 프로젝트 회고](#✨-프로젝트-회고)

<br><br>

## ✨ 서비스 소개

### 지도 위를 달리며 땅을 차지하고, 12간지 팀과 함께 랭킹 경쟁을 펼치는 러닝+게임 융합 앱 서비스

- 🕜 **진행 기간** : 2025.04.14. ~ 2025.05.22. (6주)
- 👨‍👩‍👧‍👦 **진행 인원** : 6명 (FE: 3, BE: 2, INFRA: 1)

<div align="center">
    <img width="100%;" src='/docs/images/main_functions.gif' alt='주요 기능'/>
</div>

### ✅ 주요 기능 summary

<table style="width: 100%;">
    <tr>
        <td align="center"><b>기능</b></td>
        <td align="center"><b>설명</b></td>
    </tr>
    <tr>
        <td>1️⃣ 소셜 로그인</td>
        <td>서비스 이용을 위한 JWT 기반 인증 기능</td>
    </tr>
        <tr>
        <td>2️⃣ 개인/팀별 통계 대시보드</td>
        <td>최근 1주일 간의 통계계 정보 제공 기능</td>
    </tr>
        <tr>
        <td>3️⃣ 지도 기반 점령 현황 시각화</td>
        <td>지도 위에 팀별 점령 타일 현황 정보 제공 기능</td>
    </tr>
        <tr>
        <td>4️⃣ 점령 러닝</td>
        <td>내가 밟은 타일을 기반으로 러닝 정보를 갱신하고, 타일 점령 정보 반영 기능</td>
    </tr>
        <tr>
        <td>5️⃣ 나만의 코스 만들기</td>
        <td>지도 위에 포인트를 추가하여 나만의 코스 제작 기능</td>
    </tr>
        <tr>
        <td>6️⃣ 코스 검색 및 상세 조회</td>
        <td>내가 달렸던 코스, 찜한 코스, 다른 러너들이 만든 코스 검색 및 상세 조회 기능</td>
    </tr>
        <tr>
        <td>7️⃣ 러너 검색 및 상세 조회</td>
        <td>다른 러너를 검색하거나 프로필을 조회하며 러닝 정보를 확인하고 팔로잉 할 수 있는 SNS 기능</td>
    </tr>
</table>

<br><br>

## ✨ 팀원 및 역할 분담

<table style="width: 100%;">
    <tr>
        <td align="center"><b>👑 이주현</b></td>
        <td align="center"><b>🟡 김수현</b></td>
        <td align="center"><b>🟡 박창조</b></td>
        <td align="center"><b>🟡 윤서희</b></td>
        <td align="center"><b>🟡 이남재</b></td>
        <td align="center"><b>🟡 전종우</b></td>
    </tr>
    <tr>
        <td>
            <a href="https://github.com/column-wise">
                <img src="https://github.com/column-wise.png" />
            </a>
        </td>
        <td>
            <a href="https://github.com/KSH00610">
                <img src="https://github.com/KSH00610.png" />
            </a>
        </td>
        <td>
            <a href="https://github.com/pcjo1202">
                <img src="https://github.com/pcjo1202.png" />
            </a>
        </td>
        <td>
            <a href="https://github.com/Seoheeda">
                <img src="https://github.com/Seoheeda.png" />
            </a>
        </td>
        <td>
            <a href="https://github.com/dlskawo0409">
                <img src="https://github.com/dlskawo0409.png" />
            </a>
        </td>
        <td>
            <a href="https://github.com/jinlaove17">
                <img src="https://github.com/jinlaove17.png" />
            </a>
        </td>
    </tr>
    <tr>
        <td align="center">인프라</td>
        <td align="center">백엔드</td>
        <td align="center">프론트엔드</td>
        <td align="center">프론트엔드</td>
        <td align="center">백엔드</td>
        <td align="center">프론트엔드</td>
    </tr>
</table>

<table style="width: 100%;"> 
    <tr>
        <td style="width: 30%;" align="center"><b>이름</b></td>
        <td style="width: 70%;" align="center"><b>역할</b></td>
    </tr>
    <tr>
        <td align="center">이주현<td>
            <li>인프라 설정 및 무중단 배포 자동화</li>
            <li>서버-프론트 간 통합 환경 설정</li>
        </td>
    </tr>
    <tr>
        <td align="center">김수현</td>
        <td>
            <li>Spring Boot 기반 JWT 인증 플로우 정교화</li>
            <li>백엔드 테스트 코드 작성</li>
            <li>멤버, 코스 CRUD</li>
        </td>
    </tr>
    <tr>
        <td align="center">박창조</td>
        <td>
            <li>개인/팀 런닝 통계 대시보드 페이지 구현</li>
            <li>나만의 코스 만들기 기능 구현</li>
            <li>주요 공통 컴포넌트 구현</li>
            <li>SSR 렌더링을 위한 공통 fetcher 함수 구현</li>
        </td>
    </tr>
    <tr>
        <td align="center">윤서희</td>
        <td>
            <li>러닝 페이지 및 땅 점령 기능 구현</li>
            <li>React Native를 활용한 native 페이지 구현 및 웹뷰 연결</li>
        </td>
    </tr>
    <tr>
        <td align="center">이남재</td>
        <td>
            <li>벡엔드 테스트 코드 작성</li>
            <li>런닝 시작, 종료 API 제작</li>
            <li>개인, 팀 별 타일 확인 API 제작</li>
            <li>팀 랭킹, 팀 내 개인 랭킹 API 제작</li>
        </td>
    </tr>
    <tr>
        <td align="center">전종우</td>
        <td>
            <li>네이티브 앱 페이지, 클라이언트 컴포넌트, 서버 컴포넌트별 JWT 토큰 관리 및 라우터 가드 구현</li>
            <li>OAuth 기반 로그인 및 회원가입 페이지 구현</li>
            <li>코스 검색, 조회 페이지 구현</li>
            <li>유저 프로필 검색, 조회, 편집 페이지 구현</li>
        </td>
    </tr>
</table>

<br><br>

## ✨ 시스템 아키텍처

<div style="width: 100%; "><img src='/docs/images/system_architecture.png' alt='시스템 아키텍처'/></div>

<br><br>

## ✨ 기술 스택

### **Frontend**

![TypeScript](<https://img.shields.io/badge/typescript(5.7.3)-3178C6?style=for-the-badge&logo=typescript&logoColor=white>)
![Next.js](<https://img.shields.io/badge/Next.js(15)-000000?style=for-the-badge&logo=Next.js&logoColor=white>)
![ReactNative](<https://img.shields.io/badge/React Native-61DAFB?logo=react&logoColor=white&style=for-the-badge>)
![tailwindcss](<https://img.shields.io/badge/tailwindcss(4.0.0)-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white>)
![Tanstack query](<https://img.shields.io/badge/Tanstack_query(5.64.2)-FF4154?style=for-the-badge&logo=reactquery&logoColor=white>)
![zustand](<https://img.shields.io/badge/zustand(5.0.3)-AF001E?style=for-the-badge&logo=zustand&logoColor=white>)
![axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![chartjs](https://img.shields.io/badge/chartjs-FF6384?style=for-the-badge&logo=chartjs&logoColor=white)
![lodash](https://img.shields.io/badge/lodash-3492DB?style=for-the-badge&logo=lodash&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-339933?style=for-the-badge&logo=pnpm&logoColor=white)

### **Backend**

![java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![springboot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![spring_JPA](https://img.shields.io/badge/spring_JPA-6DB33F?style=for-the-badge&logo=spring_JPA&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=Redis&logoColor=white)
![gradle](https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

### **CI/CD**

![nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![amazonec2](https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

### **Collaboration**

![gitlab](https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Mattermost](https://img.shields.io/badge/mattermost-4B5562?style=for-the-badge&logo=mattermost&logoColor=white)
![figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<br><br>

## ✨ 주요 기능

<details>
<summary>
    <strong style="font-size: 1.25em;">
        1️⃣ 소셜 로그인
    </strong>
</summary>

> 서비스 이용을 위한 JWT 기반 인증 기능

- OAuth 2.0 기반의 카카오 소셜 로그인 기능 구현

<div>
    <img src='/docs/images/signup.gif' alt='소셜 로그인' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        2️⃣ 개인/팀별 통계 대시보드
    </strong>
</summary>

> 최근 1주일 간의 러닝 정보 제공 기능

<div>
    <img src='/docs/images/dashboard_my.gif' alt='개인 대시보드' />
    <img src='/docs/images/dashboard_team.gif' alt='팀 대시보드' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        3️⃣ 지도 기반 점령 현황 시각화
    </strong>
</summary>

>

- GeoHash 기반의 타일 클러스터링
- 디바운싱을 적용한 타일 조회 최적화

<div>
    <img src='/docs/images/dashboard_statistic.gif' alt='통계 대시보드' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        4️⃣ 점령 러닝
    </strong>
</summary>

> 내가 밟은 타일을 기반으로 러닝 정보를 갱신하고, 타일 점령 정보 반영 기능

- 디바운싱을 적용한 타일 조회 최적화

<div>
    <img src='/docs/images/running.gif' alt='러닝' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        5️⃣ 나만의 코스 만들기
    </strong>
</summary>

> 지도 위에 포인트를 추가하여 나만의 코스 제작 기능

<div>
    <img src='/docs/images/course-write.gif' alt='코스 작성' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        6️⃣ 코스 검색 및 상세 조회
    </strong>
</summary>

> 내가 달렸던 코스, 찜한 코스, 다른 러너들이 만든 코스 검색 및 상세 조회 기능

<div>
    <img src='/docs/images/course-read.gif' alt='코스 조회' />
</div>
</details>

<br>

<details>
<summary>
    <strong style="font-size: 1.25em;">
        7️⃣ 러너 검색 및 상세 조회
    </strong>
</summary>

> 다른 러너를 검색하거나 프로필을 조회하며 러닝 정보를 확인하고 팔로잉 할 수 있는 SNS 기능

<div>
    <img src='/docs/images/profile.gif' alt='프로필' />
    <img src='/docs/images/following.gif' alt='프로필' />
</div>
</details>

<br><br>

## ✨ 참고 문서

### ERD

<div>
    <img width="100%;" src='/docs/images/erd.png' alt='ERD'/>
</div>

### 디자인 시스템

<div>
    <img width="100%;" src='/docs/images/design_system.png' alt='디자인 시스템'/>
</div>

### 서비스 소개 영상

[![Youtube Badge](https://img.shields.io/badge/Youtube-ff0000?style=flat-square&logo=youtube&link=https://www.youtube.com/c/kyleschool)](https://www.youtube.com/watch?v=Yx08Z7tx0FE)

<br><br>

## ✨ 프로젝트 회고

<table style="width: 100%;"> 
    <tr>
        <td style="width: 30%;" align="center"><b>이름</b></td>
        <td style="width: 70%;" align="center"><b>내용</b></td>
    </tr>
    <tr>
        <td align="center">이주현</td>
        <td><i>"인프라를 처음 해봤는데, 생각할 게 많더라고요. 무중단 배포까지 욕심을 좀 부렸더니 쉽지 않았어요.
        <br>
        하지만, 시야가 조금 더 넓어진 것 같아 뿌듯합니다."</i></td>
    </tr>
    <tr>
        <td align="center">김수현</td>
        <td><i>"</i>PostgreSQL을 써봐서 좋았습니다."</td>
    </tr>
    <tr>
        <td align="center">박창조</td>
        <td><i>"런닝이라는 서비스를 기획하고 개발하게 되면서, Webview라는 새로운 아키텍처를 도입하여 앱과 웹의 차이에 대해 공부할 수 있는 시간이 되어 의미가 깊었습니다. 더불어 사용자 경험을 위해 정적인 데이터를 빠르게 보여주기 위해 도입한 Next.js를 도입하면서, SSR에 대한 이해도를 높이며 프론트엔드 개발자로 한층 더 성장할 수 있었던 시간이었습니다. 특별히 평소 친했던 팀원들과 웃음 가득히 즐겁게 개발했던 6주의 시간이어서 행복했던 추억으로 남을 것 같습니다 :)"</i></td>
    </tr>
    <tr>
        <td align="center">윤서희</td>
        <td><i>"안드로이드 환경을 더 공부하고 개발했으면 하는 생각이 듭니다.
다음번엔 백그라운드 동작, wearable 연동까지 도전해보려고 합니다."</i></td>
    </tr>
    <tr>
        <td align="center">이남재</td>
        <td><i>"GeoHash 그만보고 싶다.."</i></td>
    </tr>
    <tr>
        <td align="center">전종우</td>
        <td><i>"SSR을 경험하기 위해 Next.js 학습을 병행하며 진행했던 만큼 개발 속도가 많이 더뎠던 프로젝트였지만, 네이티브 앱 페이지나 서버 컴포넌트 등 다양한 플랫폼에서 JWT 토큰을 관리하기 위해 고민하며 성장할 수 있었습니다."</i></td>
    </tr>
</table>
