import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UserProfileInfo from "@components/userProfile/userProfile";
import UserRecipes from "@components/userProfile/userRecipes";
import UserCollection from "@components/userProfile/userCollection";
import LoadingSpinner2 from "@components/loading/loadingspinner2";
import { useGetUserId } from "@hooks/GetUserId";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import UserProfileSetting from "@components/userProfile/userProfileSetting";
import "@styles/profile.scss";
import { useSelector } from "react-redux";
const Profile = () => {
  const params = useParams();
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [activePage, setActivePage] = useState("userRecipe");
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
            `http://localhost:3000/auth/fetch-user-data/${params.userId}`,
            {
              timeout: 1000,
            }
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
              <li
                className={`profile-nav-link ${
                  activePage == "userRecipe" && "active"
                }`}
                onClick={() => setActivePage("userRecipe")}
              >
                Recipes
              </li>
              <li
                className={`profile-nav-link ${
                  activePage == "userCollection" && "active"
                }`}
                onClick={() => setActivePage("userCollection")}
              >
                Collections
              </li>
              {isSignedIn && userId == userData._id && (
                <li
                  className={`profile-nav-link ${
                    activePage == "setting" && "active"
                  }`}
                  onClick={() => setActivePage("setting")}
                >
                  Settings
                </li>
              )}
            </ul>
            <section className="userprofile-content">
              {activePage == "userRecipe" && (
                <section className="user-recipes">
                  <UserRecipes userId={params.userId} />
                </section>
              )}
              {activePage == "userCollection" && (
                <section className="user-collection">
                  <UserCollection userId={params.userId} />
                </section>
              )}
              {activePage == "setting" && (
                <section className="profile-setting">
                  <UserProfileSetting userData={userData} />
                </section>
              )}
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
