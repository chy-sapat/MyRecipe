import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UserProfileInfo from "@components/userProfile/userProfile";
import UserRecipes from "@components/userProfile/userRecipes";
import UserCollection from "@components/userProfile/userCollection";
import LoadingSpinner2 from "@components/loading/loadingspinner2";
import { useGetUserId } from "@hooks/GetUserId";
import { useGetUserDetails } from "@hooks/GetUserDetails";
const Profile = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        if (userId == params.id) {
          setUserData(userDetail);
        } else {
          const response = await axios.get(
            `http://localhost:3000/auth/fetch-user-data/${params.userId}`
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner2 />
      ) : (
        <section className="user-profile-container">
          <section className="user-profile-wrapper">
            {userData && <UserProfileInfo userData={userData} />}
            <ul className="userprofile-nav-links">
              <li className="profile-nav-link">Recipes</li>
              <li className="profile-nav-link">Collections</li>
              <li className="profile-nav-link">Settings</li>
            </ul>
            <section className="userprofile-content">
              <section className="user-recipes">
                <UserRecipes userId={params.id} />
              </section>
              <section className="user-collection">
                <UserCollection userId={params.id} />
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
