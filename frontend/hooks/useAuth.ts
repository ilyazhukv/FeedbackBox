import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsAdmin(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);

    const intervalId = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(intervalId);
    };
  }, []);

  return isAdmin;
};
