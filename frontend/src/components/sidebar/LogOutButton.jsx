import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";

const LogOutButton = () => {
  const { loading, logout } = useLogOut();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogOutButton;

// STARTER CODE FOR THIS FILE
// import React from "react";
// import { BiLogOut } from "react-icons/bi";

// const LogOutButton = () => {
//   return (
//     <div className="mt-auto">
//       <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
//     </div>
//   );
// };

// export default LogOutButton;
