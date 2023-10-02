export const useUserSession = () => {
  const getUserSession = () => {
    const token = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    return { token, userId };
  };

  return { getUserSession };
};
