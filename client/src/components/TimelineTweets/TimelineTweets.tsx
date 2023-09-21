import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Tweet from "../Tweet/Tweet";

type Props = {};

const TimelineTweets = (props: Props) => {
  const [timeline, setTimeline] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/tweets/timeline/${currentUser._id}`
        );
        setTimeline(timelineTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {timeline &&
        timeline?.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2 ">
              <Tweet tweet={tweet} setData={setTimeline} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweets;
