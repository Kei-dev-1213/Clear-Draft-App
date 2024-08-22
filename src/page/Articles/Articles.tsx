import { FC, memo } from "react";
import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { CONSTANT } from "../../constant";
import * as UI from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { SecondaryButton } from "../../components/ui/parts/SecondaryButton";

export const Articles: FC = memo(() => {
  return (
    <>
      <ContentWrapper w={CONSTANT.CONTENT_WIDTH}>
        <UI.Box w="100%" h="80%">
          <UI.FormControl display="flex" justifyContent="end" alignItems="center">
            <UI.Switch id="draft-only" colorScheme="red" mr={3} />
            <UI.FormLabel htmlFor="draft-only" mb="0" fontSize={14}>
              未投稿の下書きのみ表示
            </UI.FormLabel>
          </UI.FormControl>
          <UI.TableContainer h="100%" mt={2} overflowY="auto">
            <UI.Table variant="simple">
              <UI.Thead>
                <UI.Tr>
                  <UI.Th w="80%" textAlign="center" fontSize={14}>
                    記事
                  </UI.Th>
                  <UI.Th w="20%" textAlign="center" fontSize={14}>
                    更新日時
                  </UI.Th>
                </UI.Tr>
              </UI.Thead>
              <UI.Tbody>
                <UI.Tr>
                  <UI.Td>
                    <UI.Box position="relative" h="100px" display="flex" flexDirection="column" justifyContent="center">
                      <UI.Text as="h2" fontWeight="600">
                        もはやググる必要なし！？オススメ次世代AI「perplexity」のご紹介！
                      </UI.Text>
                      <UI.UnorderedList display="flex" styleType="none" m={0} mt={4} gap={3}>
                        {["おすすめ", "生成AI", "tips", "perplexity"].map((tag, index) => (
                          <UI.ListItem
                            key={`${tag}-${index}`}
                            fontSize={15}
                            bg="gray.700"
                            color="#fff"
                            px={3}
                            py={1}
                            borderRadius={6}
                          >
                            {tag}
                          </UI.ListItem>
                        ))}
                      </UI.UnorderedList>
                      <UI.Box display="flex" gap={3} position="absolute" bottom={0} right={0}>
                        <SecondaryButton icon={FaEdit} color="green">
                          編集
                        </SecondaryButton>
                        <SecondaryButton icon={FaRegTrashAlt} color="red">
                          削除
                        </SecondaryButton>
                      </UI.Box>
                    </UI.Box>
                  </UI.Td>
                  <UI.Td>2024/08/01 10:10</UI.Td>
                </UI.Tr>
              </UI.Tbody>
            </UI.Table>
          </UI.TableContainer>
        </UI.Box>
      </ContentWrapper>
    </>
  );
});
