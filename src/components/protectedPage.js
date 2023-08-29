import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { message } from "antd";
import { getLoggedInUserName } from "../utilities/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";

const ProtectedPage = ({ children }) => {
  // const {currentUser} = useSelector(state => state.users)

  const currentUser = useSelector((state) => state.users);
  //  have to check weather its true or upperone
  // const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));

      if (response.success) {
        message.success(response.message);
        console.log(response.data);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));

      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      // navigate('/login')
    }
  }, []);

  return (
    currentUser && (
      <>
        {/* //header */}

        <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
          <div>
            <h1 className="text-2xl"> GHORI BLOOD BANK</h1>
            <span className="text-xs">
              {" "}
              {/* {currentUser &&
                currentUser.currentUser.userType.toUpperCase()}{" "} */}
            </span>
          </div>
          <div className="flex items-center">
            <i className="ri-shield-user-fill"></i>

            <div className="flex flex-col gap-1">
              <span
                className="mr-5 text-md  cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {/* {getLoggedInUserName(currentUser && currentUser.currentUser)} */}
                Current User{" "}
              </span>
            </div>

            <div>
              <i
                className="ri-logout-circle-r-line ml-5 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>
        </div>
        {/* //body */}
        <div className="px-5 py-2">{children}</div>
      </>
    )
  );
};

export default ProtectedPage;
