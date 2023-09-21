import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import TimelineTweets from "../TimelineTweets/TimelineTweets";

type Props = {};

const MainTweet = (props: Props) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [tweetText, setTweetText] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const submitTweet = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_URL}/tweets`,
        {
          userId: currentUser._id,
          description: tweetText,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}
      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <TimelineTweets />
    </div>
  );
};

export default MainTweet;
