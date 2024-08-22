import { FC, memo } from "react";
import { useParams } from "react-router-dom";

export const Article: FC = memo(() => {
  const { id } = useParams();
  console.log(id);

  return <>記事編集画面です</>;
});
