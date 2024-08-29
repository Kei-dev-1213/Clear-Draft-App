import axios from "axios";
import { ArticleFormType } from "../domain/articleTypes";
import { DB } from "../supabase";
import { Util } from "../util";
import { InquiryOption } from "../domain/enumTypes";
import queryJson from "./ai.queryText.json";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useAPI = () => {
  const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_GEMINI_API_KEY!);
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

  // Geminiへの問い合わせ
  const requestToGemini = async (formData: ArticleFormType, inquiryText: string, inquiryOption: InquiryOption) => {
    // 問い合わせ文言を取得
    let queryText = "";
    // アドバイス
    if (inquiryOption === InquiryOption.GetAdvice) {
      queryText = queryJson.advice_template_query_text
        .replace("$title", formData.title)
        .replace("$main_text", formData.main_text);
    }
    // その他
    else {
      queryText = queryJson.other_template_query_text.replace("$inquiry_text", inquiryText);
    }
    // Geminiへの問い合わせ
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(queryText);
    const response = await result.response;
    return response.text();
  };

  return { postToQiita, requestToGemini };
};
