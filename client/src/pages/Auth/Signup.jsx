import React, { useEffect, useRef, useState } from "react";
import { checkValidData } from "../../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import { login, SignUp } from "../../store/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "abasd",
  });


  const { error, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSubmit = () => {
    const message = checkValidData(input.email, input.password);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      dispatch(SignUp(input)).then((res) =>
        console.log("response in signup page", res.payload)
      );
    } else {
      dispatch(login(input)).then((res) =>
        console.log("response in login page", res.payload)
      );
    }
  };


  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black  mx-auto right-0 left-0 text-white bg-opacity-90"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            value={input.name}
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-md"
          />
        )}
        <input
          value={input.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <input
          value={input.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-md"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          onClick={handleSubmit}
          className="p-4 my-6 bg-red-700 w-full rounded-md"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          onClick={toggleSignInForm}
          className="py-6 cursor-pointer text-gray-600"
        >
          New to Netflix?{" "}
          <span className="text-white">
            {isSignInForm ? "Signup Now" : "Sign In"}
          </span>
        </p>
        
      </form>
    </div>
  );
};

export default Signup;
