import { checkValidData } from "../utils/DataValidation";
import Header from "./Headers";
import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const inputClass =
  "w-full p-3 md:p-4 bg-gray-700/80 text-white rounded-md outline-none border border-gray-500 focus:border-white";

const getFriendlyError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try signing in.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.user);

  const formRef = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = async (e) => {
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
    if (message) return;

    setLoading(true);

    try {
      const emailValue = email.current.value.trim();
      const passwordValue = password.current.value;

      if (!isSignInForm) {
        // Sign Up
        const { user: newUser } = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue,
        );
        await updateProfile(newUser, {
          displayName: name.current.value.trim(),
        });

        // verification link bhejo, aur verify hone tak login mat hone do
        await sendEmailVerification(newUser);
        await signOut(auth);

        formRef.current.reset();
        setIsSignInForm(true);
        setSuccessMessage(
          "Account created! We sent a verification link to your email. Verify it, then sign in. Check your spam folder too."
        );
      } else {
        // Sign In
        const { user: signedUser } = await signInWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue,
        );

        if (!signedUser.emailVerified) {
          await signOut(auth);
          setErrorMessage(
            "Please verify your email first. Check your inbox (and spam) for the verification link."
          );
        }
        // verified hai to Header ka listener redirect kar dega
      }
    } catch (error) {
      setErrorMessage(getFriendlyError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const toggleIsSignInForm = () => {
    setIsSignInForm((prev) => !prev);
    setErrorMessage(null);
    setSuccessMessage(null);
    formRef.current.reset();
  };

  // logged-in (verified) user ko login page par ruke nahi dena
  if (user) return <Navigate to="/browse" replace />;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Header />

      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative flex justify-center items-center min-h-[460px] h-auto py-8 mt-24 md:mt-20 mb-10 mx-auto bg-black/80 w-[92%] max-w-md rounded-lg">
        <form
          ref={formRef}
          onSubmit={handleButtonClick}
          className="w-[88%] md:w-4/5 flex flex-col gap-4 md:gap-5 overflow-hidden"
        >
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Enter your Name"
              autoComplete="name"
              className={inputClass}
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Enter your Email"
            autoComplete="email"
            className={inputClass}
          />

          <input
            ref={password}
            type="password"
            placeholder="Enter your password"
            autoComplete={isSignInForm ? "current-password" : "new-password"}
            className={inputClass}
          />

          {!isSignInForm && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              className={inputClass}
            />
          )}

          {errorMessage && (
            <p className="text-red-400 text-xs md:text-sm bg-red-500/10 border border-red-500/30 rounded px-2 py-1">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="text-green-400 text-xs md:text-sm bg-green-500/10 border border-green-500/30 rounded px-2 py-1">
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

          <button
            type="button"
            onClick={toggleIsSignInForm}
            className="text-gray-400 text-sm text-center"
          >
            {isSignInForm ? "New to Netflix? " : "Already registered? "}
            <span className="text-white font-semibold">
              {isSignInForm ? "Sign Up" : "Sign In"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;