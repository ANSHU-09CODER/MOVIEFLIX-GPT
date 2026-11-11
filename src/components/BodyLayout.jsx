import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Browse from "./Browse";
import Login from "./LoginPage";
import MovieDetails from "./MovieDetails";
import GptSearch from "./GptSearch";

// router component ke bahar banao, taaki har render par dobara na bane
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/movie/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/search",
    element: <GptSearch />,
  },
  {
    // koi bhi galat URL (jaise /abc) bhi login par bhej do
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;