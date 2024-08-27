import { FC, memo, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlightjs from "highlight.js";
import "easymde/dist/easymde.min.css";
import "highlight.js/styles/github.css";
import * as UI from "@chakra-ui/react";
import { GiArchiveRegister } from "react-icons/gi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaRobot } from "react-icons/fa";

import "./custom-mde.scss";
import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { Footer } from "../../components/ui/footer/Footer";
import { CustomButton } from "../../components/ui/parts/CustomButton";
import { useMessage } from "../../hooks/useMessage";
import { LoadingSpinner } from "../../components/ui/loading/LoadingSpinner";
import { ArticleMDE } from "../../components/ui/article/ArticleMDE";
import { AiAnswerAccordion } from "../../components/ui/article/AiAnswerAccordion";
import { PostModal } from "../../components/ui/article/PostModal";
import { useAPI } from "../../hooks/useAPI";
import { useArticle } from "../../hooks/useArticle";
import { useArticleForm } from "../../hooks/useArticleForm";
import { AIModal } from "../../components/ui/article/AIModal";
import { InquiryOption } from "../../domain/Enum";

// ハイライトの設定
const renderer = new marked.Renderer();
renderer.code = ({ text }: { text: string }) => {
  return highlightjs.highlightAuto(text).value;
};
marked.setOptions({
  renderer,
});

export const Article: FC = memo(() => {
  const { id } = useParams();
  const accordionRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const accordionButtonRef = useRef<HTMLButtonElement>(null);
  // state
  const [isUpdateArticle, setIsUpdateArticle] = useState(false);
  const [prevHtmlContent, setPrevHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { formData, setFormData, handleChange } = useArticleForm({
    id: "",
    title: "",
    tag: "",
    main_text: "",
    ai_answer: "",
    posted: false,
  });

  // hooks
  const { displayMessage } = useMessage();
  const navigate = useNavigate();
  const postModal = UI.useDisclosure();
  const aiModal = UI.useDisclosure();
  const { postToQiita } = useAPI();
  const { fetchArticleFromId, registArticle } = useArticle();

  // 初期処理
  useEffect(() => {
    refreshArticle();
  }, [id]);

  // プレビュー文言のサニタイズ
  useEffect(() => {
    const parseMarkdown = async () => {
      const parsedHtml = await marked(formData.main_text);
      setPrevHtmlContent(DOMPurify.sanitize(parsedHtml));
    };
    parseMarkdown();
  }, [formData.main_text]);

  // functions
  // 画面一番下までスクロール
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 初期表示
  const refreshArticle = async () => {
    // URLパラメータから記事の取得
    if (id !== "0") {
      const article = await fetchArticleFromId(id!);
      if (article) {
        const { title, tag, main_text, ai_answer, posted } = article;
        setFormData({
          id: id!,
          title,
          tag,
          main_text,
          ai_answer,
          posted,
        });
        setIsUpdateArticle(true);
      } else {
        // URLのIdから記事を取得不可
        displayMessage({ title: "URLのIdが不正です。一覧画面を開きます。", status: "error" });
        navigate("/articles");
      }
    }
    setLoading(false);
  };

  // 保存ボタン押下
  const onClickUpdate = async () => {
    // チェック
    if (formData.tag.split(" ").length > 5) {
      displayMessage({ title: "タグは5個以内で入力してください", status: "error" });
      return;
    }

    const newId = await registArticle(isUpdateArticle, formData);
    displayMessage({ title: "保存しました。", status: "success" });
    // 新規登録時のみ開き直す
    newId && navigate(`/article/${newId}`);
  };

  // 投稿ボタン押下
  const onClickPost = async (scope: string) => {
    // チェック
    if (!formData.title || !formData.tag || !formData.main_text) {
      displayMessage({ title: "入力項目は全て必須です。", status: "error" });
      return;
    }
    if (formData.tag.split(" ").length > 5) {
      displayMessage({ title: "タグは5個以内で入力してください", status: "error" });
      return;
    }
    // 正常
    postModal.onClose();
    setLoading(true);
    try {
      // 投稿
      await postToQiita(formData, scope === "private" ? true : false);
    } catch (e) {
      // 失敗
      console.error("Qiitaへの投稿が出来ませんでした。", e);
      displayMessage({ title: "Qiitaへの投稿が出来ませんでした。", status: "error" });
      setLoading(false);
      return;
    }
    // 投稿完了時に保存と画面更新
    const newId = await registArticle(isUpdateArticle, formData);
    await refreshArticle();
    displayMessage({ title: "記事の投稿が完了しました。", status: "success" });
    // 新規登録時のみ開き直す
    newId && navigate(`/article/${newId}`);
  };

  //  リクエストボタン押下
  const onClickRequest = async (inquiryText: string, inquiryOption: InquiryOption) => {
    // チェック
    if (Number(inquiryOption) === InquiryOption.Other && !inquiryText) {
      displayMessage({ title: "問い合わせ内容を入力してください。", status: "error" });
      return;
    }
    if (!formData.title || !formData.main_text) {
      displayMessage({ title: "記事タイトルと本文は必須項目です。", status: "error" });
      return;
    }
    // 正常
    aiModal.onClose();
    // スクロール
    openAiAnswerAccordion();
    scrollToBottom();
  };

  // 生成AIの回答ボタン押下
  const openAiAnswerAccordion = () => accordionButtonRef.current!.click();

  // ページ離脱時の警告
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <ContentWrapper w="80%" pt="3">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <UI.Flex w="100%" flexDirection="column">
            <UI.Flex justifyContent="flex-end" mb={3}>
              <UI.HStack>
                <CustomButton icon={FaRobot} color="blue" onClick={aiModal.onOpen}>
                  生成AIに聞く
                </CustomButton>
                <CustomButton icon={GiArchiveRegister} color="red" onClick={onClickUpdate}>
                  保存する
                </CustomButton>
                <CustomButton icon={MdOutlinePostAdd} color="green" onClick={postModal.onOpen}>
                  投稿する
                </CustomButton>
              </UI.HStack>
            </UI.Flex>
            <UI.Stack mb={2}>
              <UI.Input
                name="title"
                bg="white"
                padding={4}
                placeholder="記事タイトル"
                value={formData.title}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <UI.Input
                name="tag"
                bg="white"
                padding={4}
                placeholder="タグを入力してください。スペース区切りで5つまで入力できます。"
                value={formData.tag}
                onChange={(e) => handleChange(e.target.name, e.target.value.replace("　", " "))}
              />
            </UI.Stack>
            <UI.Flex w="100%" gap={4}>
              <ArticleMDE
                articleMarkdownText={formData.main_text}
                prevHtmlContent={prevHtmlContent}
                handleChange={handleChange}
              />
            </UI.Flex>
            <AiAnswerAccordion
              accordionRef={accordionRef}
              aiAnswerText={formData.ai_answer}
              accordionButtonRef={accordionButtonRef}
            />
            <Footer />
            <div ref={bottomRef} />
          </UI.Flex>
        )}
      </ContentWrapper>

      <PostModal isOpen={postModal.isOpen} onClose={postModal.onClose} onClickPost={onClickPost} />

      <AIModal isOpen={aiModal.isOpen} onClose={aiModal.onClose} onClickRequest={onClickRequest} />
    </>
  );
});
