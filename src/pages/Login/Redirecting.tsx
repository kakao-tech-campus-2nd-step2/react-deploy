import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/api/instance";
import { authSessionStorage } from "@/utils/storage";
import { fetchInstance } from "@/api/instance";

export const RedirectionComponent = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  const navigate = useNavigate();
  console.log(code);
  useEffect(() => {
      fetchInstance.get(`${BASE_URL}/kakao/token`, {
      params: { code },
      withCredentials: true
    }).then((r) => {
      console.log(r.data);
      authSessionStorage.set({ token: r.data.token });
      console.log('테스트');
      setTimeout(()=> {
        navigate('/');
      }, 3000);
      window.location.reload();
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};

