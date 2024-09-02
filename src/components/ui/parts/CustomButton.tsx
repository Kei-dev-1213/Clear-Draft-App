import { FC, memo, ReactNode } from "react";
import * as UI from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type Props = {
  dataTestid?: string;
  children: ReactNode;
  icon: IconType;
  color: string;
  onClick?: () => void;
  isLoading?: boolean;
};

export const CustomButton: FC<Props> = memo(({ dataTestid, children, icon: Icon, color, onClick, isLoading }) => {
  return (
    <>
      <UI.Button
        type="submit"
        data-testid={dataTestid}
        px={4}
        colorScheme={color}
        display="flex"
        variant="outline"
        onClick={onClick}
        isLoading={isLoading}
      >
        <UI.Box pr={2}>
          <Icon size={20} />
        </UI.Box>
        {children}
      </UI.Button>
    </>
  );
});
