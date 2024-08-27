import { FC, memo, useRef } from "react";
import { FocusableElement } from "@chakra-ui/utils";
import * as UI from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  deleteArticle: () => Promise<void>;
};

export const DeleteDialog: FC<Props> = memo(({ isOpen, onClose, deleteArticle }) => {
  const cancelRef = useRef<FocusableElement | null>(null);

  return (
    <UI.AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} motionPreset="slideInBottom">
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
            <UI.Button onClick={onClose}>キャンセル</UI.Button>
          </UI.AlertDialogFooter>
        </UI.AlertDialogContent>
      </UI.AlertDialogOverlay>
    </UI.AlertDialog>
  );
});
