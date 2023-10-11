export const useIsAuthenticated = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("userToken");
    return !!token;
  };

  return { isAuthenticated };
};
