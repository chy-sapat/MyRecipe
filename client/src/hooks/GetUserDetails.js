import { useSelector } from "react-redux";
export const useGetUserDetails = () => {
  const userDetails = useSelector((state) => state.userDetail.value);
  return userDetails;
};
