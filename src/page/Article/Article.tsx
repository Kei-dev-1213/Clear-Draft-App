import { FC, memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SimpleMde from "react-simplemde-editor";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlightjs from "highlight.js";
import "easymde/dist/easymde.min.css";
import "./curtom-mde.css";
import "highlight.js/styles/github.css";

import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { ArticleType } from "../../domain/Article";

// ハイライトの設定
const renderer = new marked.Renderer();
renderer.code = ({ text }: { text: string }) => {
  return highlightjs.highlightAuto(text).value;
};

marked.setOptions({
  renderer,
});

export const Article: FC = memo(() => {
  const location = useLocation();
  // state
  const [markdownValue, setMarkdownValue] = useState("Initial value");
  const [htmlContent, setHtmlContent] = useState("");

  // 初期処理
  useEffect(() => {
    if (location.state && location.state.article) {
      setMarkdownValue((location.state.article as ArticleType).main_text || "");
    }
  }, [location.state]);

  // markdownValueの変更
  useEffect(() => {
    const parseMarkdown = async () => {
      const parsedHtml = await marked(markdownValue);
      setHtmlContent(DOMPurify.sanitize(parsedHtml));
    };
    parseMarkdown();
  }, [markdownValue]);

  // functions
  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  return (
    <>
      <ContentWrapper w="80%" pt="3">
        <div style={{ width: "50%" }}>
          <SimpleMde value={markdownValue} onChange={onChange} />
        </div>
        <div style={{ width: "50%", height: "70vh", padding: "30px", overflow: "auto" }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </ContentWrapper>
    </>
  );
});
