import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

export const SecondaryButton: FC<{ children: ReactNode; icon: IconType; color: string }> = memo(
  ({ children, icon: Icon, color }) => {
    return (
      <>
        <UI.Button type="submit" px={4} colorScheme={color} display="flex" variant="outline">
          <UI.Box pr={2}>
            <Icon size={20} />
          </UI.Box>
          {children}
        </UI.Button>
      </>
    );
  }
);
