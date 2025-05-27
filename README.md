<div align="center">
    <img width="100%;" src='/docs/images/intro.png' alt='썸네일'/>
</div>

<br><br>

# 목차

- [1️⃣ 서비스 소개](#-서비스-소개)
- [2️⃣ 함께한 팀원](#-함께한-팀원)
- [3️⃣ 시스템 아키텍처](#-시스템-아키텍처)
- [4️⃣ 기술 스택](#-기술-스택)
- [5️⃣ 주요 기능](#-주요-기능)
- [6️⃣ 참고 문서](#-참고-문서)

<br><br>

# 서비스 소개

### 지도 위를 달리며 땅을 차지하고, 12간지 팀과 함께 랭킹 경쟁을 펼치는 러닝+게임 융합 앱 서비스

<div align="center">
    <img width="100%;" src='/docs/images/main_functions.gif' alt='핵심 기능'/>
</div>

- 🕜 **진행 기간** : 2025.04.14. ~ 2025.05.22. (6주)
- 👨‍👩‍👧‍👦 **진행 인원** : 6명 (FE: 3, BE: 2, INFRA: 1)

### ✅ 주요 기능 summary

| 기능                       | 설명                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| 1️⃣ 소셜 로그인             | 서비스 이용을 위한 JWT 기반 인증 기능                                                    |
| 2️⃣ 개인/팀별 러닝 대시보드 | 최근 1주일 간의 러닝 정보 제공 기능                                                      |
| 3️⃣ 개인/팀별 통계 대시보드 | 최근 1주일 간의 타일 점령 정보 제공 기능                                                 |
| 4️⃣ 점령 러닝               | 내가 밟은 타일을 기반으로 러닝를 갱신하고 타일 점령 정보 반영 기능                       |
| 5️⃣ 나만의 코스 만들기      | 지도 위에 포인트를 추가하여 나만의 코스 제작 기능                                        |
| 6️⃣ 코스 검색 및 상세 조회  | 내가 달렸던 코스, 찜한 코스, 다른 러너들이 만든 코스 검색 및 상세 조회 기능              |
| 7️⃣ 러너 검색 및 상세 조회  | 다른 러너를 검색하거나 프로필을 조회하며 러닝 정보를 확인하고 팔로잉 할 수 있는 SNS 기능 |

<br><br>

# 팀원 및 역할 분담

|                                        이주현                                         |                                     김수현                                      |                                     박창조                                      |                                     윤서희                                      |                                        이남재                                         |                                       전종우                                        |
| :-----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
| [![](https://github.com/column-wise.png?width=150px)](https://github.com/column-wise) | [![](https://github.com/KSH00610.png?width=150px)](https://github.com/KSH00610) | [![](https://github.com/pcjo1202.png?width=150px)](https://github.com/pcjo1202) | [![](https://github.com/Seoheeda.png?width=150px)](https://github.com/Seoheeda) | [![](https://github.com/dlskawo0409.png?width=150px)](https://github.com/dlskawo0409) | [![](https://github.com/jinlaove17.png?width=150px)](https://github.com/jinlaove17) |
|                                         INFRA                                         |                                       BE                                        |                                       FE                                        |                                       FE                                        |                                          BE                                           |                                         FE                                          |

<table style="width: 100%;"> 
    <tr>
        <th style="width: 30%;">이름</th>
        <th style="width: 80%;">역할</th>
    </tr>
    <tr>
        <td>👑 이주현</td>
        <td>
            인프라 설정 및 무중단 배포 자동화
            <br>
            서버-프론트 간 통합 환경 설정
        </td>
    </tr>
    <tr>
        <td>🟡 김수현</td>
        <td></td>
    </tr>
    <tr>
        <td>🟡 박창조</td>
        <td></td>
    </tr>
    <tr>
        <td>🟡 윤서희</td>
        <td>
            러닝 페이지 및 땅 점령 기능 구현
            <br>
            React Native를 활용한 native 페이지 구현 및 웹뷰 연결
        </td>
    </tr>
    <tr>
        <td>🟡 이남재</td>
        <td></td>
    </tr>
    <tr>
        <td>🟡 전종우</td>
        <td></td>
    </tr>
</table>

<br><br>

# 시스템 아키텍처

<div style="width: 100%; "><img src='/docs/images/system_architecture.png' alt='시스템 아키텍처'/></div>

<br><br>

# 기술 스택

### ❤️ **Frontend**

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

### 💛 **Backend**

![java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![springboot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![spring_JPA](https://img.shields.io/badge/spring_JPA-6DB33F?style=for-the-badge&logo=spring_JPA&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=Redis&logoColor=white)
![gradle](https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

### 💚 **CI/CD**

![nginx](https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)
![amazonec2](https://img.shields.io/badge/EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

### 💙 **협업 Tool**

![gitlab](https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Mattermost](https://img.shields.io/badge/mattermost-4B5562?style=for-the-badge&logo=mattermost&logoColor=white)
![figma](https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![notion](https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<br><br>

# 주요 기능

### 1️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 2️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 3️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 4️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 5️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 6️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 7️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

### 8️⃣ 기능을 입력해 주세요

![](https://img.shields.io/badge/FE-OOO-31A8FF) ![](https://img.shields.io/badge/BE-OOO-7dd581)

> 기능을 입력해 주세요

- 설명을 입력해 주세요

<details>
<summary>
&nbsp; 상세 보기
</summary>
이곳에 내용을 입력해 주세요
</details>

<br><br>

# 📚 참고 문서

### 📊 ERD

<div align="center">
    <img width="100%;" src='/docs/images/erd.png' alt='ERD'/>
</div>

### 🎨 디자인 시스템

<div align="center">
    <img width="100%;" src='/docs/images/design_system.png' alt='디자인 시스템'/>
</div>

### 🎥 서비스 소개 영상

<div align="center">
    <video src="/docs/videos/introduce.mp4" controls width="100%"></video>
</div>

[![Youtube Badge](https://img.shields.io/badge/Youtube-ff0000?style=flat-square&logo=youtube&link=https://www.youtube.com/c/kyleschool)](https://www.youtube.com/watch?v=Yx08Z7tx0FE)

<br><br>

# 프로젝트 짧은 회고

| 이름   | 내용                                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이주현 | _"인프라를 처음 해봤는데, 생각할 게 많더라고요. 무중단 배포까지 욕심을 좀 부렸더니 쉽지 않았어요 하지만 시야가 조금 더 넓어진 것 같아 뿌듯합니다"_ |
| 김수현 | _""_                                                                                                                                               |
| 박창조 | _""_                                                                                                                                               |
| 윤서희 | _""_                                                                                                                                               |
| 이남재 | _"GeoHash 그만보고 싶다.."_                                                                                                                        |
| 전종우 | _""_                                                                                                                                               |
