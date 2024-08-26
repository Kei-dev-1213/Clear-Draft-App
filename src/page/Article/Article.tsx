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
import { DB } from "../../supabase";
import { useMessage } from "../../hooks/useMessage";
import { LoadingSpinner } from "../../components/ui/loading/LoadingSpinner";
import { ArticleMDE } from "../../components/ui/article/ArticleMDE";
import { AiAnswerAccordion } from "../../components/ui/article/AiAnswerAccordion";
import { ArticleType } from "../../domain/Article";
import { PostModal } from "../../components/ui/article/PostModal";
import { useAPI } from "../../hooks/useAPI";
import { Util } from "../../util";

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
  // state
  const [prevHtmlContent, setPrevHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTag, setArticleTag] = useState("");
  const [articleMarkdownText, setArticleMarkdownText] = useState("");
  const [aiAnswerText, setAiAnswerText] = useState("");
  const formData = {
    id,
    title: articleTitle,
    tag: articleTag,
    main_text: articleMarkdownText,
    ai_answer: aiAnswerText,
  } as ArticleType;

  // hooks
  const { displayMessage } = useMessage();
  const navigate = useNavigate();
  const postModal = UI.useDisclosure();
  const { postToQiita } = useAPI();

  // 初期処理
  useEffect(() => {
    refreshArticle();
  }, []);

  // articleMarkdownTextの変更
  useEffect(() => {
    const parseMarkdown = async () => {
      const parsedHtml = await marked(articleMarkdownText);
      setPrevHtmlContent(DOMPurify.sanitize(parsedHtml));
    };
    parseMarkdown();
  }, [articleMarkdownText]);

  // functions
  // const scrollToBottom = () => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // 初期表示
  const refreshArticle = async () => {
    // URLパラメータから記事の取得
    if (id !== "0") {
      const article = await DB.fetchArticleFromId(id!);
      if (article) {
        setArticleTitle(article.title);
        setArticleTag(article.tag);
        setArticleMarkdownText(article.main_text);
        setAiAnswerText(article.ai_answer);
      } else {
        displayMessage({ title: "URLのIdが不正です。一覧画面を開きます。", status: "error" });
        navigate("/articles");
      }
    }
    setLoading(false);
  };

  // 保存
  const onClickUpdate = async () => {
    setLoading(true);
    await updateArticle(false);
    setLoading(false);
    displayMessage({ title: "保存しました。", status: "success" });
  };

  // 記事の保存処理
  const updateArticle = async (posted: boolean) => {
    const { id, title, tag, main_text, ai_answer } = formData;
    const newArticle = {
      id,
      title,
      tag,
      main_text,
      ai_answer,
      posted,
    };
    await DB.updateArticle(newArticle as ArticleType);
  };

  // 投稿
  const onClickPost = async (scope: string) => {
    postModal.onClose();
    setLoading(true);
    try {
      // apiキーの取得
      const { token } = await DB.fetchQiitaAPIKey();
      const apiKey = Util.decrypt(token);
      // 投稿
      await postToQiita(apiKey, formData, scope === "private" ? true : false);
    } catch (e) {
      console.error("Qiitaへの投稿が出来ませんでした。", e);
      displayMessage({ title: "Qiitaへの投稿が出来ませんでした。", status: "error" });
      setLoading(false);
      return;
    }
    // 保存と画面の更新
    await updateArticle(true);
    await refreshArticle();
    displayMessage({ title: "記事の投稿が完了しました。", status: "success" });
    setLoading(false);
  };

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
                <CustomButton icon={FaRobot} color="blue">
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
                bg="white"
                padding={4}
                placeholder="記事タイトル"
                value={formData.title}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
              <UI.Input
                bg="white"
                padding={4}
                placeholder="タグを入力してください。スペース区切りで5つまで入力できます。"
                value={formData.tag}
                onChange={(e) => setArticleTag(e.target.value.replace("　", " "))}
              />
            </UI.Stack>
            <UI.Flex w="100%" gap={4}>
              <ArticleMDE
                articleMarkdownText={formData.main_text}
                prevHtmlContent={prevHtmlContent}
                setArticleMarkdownText={setArticleMarkdownText}
              />
            </UI.Flex>
            <AiAnswerAccordion accordionRef={accordionRef} aiAnswerText={formData.ai_answer} />
            <Footer />
            <div ref={bottomRef} />
          </UI.Flex>
        )}
      </ContentWrapper>

      <PostModal isOpen={postModal.isOpen} onClose={postModal.onClose} onClickPost={onClickPost} />
    </>
  );
});
