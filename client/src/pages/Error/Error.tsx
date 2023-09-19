import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Error = (props: Props) => {
  return (
    <div className="text-center my-8 space-y-5">
      <div className="font-bold text-4xl">Error, page not found</div>
      <p className="pb-5">Please go back to login</p>
      <Link
        to="/signin"
        className="bg-blue-500 px-4 py-2 rounded-full text-white"
      >
        Login
      </Link>
    </div>
  );
};

export default Error;
