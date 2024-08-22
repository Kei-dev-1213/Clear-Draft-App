import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { CONSTANT } from "../../../constant";

export const ContentWrapper: FC<{ children: ReactNode; w: string; align?: string; pt?: string }> = memo(
  ({ children, w, align, pt }) => {
    return (
      <UI.Flex
        m="auto"
        h={`calc(100vh - ${CONSTANT.HEADER_HEIGHT})`}
        w={w}
        justifyContent="center"
        alignItems={align ?? ""}
        pt={pt ?? ""}
      >
        {children}
      </UI.Flex>
    );
  }
);
