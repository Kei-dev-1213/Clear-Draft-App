import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";

import { Util } from "../../../util";
import { ArticleType } from "../../../domain/article";
import { ArticleRowContent } from "./ArticleRowContent";

type Props = {
  articles: Array<ArticleType>;
  onOpenDeleteModal: (id: string) => void;
  draftOnly: boolean;
};

export const ArticleTable: FC<Props> = memo(({ articles, onOpenDeleteModal, draftOnly }) => {
  return (
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
            .filter(({ posted }) => (draftOnly ? !posted === draftOnly : true))
            .map((article) => (
              <UI.Tr key={article.id}>
                <UI.Td>
                  <ArticleRowContent article={article} onOpenDeleteModal={onOpenDeleteModal} />
                </UI.Td>
                <UI.Td>{Util.formatDate(article.updated_at)}</UI.Td>
              </UI.Tr>
            ))}
        </UI.Tbody>
      </UI.Table>
    </UI.TableContainer>
  );
});
