import styled from "@emotion/styled";
import SimpleMde from "react-simplemde-editor";
import { FC, memo } from "react";

type Props = {
  articleMarkdownText: string;
  prevHtmlContent: string;
  handleChange: (name: string, value: string) => void;
};

export const ArticleMDE: FC<Props> = memo(({ articleMarkdownText, prevHtmlContent, handleChange }) => {
  return (
    <>
      <SArticleEditDiv>
        <SimpleMde
          data-testid="simple-mde"
          value={articleMarkdownText}
          onChange={(value: string) => handleChange("main_text", value)}
        />
      </SArticleEditDiv>
      <SArticlePrevDiv className="preview">
        <div dangerouslySetInnerHTML={{ __html: prevHtmlContent }}></div>
      </SArticlePrevDiv>
    </>
  );
});

// css
const SArticleEditDiv = styled.div`
  width: 50%;
`;
const SArticlePrevDiv = styled.div`
  width: 50%;
  height: 57vh;
  padding: 10px 30px;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px border-left-color rgb(206, 212, 218);
`;
