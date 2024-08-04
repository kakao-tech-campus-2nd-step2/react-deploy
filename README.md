# react-deploy

## 1단계 요구사항

1. [o] 상단 네비게이션 바에서 API 선택

- 팀 내 여러 서버 중 하나를 선택해 서비스 이용
- 선택한 엔지니어의 API로 API 통신

## 2단계 요구사항

1. [o] 배포하기

- github action을 사용하여 CI/CD 구성
- cloudflare의 pages에 베포

## 3단계 요구사항

1. [o] 포인트 구현

- 사용자별로 보유
- 차감
- 관리자 화면에서 포인트 충전

## 4단계 요구사항

- 질문 1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까요?

1. GitHub Pages

- GitHub 저장소에 정적 사이트를 배포할 수 있는 기능을 제공합니다. 주로 프로젝트 저장소의 gh-pages 브랜치를 통해 배포합니다.
- 빌드된 정적 파일을 gh-pages 브랜치에 푸시하면 자동으로 배포됩니다.

2. Netlify

- 정적 사이트 배포에 특화된 플랫폼으로, GitHub, GitLab, Bitbucket과 쉽게 통합할 수 있습니다.
- 지속적 배포(Continuous Deployment)와 사용자 친화적인 도메인 설정 등을 지원합니다.

3. AWS S3 + CloudFront

- AWS S3를 사용하여 정적 파일을 저장하고, CloudFront를 통해 전 세계적으로 캐시하고 배포할 수 있습니다.
- CDN을 사용하여 전 세계 사용자에게 빠른 응답 속도를 제공할 수 있습니다.

4. Google Firebase Hosting

- Firebase는 정적 및 동적 콘텐츠를 모두 지원하며, 무료로 시작할 수 있는 호스팅 솔루션을 제공합니다.
- CLI를 통해 쉽게 배포할 수 있습니다.

5. Azure Static Web Apps

- Azure에서 제공하는 정적 웹 앱 서비스로, GitHub Actions와 통합하여 자동 배포가 가능합니다.
- HTTPS, 사용자 인증 등의 기능을 지원합니다.

6. GitLab Pages

- GitLab의 기능으로, GitLab CI/CD를 통해 자동으로 정적 사이트를 배포할 수 있습니다.
- .gitlab-ci.yml 파일을 통해 배포 프로세스를 정의합니다.

- 질문 2. CSRF나 XSS 공격을 막는 방법은 무엇일까요?

<CSRF(Cross-Site Request Forgery) 공격 방지 방법>

1. CSRF Token 사용

- 서버는 각 사용자 세션에 대해 고유한 CSRF 토큰을 생성합니다.
- 이 토큰은 폼이나 AJAX 요청 시 함께 전송되어 서버에서 검증하기 때문에 위조하기 어렵습니다.

2. SameSite Cookie 속성

- 쿠키에 SameSite 속성을 설정하여, 요청이 동일한 사이트에서 발생했는지 확인합니다.
- Strict 또는 Lax 옵션을 사용하여 CSRF 공격을 완화할 수 있습니다.

3. CORS 설정 강화

- Access-Control-Allow-Origin 헤더를 사용하여 신뢰할 수 있는 출처(origin)에서만 요청을 허용합니다.

4. HTTP Referer 검증

- 서버는 HTTP Referer 헤더를 확인하여 요청이 허용된 출처에서 발생했는지 검증합니다.

<XSS(Cross-Site Scripting) 공격 방지 방법>

1. 입력 검증 및 정화(Sanitization)

- 사용자 입력을 신뢰하지 않고, 모든 입력을 검증하고 정화합니다.
- HTML 특수 문자를 이스케이프하여 스크립트 코드로 해석되지 않도록 합니다.

2. 출력 인코딩

- 서버에서 데이터를 클라이언트로 전송하기 전에 HTML, JavaScript, URL 등에 맞게 인코딩합니다.
- &를 &amp;, <를 &lt;와 같이 변환합니다.

3. HTTPOnly 및 Secure 쿠키 사용

- 쿠키에 HttpOnly 속성을 추가하여 JavaScript에서 쿠키에 접근하지 못하도록 합니다.
- Secure 속성을 사용하여 HTTPS를 통해서만 쿠키가 전송되도록 합니다.

- 질문 3. 브라우저 렌더링 원리에대해 설명해주세요.

1. HTML 파싱 및 DOM 트리 생성

- 브라우저는 서버로부터 HTML 문서를 수신하고 이를 파싱하여 DOM(Document Object Model) 트리를 생성합니다.
- DOM 트리는 HTML 요소와 그 속성을 객체 모델로 표현한 구조입니다.

2. CSS 파싱 및 CSSOM 트리 생성

- CSS 스타일시트를 파싱하여 CSSOM(CSS Object Model) 트리를 생성합니다.
- 이 과정에서 스타일의 계층적 관계와 상속을 적용하여 최종 스타일 규칙을 계산합니다.

3. 렌더 트리 생성

- DOM 트리와 CSSOM 트리를 결합하여 렌더 트리를 생성합니다.
- 렌더 트리는 화면에 실제로 표시될 요소들만 포함하며, display: none과 같은 스타일로 숨겨진 요소는 제외됩니다.

4. 레이아웃 단계

- 렌더 트리를 기반으로 각 요소의 정확한 위치와 크기를 계산합니다.
- 이 과정은 "레이아웃" 또는 "리플로우"라고도 불리며, 화면의 크기에 따라 상대적인 위치를 계산합니다.

5. 페인팅(Painting)

- 계산된 레이아웃 정보를 기반으로 각 요소를 화면에 그립니다.
- 페인팅 과정에서는 색상, 글꼴, 그림자 등 시각적인 스타일이 적용됩니다.

6. 컴포지팅(Compositing)

- 여러 레이어가 있는 경우, 브라우저는 이들을 적절히 결합하여 최종 화면에 렌더링합니다.
- GPU 가속을 사용하는 경우, 레이어별로 나누어 렌더링하여 성능을 향상시킵니다.
