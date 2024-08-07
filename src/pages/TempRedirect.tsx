import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TempRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 임시 페이지에서 최종 목적지로 리디렉션
    window.location.href = 'https://hehelee.github.io';
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default TempRedirect;
