import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Browse from './Browse';
import Login from './LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { removeUser,addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react';
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
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = auth.currentUser
                dispatch(
                    addUser(
                        {
                            uid: uid,
                            email: email,
                            displayName: displayName,
                        }
                    )
                );
            }
            else {
                dispatch(removeUser());
            }
        })
    }, []);
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};
export default Body;