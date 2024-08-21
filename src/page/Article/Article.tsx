import { FC } from "react";
import { useParams } from "react-router-dom";

export const Article: FC = () => {
  const { id } = useParams();
  console.log(id);

  return <>記事編集画面です</>;
};
