import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search,logout } from "../store/userSlice";
const Userlayout = () => {
  const { isAuthenticated, user } = useSelector((store) => store.user);
  const [input, setInput] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);

  const dispatch = useDispatch();

  if (!isAuthenticated && !user?.token) {
    return <Navigate to={`/signup`} />;
  }

  const searchClick = () => {
    dispatch(search(input));
  };


  
  const handlelogout =()=>{
    dispatch(logout())
    setLoggedOut(true)
  }



  return (
    <div className="bg-slate-600 px-5 flex flex-col gap-3 h-screen w-screen">
      <div className="bg-slate-500 text-white flex justify-between rounded-lg px-3 mt-2 py-2">
        <div className="">
          <input
            type="text"
            placeholder="City"
            className="px-2 rounded-lg text-black"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="ml-2" onClick={searchClick}>Search</button>
        </div>
        <div className=""> {user?.user?.name} </div>
        <button onClick={handlelogout}>Logout</button>
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Userlayout;
