import axios from "axios";
import { ArticleFormType } from "../domain/article";
import { DB } from "../supabase";
import { Util } from "../util";

export const useAPI = () => {
  // Qiitaへの投稿
  const postToQiita = async (formData: ArticleFormType, toPrivate: boolean) => {
    // apiキーの取得
    const { token } = await DB.fetchQiitaAPIKey();
    const apiKey = Util.decrypt(token);

    // 投稿用オブジェクト
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
