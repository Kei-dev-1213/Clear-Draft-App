import { FC, memo, useCallback, useEffect, useState } from "react";
import * as UI from "@chakra-ui/react";
import { GiArchiveRegister } from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { CONSTANT } from "../../constant";
import { SecondaryButton } from "../../components/ui/parts/SecondaryButton";
import { DB } from "../../supabase";
import { ArticleType } from "../../domain/Article";
import { useMessage } from "../../hooks/useMessage";
import { LoadingSpinner } from "../../components/ui/loading/LoadingSpinner";
import { DeleteDialog } from "../../components/ui/articles/DeleteDialog";
import { ArticleTable } from "../../components/ui/articles/ArticleTable";

export const Articles: FC = memo(() => {
  // state
  const [articles, setArticles] = useState([] as Array<ArticleType>);
  const [draftOnly, setDraftOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState("");

  // hooks
  const { displayMessage } = useMessage();
  const deleteModal = UI.useDisclosure();
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

            <ArticleTable articles={articles} onOpenDeleteModal={onOpenDeleteModal} draftOnly={draftOnly} />
          </UI.Box>
        )}
      </ContentWrapper>

      <DeleteDialog isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} deleteArticle={deleteArticle} />
    </>
  );
});
