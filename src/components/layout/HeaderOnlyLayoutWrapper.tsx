import { FC, memo, ReactNode } from "react";
import { Header } from "../ui/header/Header";

export const HeaderOnlyLayoutWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
});
