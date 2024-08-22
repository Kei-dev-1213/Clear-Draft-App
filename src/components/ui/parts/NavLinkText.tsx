import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";

export const NavLinkText: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <UI.Text as="i" px={2} py={1} _hover={{ color: "#fff", bg: "#000" }} transition="all 0.3s ease">
      {children}
    </UI.Text>
  );
});
