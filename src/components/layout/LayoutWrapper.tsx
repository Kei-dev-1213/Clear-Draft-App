import { FC, memo, ReactNode } from "react";
import { Footer } from "../ui/footer/Footer";
import { Header } from "../ui/header/Header";

export const LayoutWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
});
