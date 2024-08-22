import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";

export const Footer: FC = memo(() => {
  return (
    <UI.Flex position="absolute" bottom="0" w="100%" justifyContent="center" alignItems="center" fontSize="13px">
      <UI.Text as="i" color="gray">
        © 2024 Kei-dev-1213. All rights reserved.
      </UI.Text>
    </UI.Flex>
  );
});
