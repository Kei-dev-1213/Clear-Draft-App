import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import * as UI from "@chakra-ui/react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FocusableElement } from "@chakra-ui/utils";
import { GiArchiveRegister } from "react-icons/gi";

import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { CONSTANT } from "../../constant";
import { SecondaryButton } from "../../components/ui/parts/SecondaryButton";
import { DB } from "../../supabase";
import { ArticleType } from "../../domain/Article";
import { Util } from "../../util";
import { useMessage } from "../../hooks/useMessage";
import { LoadingSpinner } from "../../components/ui/loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export const Articles: FC = memo(() => {
  // state
  const [articles, setArticles] = useState([] as Array<ArticleType>);
  const [draftOnly, setDraftOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState("");

  // hooks
  const { displayMessage } = useMessage();
  const deleteModal = UI.useDisclosure();
  const cancelRef = useRef<FocusableElement | null>(null);
  const navigate = useNavigate();

  // 初期処理
  useEffect(() => {
    (async () => {
      await fetchAllArticles();
      setLoading(false);
    })();
  }, []);

  // functions
  // fetch
  const fetchAllArticles = async () => {
    setArticles(await DB.fetchAllArticles());
  };

  // delete
  const onOpenDeleteModal = useCallback((id: string) => {
    setSelectedArticleId(id);
    deleteModal.onOpen();
  }, []);
  const deleteArticle = useCallback(async () => {
    deleteModal.onClose();
    setLoading(true);
    await DB.deleteArticle(selectedArticleId);
    await fetchAllArticles();
    setLoading(false);
    displayMessage({ title: "記事の削除が完了しました", status: "error" });
  }, [selectedArticleId]);

  return (
    <>
      <ContentWrapper w={CONSTANT.CONTENT_WIDTH} pt="8">
        {loading ? (
          <UI.Flex h={`calc(100vh - ${CONSTANT.HEADER_HEIGHT})`} alignItems="center">
            <LoadingSpinner />
          </UI.Flex>
        ) : (
          <UI.Box w="100%" h="80%">
            <UI.Box display="flex" justifyContent="flex-end" mb={4}>
              <SecondaryButton icon={GiArchiveRegister} color="blue" onClick={() => navigate("/article/0")}>
                新規登録
              </SecondaryButton>
            </UI.Box>
            <UI.FormControl display="flex" justifyContent="end" alignItems="center">
              <UI.Switch
                id="draft-only"
                colorScheme="red"
                mr={3}
                isChecked={draftOnly}
                onChange={() => setDraftOnly(!draftOnly)}
              />
              <UI.FormLabel htmlFor="draft-only" mb="0" fontSize={14}>
                未投稿の下書きのみ表示
              </UI.FormLabel>
            </UI.FormControl>
            <UI.TableContainer
              h="100%"
              mt={2}
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
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
                  {articles
                    .filter(({ posted }) => (draftOnly ? posted === draftOnly : true))
                    .map(({ id, title, tag, updated_at }) => (
                      <UI.Tr key={id}>
                        <UI.Td>
                          <UI.Box
                            position="relative"
                            h="100px"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                          >
                            <UI.Text as="h2" fontWeight="600" mb={4}>
                              {title}
                            </UI.Text>
                            <UI.UnorderedList display="flex" styleType="none" m={0} mt={4} gap={3}>
                              {tag.split(" ").map((tag, index) => (
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
                              <SecondaryButton icon={FaEdit} color="green" onClick={() => navigate(`/article/${id}`)}>
                                編集
                              </SecondaryButton>
                              <SecondaryButton icon={FaRegTrashAlt} color="red" onClick={() => onOpenDeleteModal(id)}>
                                削除
                              </SecondaryButton>
                            </UI.Box>
                          </UI.Box>
                        </UI.Td>
                        <UI.Td>{Util.formatDate(updated_at)}</UI.Td>
                      </UI.Tr>
                    ))}
                </UI.Tbody>
              </UI.Table>
            </UI.TableContainer>
          </UI.Box>
        )}
      </ContentWrapper>

      <UI.AlertDialog isOpen={deleteModal.isOpen} leastDestructiveRef={cancelRef} onClose={deleteModal.onClose}>
        <UI.AlertDialogOverlay>
          <UI.AlertDialogContent>
            <UI.AlertDialogHeader fontSize="lg" fontWeight="bold">
              記事削除
            </UI.AlertDialogHeader>

            <UI.AlertDialogBody>選択した記事を削除します。よろしいですか？</UI.AlertDialogBody>

            <UI.AlertDialogFooter>
              <UI.Button colorScheme="red" onClick={deleteArticle} mr={3}>
                削除
              </UI.Button>
              <UI.Button onClick={deleteModal.onClose}>Cancel</UI.Button>
            </UI.AlertDialogFooter>
          </UI.AlertDialogContent>
        </UI.AlertDialogOverlay>
      </UI.AlertDialog>
    </>
  );
});
