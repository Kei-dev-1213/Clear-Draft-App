import { FC, memo } from "react";
import { Header } from "../../components/ui/header/Header";
import * as UI from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { CONSTANT } from "../../constant";
import { Footer } from "../../components/ui/footer/Footer";

export const Settings: FC = memo(() => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <UI.Flex
          h={`calc(100vh - ${CONSTANT.HEADER_HEIGHT})`}
          w="100%"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <UI.InputGroup>
            <UI.InputLeftAddon bg="gray.100" border="none">
              <FaLock />
            </UI.InputLeftAddon>
            <UI.Input variant="flushed" placeholder="Qiita APIのキーを入力してください" px={2} />
          </UI.InputGroup>
          <UI.Button px={8} colorScheme="gray">
            登録
          </UI.Button>
        </UI.Flex>
      </ContentWrapper>
      <Footer />
    </>
  );
});
