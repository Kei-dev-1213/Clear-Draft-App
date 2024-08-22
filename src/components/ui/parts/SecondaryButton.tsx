import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type Props = {
  children: ReactNode;
  icon: IconType;
  color: string;
  onClick: () => void;
};

export const SecondaryButton: FC<Props> = memo(({ children, icon: Icon, color, onClick }) => {
  return (
    <>
      <UI.Button type="submit" px={4} colorScheme={color} display="flex" variant="outline" onClick={onClick}>
        <UI.Box pr={2}>
          <Icon size={20} />
        </UI.Box>
        {children}
      </UI.Button>
    </>
  );
});
