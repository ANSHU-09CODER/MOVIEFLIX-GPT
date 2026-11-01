import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './Browse';
import Login from './LoginPage';
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        }
    ]);
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};
export default Body;