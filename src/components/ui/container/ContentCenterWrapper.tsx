import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { CONSTANT } from "../../../constant";

export const ContentCenterWrapper: FC<{ children: ReactNode; w: string }> = memo(({ children, w }) => {
  return (
    <UI.Flex
      m="auto"
      h={`calc(100vh - ${CONSTANT.HEADER_HEIGHT})`}
      w={w}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </UI.Flex>
  );
});
