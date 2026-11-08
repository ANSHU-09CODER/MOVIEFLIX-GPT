import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./LoginPage";
import MovieDetails from "./MovieDetails";


const Body = () => {
  const appRouter = createBrowserRouter([
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

  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
