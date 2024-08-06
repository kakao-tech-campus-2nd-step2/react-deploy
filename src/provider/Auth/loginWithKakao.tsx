const { Kakao } = window;

export const loginWithKakao = () => {
  Kakao.Auth.authorize({

    redirectUri: "http://43.203.28.55:8080/api/oauth/token",

    scope: "profile_nickname",
  });
};
