import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Authlayout from "./layout/authLayout";

import Signup from "./pages/Auth/Signup";
import Userlayout from "./layout/userLayout";
import Dashboard from "./pages/protected/dashboard";
import { useDispatch } from "react-redux";
import { checkAuthorization } from "./store/userSlice";
import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Userlayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/" element={<Authlayout />}>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Signup />} />
      </Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthorization());
  }, []);

  return (
    <>
      <ToastContainer
        style={{ width: "auto", minWidth: "340px", maxWidth: "450px" }}
        position={"bottom-right"}
        bodyStyle={{ color: "#756f86" }}
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
