import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Tweet from "../Tweet/Tweet";

type Props = {};

const ExploreTweets = (props: Props) => {
  const [explore, setExplore] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweets = await axios.get("/tweets/explore");
        setExplore(exploreTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
