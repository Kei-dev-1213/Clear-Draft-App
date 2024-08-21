import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";

export const ContentWrapper: FC<{ children: ReactNode }> = memo(({ children }) => {
  return (
    <UI.Box w="1000px" m="auto">
      {children}
    </UI.Box>
  );
});
