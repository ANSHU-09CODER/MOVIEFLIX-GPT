import { checkValidData } from "../utils/DataValidation";
import Header from "./Headers";
import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { render } from "@testing-library/react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const inputClass =
  "w-full p-4 bg-gray-700/80 text-white rounded-md outline-none border border-gray-500 focus:border-white";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setSuccessMessage(null);

    const message = checkValidData(
      isSignInForm ? null : name.current.value,
      email.current.value,
      password.current.value,
      isSignInForm ? null : confirmPassword.current.value,
      isSignInForm,
    );

    setErrorMessage(message);
    if (message) return; // validation fail: form ko clear nahi karte, user theek kar sake

    setLoading(true);

    if (!isSignInForm) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value.trim(),
        password.current.value,
      )
        .then((userCredential) =>
          updateProfile(userCredential.user, {
            displayName: name.current.value.trim(),
          }),
        )
        .then(() => {
          formRef.current.reset(); // form clear
          setSuccessMessage("Account created successfully!");
          const {uid,email,displayName} =auth.currentUser
          dispatch(
            addUser(
              {
                uid:uid,
                email:email,
                displayName:displayName,
              }
            )
          );
          navigate("/browse")

        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        })
        .finally(() => setLoading(false));
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value.trim(),
        password.current.value,
      )
        .then(() => {
          formRef.current.reset(); // form clear
          // Yahan navigate("/browse") kar sakte ho
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const toggleIsSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
    setSuccessMessage(null);
    formRef.current.reset(); // form badalte waqt purani values hata do
  };

  return (
    <div>
      <Header />

      <div className="absolute inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg"
          alt=""
        />
      </div>

      <div className="relative flex justify-center items-center min-h-[500px] h-auto py-8 mt-20 mx-auto bg-black/80 w-3/12 rounded-lg">
        <form
          ref={formRef}
          onSubmit={handleButtonClick}
          className="w-4/5 flex flex-col gap-5 overflow-hidden"
        >
          <h1 className="text-white text-3xl font-bold mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Enter your Name"
              className={inputClass}
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Enter your Email"
            className={inputClass}
          />

          <input
            ref={password}
            type="password"
            placeholder="Enter your password"
            className={inputClass}
          />

          {!isSignInForm && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm your password"
              className={inputClass}
            />
          )}

          {errorMessage && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-400 text-xs bg-green-500/10 border border-green-500/30 rounded px-2 py-1">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-md transition duration-200"
          >
            {loading ? "Please wait..." : isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-gray-400 text-sm text-center cursor-pointer"
            onClick={toggleIsSignInForm}
          >
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <span className="text-white font-semibold">
              {isSignInForm ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;