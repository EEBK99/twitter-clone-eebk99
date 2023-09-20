import axios from "axios";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";

import { useParams } from "react-router-dom";

interface UserPlaceholderProps {
  setUserData: Dispatch<SetStateAction<string>>;
  userData: any;
}

const UserPlaceholder: FC<UserPlaceholderProps> = ({
  setUserData,
  userData,
}) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(`/users/find/${id}`);
        setUserData(userProfile.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
