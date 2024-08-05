# 카카오 테크 캠퍼스 Step2 과제(6주차)
###  기술 스택
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
</br>

---

### 프로젝트 설명
**[카카오 선물하기 사이트](https://gift.kakao.com/home)** 를 클론코딩한다.

6주 간의 대장정 끝에 이제 배포만 남앗다!!!

### 프로젝트 요구사항
- [X] API 명세 작성
- [ ] 5주차 코드 수정
  - [X] 로그인 api 연결 코드 수정
  - [ ] 회원가입 코드 수정
  - [ ] 위시리스트 코드 수정
- [ ] github Action을 사용한 CI/CD 구축 및 배포
  - [ ] 시간 없을 시 vercel
- [ ] 포인트 기능 추가


### 질문
  1. SPA 페이지를 정적 배포를 하려고 할 때 Vercel을 사용하지 않고 한다면 어떻게 할 수 있는가?
    
          A: Netifly, Github Pages, AWS S3 + CloudFront와 같은 방법을 통해 할 수 있다. 개인적으로는 S3의 방법이 가장 편하다. 
  2. CSRF나 XSS 공격을 막는 방법은 무엇인가?

          A: CSRF토큰 사용을 통해 유효성을 검증하는 방식이 있다. XSS 방지의 방법으로는 가장 대표적인 것이 출력 시에 인코딩을 하는 방법이 있다. 또한, 정규 표현식을 이용하여 입력값을 제한하는 방법도 존재한다. HTTPS를 사용하여 전송 중 데이터 변경이나 탈취를 방어하는 것이 가장 올바른 방법일 것이다.
  3. 브라우저 렌더링 원리에 대해 설명하라.

          A: HTMl 파싱 및 DOM 트리 생성 => CSS 파싱 및 스타일 규칙 적용 => 렌더 트리 생성 => 레이아웃 계산 => 페인팅 => 합성의 단계로 이루어진다. 
          브라우저 렌더링 원리는 웹 페이지를 사용자에게 표시하는 과정이며, 위에 언급한 순서처럼 브라우저가 어떤 단계를 통해 사용자에게 그림을 그려서 보여주는지 알려주는 것이다.