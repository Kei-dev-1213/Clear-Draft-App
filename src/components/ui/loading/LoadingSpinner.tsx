import { Spinner } from "@chakra-ui/react";
import { FC, memo } from "react";

export const LoadingSpinner: FC = memo(() => {
  return <Spinner thickness="4px" speed="0.65s" color="teal.500" size="xl" />;
});
