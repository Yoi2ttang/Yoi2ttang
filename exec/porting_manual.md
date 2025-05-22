# 공통

## 1. `Chocolatey` 설치

> Windows용 패키지 매니저
> 

**PowerShell 관리자 모드로 실행 후 아래 명령어 실행:**

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**설치 확인**

```powershell
choco
```

**필수 패키지 설치**

```powershell
choco install git
choco install zip
```

## 2. `Docker Desktop` 설치

https://docs.docker.com/desktop/setup/install/windows-install/

- 로그인은 선택이지만 하면 좋음(로그인하라고 보채지 않음)

## 3. `Git` 설정

```bash
git config --global user.name "이름"
git config --global user.email "이메일"
```

## 4. 프로젝트 클론

```bash
git clone https://lab.ssafy.com/s12-final/S12P31A502.git
```

# FE

## 1. `Node.js` 설치

### `NVM (nvm-windows)` 설치

> Node.js 버전 관리 도구
> 

**PowerShell 관리자 모드로 실행 후 nvm 설치**

```powershell
choco install nvm
```

**Git Bash 실행 후 설치 확인**

```bash
nvm -v
```

**lts 버전 설치**

```bash
nvm install lts
```

**기본 버전 등록 (v22.14.0)**

```bash
nvm use 22.14.0
```

**npm 최신 버전 설치**

```powershell
npm i -g npm@11.0.0
```

![image.png](attachment:db244848-35f3-4f49-9337-aad0566c2bb0:image.png)

프로젝트 폴더로 이동

```java
cd S12P31A502/frontend
```

환경변수 파일(.env) 생성

```java
//.env
NEXT_PUBLIC_MAP_CLIENT_ID=
NEXT_PUBLIC_API_URL=https://yoi2ttang.site
NEXT_PUBLIC_KAKAO_CLIENT_ID=
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/login/auth
NEXT_PUBLIC_NAVER_SEARCH_API_CLIENT_ID=
NEXT_PUBLIC_NAVER_SEARCH_API_CLIENT_SECRET=
NEXT_PUBLIC_NAVER_APIGW_API_KEY_ID=
NEXT_PUBLIC_NAVER_APIGW_API_KEY=
```

패키지 설치

```java
npm i
```

electron 실행

```java
npm run dev
```

# BE

## 1. `Java` 설치

### **`sdkman`**

> Java 버전 관리 도구
> 
- **Git Bash 실행 후 sdkman 설치**
    
    ```bash
    curl -s "https://get.sdkman.io" | bash
    ```
    
- **Java 설치 가능한 버전 확인**
    
    ```bash
    sdk list java
    ```
    
- **17.0.14-librca 설치 (lts)**
    
    ```bash
    sdk install java 17.0.14-librca
    ```
    
- **기본 버전 등록**
    
    ```bash
    sdk use java 17.0.14-librca
    sdk default java 17.0.14-librca
    ```
    
- **환경변수 등록**
    
    > sdkman에서 JDK를 설치하고 윈도우에서 설치된 JDK를 바로 사용 할 수 없다. 윈도우에서 해당 JDK를 인식하고 사용 할 수 있도록 환경변수로 등록을 해주어야한다. 보통의 경우 사용하는 java가 설치된 경로를 등록을 해주어야하는데, sdkman에서 유동적으로 환경변수를 변경 할 수 있도록 "C:\Users\사용자명\.sdkman\candidates\java\current" 의 경로를 지정해 주면 된다. (해당 경로를 등록해 주면 sdkman이 알아서 사용할 JDK를 연결시켜주는 것으로 보인다.)
    > 
    
    https://kimvampa.tistory.com/308
    
    - sdkman 설치 후 출력되는 경로를 참고하여 환경변수 등록 진행
    
- **설치된 버전 확인**
    
    ```bash
    java --version
    ```
    
    ![image.png](attachment:167c0555-1637-4e1d-aa4a-c26cdbf6e0b5:image.png)
    

# 2. Intellij에서 프로젝트 open

- `S12P21A502` 폴더 선택

# 3. `프로젝트 루트(S12P31A502/backend)` 폴더에 환경 변수 파일 (.env) 생성

```java
// dev.env
# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# PostgreSQL
DB_URL=
DB_USERNAME=
DB_PASSWORD=
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver

# JPA
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_PROPERTIES_HIBERNATE_FORMAT_SQL=false

# Kakao OAuth
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
KAKAO_CLIENT_NAME=kakao-login
KAKAO_CLIENT_AUTHENTICATION_METHOD=client_secret_post
KAKAO_REDIRECT_URI_APP=http://localhost:3000/login/auth
KAKAO_REDIRECT_URI_WEB=http://localhost:3000/login/auth
KAKAO_REDIRECT_URI_APP_LOCAL=http://localhost:3000/login/auth
KAKAO_REDIRECT_URI_WEB_LOCAL=http://localhost:3000/login/auth
KAKAO_AUTHORIZATION_GRANT_TYPE=authorization_code

# JWT
JWT_SECRET=
JWT_ACCESS_EXPIRY=32140800
JWT_REFRESH_EXPIRY=1209600

# S3
AWS_S3_ACCESSKEY=
AWS_S3_SECRETKEY=
AWS_S3_BUCKET=
AWS_S3_REGION=ap-northeast-2
```

- .gitignore에 추가
    
    `*.env`
    

# 4. 실행 환경 설정

- **Gradle 설정**
    - `IntelliJ Settings → Build, Execution, Deployment → Gradle → Gradle JVM을 Java 17로 설정`
- **Run / Debug Configurations 설정**
    - `Edit Configurations → Active profiles에 dev 입력`
    - `Build and run 에서 Modify options 선택, Environment variables check, 
    새로 생성된 Environment variables 탭에 프로젝트 경로/S12P21A701/backend/dev.env 입력`

## Android

## 1. 의존성 설치

```bash
npm install
```

## 2. 실행

```bash
npx react-native run-android
```

## 3. apk debug 파일 추출

```bash
./gradlew assembleDebug
```

## 4. apk release 파일 추출

```bash
./gradlew assembleRelease
```
