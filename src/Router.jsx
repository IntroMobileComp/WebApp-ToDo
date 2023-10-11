import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import Credit from "./components/Credit";
import SignOut from "./components/SignOut";
import ToDo from './ToDo';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/main",
    element: <ToDo />,
  },
  {
    path: "/credit",
    element: <Credit />,
  },
  {
    path: "/signout",
    element: <SignOut />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
