import { createClient } from "@supabase/supabase-js";

import { ArticleFormType, ArticleType } from "../domain/article";

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

// 記事の登録
const insertArticle = async (formData: ArticleFormType) => {
  const { title, tag, main_text, ai_answer, posted } = formData;
  try {
    const { data } = await supabase
      .from("articles")
      .insert({ title, tag, main_text, ai_answer, posted, updated_at: new Date() })
      .select("*");
    return (data![0] as ArticleType).id;
  } catch (e) {
    console.error(e);
    throw new Error("記事の登録で不正なエラーが発生しました。");
  }
};

// 記事の更新
const updateArticle = async (formData: ArticleFormType) => {
  const { id, title, tag, main_text, ai_answer, posted } = formData;
  try {
    await supabase
      .from("articles")
      .update({ title, tag, main_text, ai_answer, posted, updated_at: new Date() })
      .eq("id", id);
  } catch (e) {
    console.error(e);
    throw new Error("記事の更新で不正なエラーが発生しました。");
  }
};

// Qiita APIキーの取得
const fetchQiitaAPIKey = async () => {
  try {
    const { data } = await supabase.from("api_tokens").select().single();
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Qiita APIキーの更新で不正なエラーが発生しました。");
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
      await supabase.from("api_tokens").update({ token }).eq("token", data.token);
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
  fetchQiitaAPIKey,
  insertArticle,
  updateArticle,
};
