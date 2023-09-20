import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Tweet from "../../components/Tweet/Tweet";
import EditProfile from "../../components/EditProfile/EditProfile";
import { following } from "../../store/slices/userSlice";

type Props = {};

const Profile = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [userTweets, setUserTweets] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>();

  const { currentUser } = useSelector((state: any) => state.user);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);

        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollowUnFollow = async () => {
    if (!currentUser?.following?.includes(id)) {
      try {
        const follow = await axios.put(`/users/follow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const unfollow = await axios.put(`/users/unfollow/${id}`, {
          id: currentUser._id,
        });
        dispatch(following(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>

        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full bg-slate-300"
            />
            {currentUser._id === id ? (
              <button
                onClick={() => setOpen(true)}
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
              >
                Edit Profile
              </button>
            ) : currentUser?.following?.includes(id) ? (
              <button
                onClick={handleFollowUnFollow}
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
              >
                Following
              </button>
            ) : (
              <button
                onClick={handleFollowUnFollow}
                className="px-4 -y-2 bg-blue-500 rounded-full text-white"
              >
                Follow
              </button>
            )}
          </div>

          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>

      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;
