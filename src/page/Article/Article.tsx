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
  const [articleTitle, setArticleTitle] = useState("");
  const [articleTag, setArticleTag] = useState("");
  const [articleMarkdownText, setArticleMarkdownText] = useState("");
  const [aiAnswerText, setAiAnswerText] = useState("");
  const [loading, setLoading] = useState(true);

  // hooks
  const { displayMessage } = useMessage();
  const navigate = useNavigate();

  // 初期処理
  useEffect(() => {
    (async () => {
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
    })();
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
                <CustomButton icon={GiArchiveRegister} color="red">
                  保存する
                </CustomButton>
                <CustomButton icon={MdOutlinePostAdd} color="green">
                  投稿する
                </CustomButton>
              </UI.HStack>
            </UI.Flex>
            <UI.Stack mb={2}>
              <UI.Input
                bg="white"
                padding={4}
                placeholder="記事タイトル"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
              <UI.Input
                bg="white"
                padding={4}
                placeholder="タグを入力してください。半角スペース区切りで5つまで入力できます。"
                value={articleTag}
                onChange={(e) => setArticleTag(e.target.value)}
              />
            </UI.Stack>
            <UI.Flex w="100%" gap={4}>
              <ArticleMDE
                articleMarkdownText={articleMarkdownText}
                prevHtmlContent={prevHtmlContent}
                setArticleMarkdownText={setArticleMarkdownText}
              />
            </UI.Flex>
            <AiAnswerAccordion accordionRef={accordionRef} aiAnswerText={aiAnswerText} />
            <Footer />
            <div ref={bottomRef} />
          </UI.Flex>
        )}
      </ContentWrapper>
    </>
  );
});
