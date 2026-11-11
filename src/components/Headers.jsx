import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { removeUser, addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
      const { uid, email, displayName } = user;
      dispatch(addUser({ uid, email, displayName }));
      if (location.pathname === "/login") navigate("/browse");
    } else {
      dispatch(removeUser());
      navigate("/login");
    }
  });

  return () => unsubscribe();
}, [dispatch, navigate, location.pathname]);
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const onSearchPage = location.pathname === "/search";

  return (
  <div className="absolute top-0 left-0 w-full px-4 sm:px-8 md:px-16 py-3 md:py-6 bg-gradient-to-b from-black/90 to-transparent z-30 flex justify-between items-center">
    <Link to={user ? "/browse" : "/login"}>
      <img
        className="w-24 sm:w-28 md:w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAchJje9GUBJ_ehbO0uOApH8QmRyuvK0LQI9obzFeGtfkpfLyh4FdolMZR4PtvyNoOomDcY7BzTbhFC3gJinH0UadYBg807AKDSPyfsUDm9T3CZKn9OSZN3II7060MZESFcb6YOS9jvzh.svg"
        alt="Logo"
      />
    </Link>

    {user && (
      <div className="flex items-center gap-2 md:gap-4">
        {onSearchPage ? (
          <Link
            to="/browse"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md border border-white/30 transition duration-200"
          >
            Home
          </Link>
        ) : (
          <Link
            to="/search"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md border border-white/30 transition duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>
        )}

        <span className="text-white text-sm hidden md:block">
          {user.displayName}
        </span>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md transition duration-200"
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
);
};

export default Header;