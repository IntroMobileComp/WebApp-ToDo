import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./SignIn";
import ToDo from './ToDo';
import Credit from "./Credit";
import SignOut from "./SignOut";

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
    path: "/",
    element: <SignOut />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
