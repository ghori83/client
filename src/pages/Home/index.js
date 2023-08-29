import React from "react";
import { useSelector } from "react-redux";
import { getLoggedInUserName } from "../../utilities/helpers";
import { GetCurrentUser } from "../../apicalls/users";

const Home = () => {
  const currentUser = useSelector((state) => state.users);

  return (
    <div>
      <h1>This is homepage</h1>
      {/* {getLoggedInUserName(currentUser&&currentUser.currentUser)} */}
    </div>
  );
};

export default Home;
