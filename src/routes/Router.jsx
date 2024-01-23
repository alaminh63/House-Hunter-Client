import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Registration from "../Pages/Authentication/Registration/Registration";
import Home from "../Pages/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default Router;
