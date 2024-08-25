import { HeaderOnlyLayoutWrapper } from "../components/layout/HeaderOnlyLayoutWrapper";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";
import { Article } from "../page/Article/Article";
import { Articles } from "../page/Articles/Articles";
import { Page404 } from "../page/Page404/Page404";
import { Settings } from "../page/Settings/Settings";

export const routes = [
  {
    path: "/settings",
    element: (
      <LayoutWrapper>
        <Settings />
      </LayoutWrapper>
    ),
  },
  {
    path: "/articles",
    element: (
      <LayoutWrapper>
        <Articles />
      </LayoutWrapper>
    ),
  },
  {
    path: "/article/:id",
    element: (
      <HeaderOnlyLayoutWrapper>
        <Article />
      </HeaderOnlyLayoutWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <LayoutWrapper>
        <Page404 />
      </LayoutWrapper>
    ),
  },
];
