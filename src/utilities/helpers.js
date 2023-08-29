import moment from "moment";

// export const getLoggedInUserName = (user) => {
//   console.log(user, "from loggedin user name");
//   if (user && user.userType === "donor") {
//     return user.name;
//   } else if (user && user.userType === "hospital") {
//     return user.hospitalName;
//   } else if (user && user.userType === "organization") {
//     return user.organizationName;
//   }
// };

export const getLoggedInUserName = (user) => {
  console.log(user, "from getLoggedInUserName");

  if (!user) {
    console.log("User is not available");
    return "Guest";
  }

  console.log("User userType:", user.userType);

  if (user.userType === "donor") {
    console.log("Returning donor's name:", user.name);
    return user.name;
  } else if (user.userType === "hospital") {
    console.log("Returning hospital name:", user.hospitalName);
    return user.hospitalName;
  } else if (user.userType === "organization") {
    console.log("Returning organization name:", user.organizationName);
    return user.organizationName; // Use user.name for organization users
  } else {
    console.log("Unknown userType:", user.userType);
    return "Unknown User Type";
  }
};

export const getAntdInputValidation = () => {
  return [
    {
      required: true,
      message: "Required",
    },
  ];
};

export const getDateFormat = (date) => {
  return moment(date).format("DDD MMM YYYY hh:mm A");
};
