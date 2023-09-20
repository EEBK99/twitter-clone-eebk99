import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import formatDistance from "date-fns/formatDistance";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface TweetProps {
  tweet: any;
  setData: Dispatch<SetStateAction<any[]>>;
}

const Tweet: FC<TweetProps> = ({ tweet, setData }): JSX.Element => {
  const [userData, setUserData] = useState<any>();

  const { currentUser } = useSelector((state: any) => state.user);

  const location = useLocation().pathname;
  const { id } = useParams();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet?.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const like = await axios.put(`/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {}
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src=""></img> */}
            <Link to={`/profile/${userData?._id}`}>
              <h3>{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>

          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer" />
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
            )}
            {tweet.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;
