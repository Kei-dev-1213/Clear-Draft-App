import { createClient } from "@supabase/supabase-js";

import { ArticleType } from "../domain/Article";

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

// 記事一覧の取得
const fetchAllArticles = async () => {
  try {
    const { data } = await supabase.from("articles").select("*").order("updated_at", { ascending: false });
    return (data as Array<ArticleType>) || [];
  } catch (e) {
    console.error(e);
    throw new Error("記事一覧の取得で不正なエラーが発生しました。");
  }
};

// IDから記事内容の取得
const fetchArticleFromId = async (id: string) => {
  try {
    const { data } = await supabase.from("articles").select("*").eq("id", id).single();
    return (data as ArticleType) || null;
  } catch (e) {
    console.error(e);
    throw new Error("記事の取得で不正なエラーが発生しました。");
  }
};

// 記事削除
const deleteArticle = async (id: string) => {
  try {
    await supabase.from("articles").delete().eq("id", id);
  } catch (e) {
    console.error(e);
    throw new Error("記事の削除で不正なエラーが発生しました。");
  }
};

// Qiita APIキーの更新
const registQiitaAPIKey = async (token: string) => {
  try {
    const { data } = await supabase.from("api_tokens").select().single();
    // 登録済か否かで処理を切り分ける
    if (!data) {
      await supabase.from("api_tokens").insert({ token });
    } else {
      await supabase.from("api_tokens").update({ token }).order("created_at", { ascending: false }).limit(1);
    }
  } catch (e) {
    console.error(e);
    throw new Error("Qiita APIキーの更新で不正なエラーが発生しました。");
  }
};

export const DB = {
  registQiitaAPIKey,
  fetchAllArticles,
  fetchArticleFromId,
  deleteArticle,
};
