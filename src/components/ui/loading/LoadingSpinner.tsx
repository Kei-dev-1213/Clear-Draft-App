import { Spinner } from "@chakra-ui/react";
import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";

export const LoadingSpinner: FC = memo(() => {
  return (
    <UI.Flex h="100%" alignItems="center">
      <Spinner thickness="4px" speed="0.65s" color="teal.500" size="xl" />
    </UI.Flex>
  );
});
