import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { CONSTANT } from "../../../constant";

export const Footer: FC = memo(() => {
  return (
    <UI.Flex
      w="100%"
      justifyContent="center"
      alignItems="center"
      fontSize="13px"
      height={CONSTANT.FOOTER_HEIGHT}
    >
      <UI.Text as="i" color="gray">
        © 2024 Kei-dev-1213. All rights reserved.
      </UI.Text>
    </UI.Flex>
  );
});
