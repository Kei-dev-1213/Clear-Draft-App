import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { CONSTANT } from "../../../constant";

type Props = {
  children: ReactNode;
  h?: string;
  w: string;
  align?: string;
  pt?: string;
};

export const ContentWrapper: FC<Props> = memo(({ children, h, w, align, pt }) => {
  return (
    <UI.Flex
      m="auto"
      h={h ? h : CONSTANT.CONTENT_HEIGHT}
      w={w}
      justifyContent="center"
      alignItems={align ?? ""}
      pt={pt ?? ""}
    >
      {children}
    </UI.Flex>
  );
});
