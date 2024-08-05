import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "@/api/instance";
import { authSessionStorage } from "@/utils/storage";
import { fetchInstance } from "@/api/instance";

export const RedirectionComponent = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const navigate = useNavigate();

  useEffect(() => {
      fetchInstance.get(`${BASE_URL}/kakao/token`, {
      params: { code },
      withCredentials: true
    }).then((r) => {

      authSessionStorage.set({ token: r.data.token });
=======

      setTimeout(()=> {
        navigate('/');
      }, 3000);
      window.location.reload();
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};

