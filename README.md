# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## STEP1

- 작성한 API 문서를 기반으로 팀 내에서 지금까지 만든 API를 검토하고 통일하여 변경 사항을 반영한다.
  - 팀 내에서 일관된 기준을 정하여 API 명세를 결정한다.
  - 때로는 클라이언트의 편의를 위해 API 명세를 결정하는 것이 좋다.
  - 팀 내에 배포 될 API가 여러개 일 경우 상단 네비게이션 바에서 선택 가능하게 한다.
    - 프론트엔드의 경우 배포와 사용자가 팀 내 여러 서버 중 하나를 선택하여 서비스를 이용
      - 팀내 백엔드 엔지니어의 이름을 넣고, 이름을 선택하면 해당 엔지니어의 API로 API통신을 하게 한다.
      - 기본 선택은 제일 첫번째 이름으로 한다.

## STEP2

- 세가지 방법 중 본인이 원하는 방식으로 배포한다.
  (단, 가능하면 최대한 방법 1, 3번으로 진행하고 CI/CD를 구축하는 것을 권장해요)
  - 방법1.
    - github action을 사용하여 ci/cd를 구성한다.
    - cloudflare의 pages에 배포한다.
  - 방법2.
    - vercel을 사용하여 배포한다.
  - 방법3.
    - github pages를 사용하여 배포한다.
- 서버 API가 의도대로 잘 동작하는지 확인하고, 문제가 있다면 해결한다.

## STEP3

- 상품 구매에 사용할 수 있는 포인트 기능을 구현한다.

  - 포인트는 사용자별로 보유한다.
  - 포인트 차감 방법 등 나머지 기능에 대해서는 팀과 논의하여 정책을 결정하고 구현한다.
    - e.g.
    - 5만 원 이상 주문 시 총 금액의 10%가 할인된다.
    - 현금 영수증을 받으려면 휴대전화 번호를 입력해야 한다.
  - API 명세는 팀과 협의하여 결정하고 구현한다.
  - 관리자 화면에서 포인트를 충전할 수 있다.

## STEP4

- 질문 1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있을까요?

  1. Netlify

  - Netlify는 정적 사이트 배포를 위한 또 다른 인기 있는 플랫폼입니다. 자동화된 배포, 지속적 통합, 사용자 지정 도메인 등을 지원
  - 프로젝트를 GitHub, GitLab, 또는 Bitbucket에 업로드한 후, Netlify와 연동하여 자동 배포할 수 있음

  2. GitHub Pages

  - GitHub Pages는 리포지토리의 특정 브랜치에서 정적 파일을 호스팅할 수 있음
  - GitHub 리포지토리를 설정한 후, gh-pages 브랜치를 생성하여 SPA 파일을 업로드하고 GitHub Pages를 활성화하면 됨

  3. Firebase Hosting

  - Firebase Hosting은 빠르고 안전한 웹 호스팅을 제공하며, SPA를 손쉽게 배포할 수 있음
  - Firebase CLI를 통해 프로젝트를 초기화하고 배포할 수 있음
  - firebase init 명령으로 프로젝트를 설정한 후, firebase deploy 명령으로 배포

  4. Amazon S3 + CloudFront

  - AWS S3를 사용하여 정적 파일을 호스팅하고, CloudFront를 사용하여 콘텐츠를 캐싱하고 전송 속도를 최적화할 수 있음
  - S3 버킷을 생성하고 정적 파일을 업로드한 후, CloudFront 배포를 설정하여 글로벌 캐싱을 활성화

  5. Surge.sh

  - Surge는 정적 웹사이트를 배포하기 위한 간단한 명령줄 도구
  - surge 명령을 사용하여 정적 파일이 포함된 디렉터리를 지정하면 사이트가 배포됨<br/>

- 질문 2. CSRF나 XSS 공격을 막는 방법은 무엇일까요?

  - CSRF (Cross-Site Request Forgery) 방어 방법:
    - CSRF Token 사용: 서버는 각 요청에 대해 고유한 CSRF 토큰을 생성하고 클라이언트는 이 토큰을 요청과 함께 보내야 함. 서버는 토큰을 검증하여 요청이 유효한지 확인
    - Referer 헤더 검사: 요청의 Referer 헤더를 확인하여 요청이 올바른 출처에서 왔는지 검증
    - SameSite 쿠키 속성 설정: SameSite 속성을 Strict 또는 Lax로 설정하여 크로스 사이트 요청에서 쿠키가 전송되지 않도록 함
  - XSS (Cross-Site Scripting) 방어 방법:
    - 입력 값 검증 및 인코딩: 사용자 입력을 철저히 검증하고, 출력 시 HTML, JavaScript, CSS 등으로 인코딩하여 스크립트 실행을 방지
    - Content Security Policy (CSP) 설정: CSP를 사용하여 허용된 출처에서만 리소스가 로드되도록 제어
    - HTTP-Only 쿠키 사용: 쿠키에 HttpOnly 속성을 설정하여 JavaScript를 통해 쿠키에 접근할 수 없도록 함
    - JavaScript 라이브러리 사용 시 최신 버전 유지: 보안 패치가 적용된 최신 버전의 라이브러리를 사용하여 알려진 취약점을 방지<br/>

- 질문 3. 브라우저 렌더링 원리에대해 설명해주세요.
  1. DOM (Document Object Model) 생성: HTML 문서를 파싱하여 DOM 트리를 생성함. 이 트리는 문서의 구조를 계층적으로 표현
  2. CSSOM (CSS Object Model) 생성: CSS 파일을 파싱하여 CSSOM 트리를 생성함. 이 트리는 스타일 규칙을 계층적으로 표현
  3. Render Tree 생성: DOM과 CSSOM을 결합하여 Render Tree를 생성함. Render Tree는 화면에 실제로 렌더링할 노드만 포함합니다.
  4. Layout (Reflow): Render Tree의 각 노드의 위치와 크기를 계산하여 레이아웃을 결정함. 이 과정을 Reflow라고도 함
  5. Painting: Render Tree의 각 노드를 실제 픽셀로 변환하여 화면에 그리는 과정
  6. JavaScript 실행: JavaScript 엔진이 스크립트를 실행하여 DOM이나 CSSOM을 동적으로 수정할 수 있음. 변경이 발생하면 Reflow와 Repaint 과정이 다시 일어날 수 있음
  7. Composite: 여러 레이어로 분리된 콘텐츠를 합성하여 최종 이미지를 만듦. 이 단계는 성능 최적화를 위해 여러 레이어를 병합하여 효율적으로 렌더링
