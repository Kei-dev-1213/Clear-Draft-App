import { Article } from "../page/Article/Article";
import { Articles } from "../page/Articles/Articles";
import { Page404 } from "../page/Page404/Page404";
import { Settings } from "../page/Settings/Settings";

export const routes = [
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/article/:id",
    element: <Article />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];
