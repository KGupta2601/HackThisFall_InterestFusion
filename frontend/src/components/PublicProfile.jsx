import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PublicProfileText from "./PublicProfileText";
import { BASE_URL } from "./../utils/constants";
import SkillComponent from "./SkillComponent";

function PublicProfile() {
  const { publicUserId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [publicUserData, setPublicUserData] = useState({});
  const [showToast, setShowToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(publicUserId);
    async function fetchUserData() {
      try {
        const res = await axios.get(
          BASE_URL + "/get_public_profile/" + publicUserId
        );
        console.log(res.data.data);
        if (res.data.status == 1) {
          setPublicUserData(res.data?.data);
        } else {
          navigate("/not-found");
        }
        setIsLoading(false);
      } catch (e) {
        navigate("/not-found");
      }
    }
    fetchUserData();
  }, []);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      setShowToast("Request Sent");
      setTimeout(() => setShowToast(null), 3000);
    } catch (err) {
      setShowToast("Could not send Request");
      setTimeout(() => setShowToast(null), 3000);
    }
  };
  async function messageButtonFunction() {
    try {
      await axios
        .get(BASE_URL + "/profile/view", {
          withCredentials: true,
        })
        .then((data) => {
          console.log(data);
          console.log(data);
          if (!data) {
            console.log("here to login 1");
            navigate("/login");
          }
          handleSendRequest("interested", publicUserData._id);
        })
        .catch((e) => {
          console.log(e);

          navigate("/login");
        });
    } catch (err) {
      if (err.status === 401) {
        console.log("here to login2 ");

        navigate("/login");
      }
      console.error(err);
    }
  }

  return isLoading ? (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      Loading...
    </div>
  ) : (
    <div className="flex flex-col w-screen">
      <div className="flex-1  mt-4">
        <Link to="/" className="btn btn-ghost ml-8 text-xl">
          👩‍💻 InterestFusion
        </Link>
      </div>
      <div className="flex mx-16 lg:mx-32 ">
        <img
          src={publicUserData.photoUrl}
          className="h-[600px]  w-[450px] hidden mr-16 lg:block  "
          alt="photo"
        />
        <dev className="flex flex-col justify-start mt-12  w-full lg:w-7/12 ">
          <p className="text-3xl font-semibold my-4">
            {" "}
            {publicUserData.firstName}
          </p>
          <p className="text-xl font-semibold">{publicUserData.about}</p>

          <div className="h-3 w-full mt-2 mb-5 bg-[#6b10cb]"></div>

          <div className="flex flex-col">
            <PublicProfileText
              initial="Full Name "
              detail={publicUserData.firstName + "  " + publicUserData.lastName}
            />
            {publicUserData.gender ? (
              <PublicProfileText
                initial="Gender "
                detail={publicUserData.gender}
              />
            ) : (
              <></>
            )}
            {publicUserData.age ? (
              <PublicProfileText initial="Age " detail={publicUserData.age} />
            ) : (
              <></>
            )}

            <div className="inline-grid grid-cols-10 my-3 mt-8 ">
              {publicUserData.skills.map((skill) => {
                return SkillComponent(skill);
              })}
            </div>
          </div>

          <button
            type="submit"
            onClick={messageButtonFunction}
            className="w-full mt-20  px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Connect
          </button>
        </dev>
      </div>

      {showToast != null && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>{showToast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicProfile;
