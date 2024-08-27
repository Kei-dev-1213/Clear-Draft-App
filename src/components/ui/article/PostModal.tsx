import { FC, memo, useEffect, useState } from "react";
import * as UI from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickPost: (scope: string) => Promise<void>;
};

export const PostModal: FC<Props> = memo(({ isOpen, onClose, onClickPost }) => {
  // state
  const [scope, setScope] = useState("public");

  // 初期処理
  useEffect(() => {
    if (isOpen) {
      setScope("public");
    }
  }, [isOpen]);

  return (
    <UI.Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>Qiitaへの投稿</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody pb={6}>
          <UI.FormControl mb={5}>
            <UI.FormLabel>公開範囲</UI.FormLabel>
            <UI.Select value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="public">全体に公開</option>
              <option value="private">限定共有</option>
            </UI.Select>
          </UI.FormControl>
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Button colorScheme="teal" mr={3} onClick={() => onClickPost(scope)}>
            投稿する
          </UI.Button>
          <UI.Button onClick={onClose}>キャンセル</UI.Button>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
});