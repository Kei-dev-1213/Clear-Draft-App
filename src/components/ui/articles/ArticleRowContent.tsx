import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { SecondaryButton } from "../parts/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { ArticleType } from "../../../domain/Article";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

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
        {title}
      </UI.Text>
      <UI.UnorderedList display="flex" styleType="none" m={0} mt={4} gap={3}>
        {tag.split(" ").map((tag, index) => (
          <UI.ListItem key={`${tag}-${index}`} fontSize={15} bg="gray.700" color="#fff" px={3} py={1} borderRadius={6}>
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
  );
});
