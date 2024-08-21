import { FC } from "react";
import { Header } from "../../components/ui/header/Header";
import { ContentCenterWrapper } from "../../components/ui/container/ContentCenterWrapper";
import { Text } from "@chakra-ui/react";

export const Page404: FC = () => {
  return (
    <>
      <Header />
      <ContentCenterWrapper w="1000px">
        <Text letterSpacing={1} fontSize={20}>
          SORRY,
          <br />
          we couldn't find that page.
        </Text>
      </ContentCenterWrapper>
    </>
  );
};
