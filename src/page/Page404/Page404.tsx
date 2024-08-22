import { FC, memo } from "react";
import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { Text } from "@chakra-ui/react";
import { CONSTANT } from "../../constant";

export const Page404: FC = memo(() => {
  return (
    <>
      <ContentWrapper w={CONSTANT.CONTENT_WIDTH}>
        <Text letterSpacing={1} fontSize={20}>
          SORRY,
          <br />
          we couldn't find that page.
        </Text>
      </ContentWrapper>
    </>
  );
});
