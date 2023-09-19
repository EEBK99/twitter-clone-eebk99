import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="px-6">
        <LeftSidebar />
      </div>
    </div>
  );
};

export default Home;
