import { FC, memo, useEffect, useState } from "react";
import * as UI from "@chakra-ui/react";
import { InquiryOption } from "../../../domain/enumTypes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickRequest: (inquiryText: string, inquiryOption: InquiryOption) => Promise<void>;
};

export const AIModal: FC<Props> = memo(({ isOpen, onClose, onClickRequest }) => {
  // state
  const [option, setOption] = useState<InquiryOption>(InquiryOption.GetAdvice);
  const [inquiryText, setInquiryText] = useState("");

  // 初期処理
  useEffect(() => {
    if (isOpen) {
      setOption(InquiryOption.GetAdvice);
      setInquiryText("");
    }
  }, [isOpen]);

  return (
    <UI.Modal size="xl" isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <UI.ModalOverlay />
      <UI.ModalContent>
        <UI.ModalHeader>生成AIへの問い合わせ</UI.ModalHeader>
        <UI.ModalCloseButton />
        <UI.ModalBody pb={6}>
          <UI.FormControl mb={5}>
            <UI.FormLabel>問い合わせ内容</UI.FormLabel>
            <UI.Select value={option} onChange={(e) => setOption(Number(e.target.value))}>
              <option value={InquiryOption.GetAdvice}>記事のアドバイスを求める</option>
              <option value={InquiryOption.Other}>その他問い合わせ</option>
            </UI.Select>
          </UI.FormControl>
          {option === InquiryOption.Other && (
            <UI.FormControl mb={5}>
              <UI.FormLabel>問い合わせ内容</UI.FormLabel>
              <UI.Textarea
                h="200px"
                placeholder="生成AIへの問い合わせ内容を入力してください"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
              />
            </UI.FormControl>
          )}
        </UI.ModalBody>

        <UI.ModalFooter>
          <UI.Button colorScheme="blue" mr={3} onClick={() => onClickRequest(inquiryText, option)}>
            送信する
          </UI.Button>
          <UI.Button onClick={onClose}>キャンセル</UI.Button>
        </UI.ModalFooter>
      </UI.ModalContent>
    </UI.Modal>
  );
});
