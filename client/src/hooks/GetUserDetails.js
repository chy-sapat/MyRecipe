export const useGetUserDetail = () => {
  return JSON.parse(window.localStorage.getItem("user_detail"));
};
