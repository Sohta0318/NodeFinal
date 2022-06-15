export const useLoggedIn = () => {
  const account = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  return {
    account,
    token,
  };
};
