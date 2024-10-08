import React, { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import { CustomButton } from "../parts/CustomButton";
import { ArticleType } from "../../../domain/articleTypes";

type Props = {
  article: ArticleType;
  onOpenDeleteModal: (id: string) => void;
};

export const ArticleRowContent: FC<Props> = memo(({ article, onOpenDeleteModal }) => {
  const { id, title, tag } = article;
  // hooks
  const navigate = useNavigate();

  return (
    <UI.Box position="relative" h="100px" display="flex" flexDirection="column" justifyContent="center">
      <UI.Text as="h2" fontWeight="600" mb={4}>
        {title ? title : <UI.Text color="gray.600">(タイトル未設定)</UI.Text>}
      </UI.Text>
      <UI.UnorderedList display="flex" styleType="none" m={0} mt={4} gap={3}>
        {tag ? (
          tag.split(" ").map((tag: string, index: number) => (
            <React.Fragment key={`${tag}-${index}`}>
              {tag && (
                <UI.ListItem fontSize={15} bg="gray.700" color="#fff" px={3} py={1} borderRadius={6}>
                  {tag}
                </UI.ListItem>
              )}
            </React.Fragment>
          ))
        ) : (
          <UI.Text color="gray.600">(タグ未設定)</UI.Text>
        )}
      </UI.UnorderedList>
      <UI.Box display="flex" gap={3} position="absolute" bottom={0} right={0}>
        <CustomButton
          dataTestid="edit-article-button"
          icon={FaEdit}
          color="green"
          onClick={() => navigate(`/article/${id}`)}
        >
          編集
        </CustomButton>
        <CustomButton
          dataTestid="delete-article-button"
          icon={FaRegTrashAlt}
          color="red"
          onClick={() => onOpenDeleteModal(id)}
        >
          削除
        </CustomButton>
      </UI.Box>
    </UI.Box>
  );
});
