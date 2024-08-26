import axios from "axios";
import { ArticleType } from "../domain/Article";

export const useAPI = () => {
  // Qiitaへの投稿
  const postToQiita = async (
    apiKey: string,
    formData: Omit<ArticleType, "posted" | "updated_at" | "created_at">,
    toPrivate: boolean
  ) => {
    const postData = {
      body: formData.main_text,
      private: toPrivate,
      title: formData.title,
      tags: [
        ...formData.tag.split(" ").map((name) => ({
          name,
          versions: [],
        })),
      ],
    };
    // 投稿
    const res = await axios.post("https://qiita.com/api/v2/items", postData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      window.open(res.data.url, "_blank");
    } else {
      throw new Error("Qiitaの投稿でエラーが発生しました。");
    }
  };

  return { postToQiita };
};
