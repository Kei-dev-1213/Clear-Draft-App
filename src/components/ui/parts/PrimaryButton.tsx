import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

export const PrimaryButton: FC<{ children: ReactNode; icon: IconType }> = memo(({ children, icon: Icon }) => {
  return (
    <>
      <UI.Button type="submit" px={6} colorScheme="gray" display="flex">
        <UI.Box pr={2}>
          <Icon size={30} />
        </UI.Box>
        {children}
      </UI.Button>
    </>
  );
});
