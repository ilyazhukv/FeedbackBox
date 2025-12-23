export const useAuth = () => {
  const isAdmin = !!localStorage.getItem("token");
  return isAdmin;
};
