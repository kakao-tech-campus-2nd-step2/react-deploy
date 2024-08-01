const { Kakao } = window;

export const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: "http://localhost:3000/login",
    scope: "profile_nickname",
  });
};
