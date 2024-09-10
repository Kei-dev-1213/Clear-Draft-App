import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { defaultArticles } from "./defaultArticles";

// 環境変数を読み込む
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

// 記事の全件削除
const deleteAllArticle = async () => {
  try {
    await supabase.from("articles").delete().neq("title", 0);
  } catch (e) {
    console.error(e);
    throw new Error("記事の全件削除で不正なエラーが発生しました。");
  }
};
// npx tsx src/batch/index.ts

// デフォルトデータの挿入
const insertArticles = async () => {
  try {
    defaultArticles.forEach(async (defaultArticle) => {
      const { title, tag, main_text, posted, ai_answer } = defaultArticle;
      await supabase.from("articles").insert({ title, tag, main_text, ai_answer, posted });
    });
  } catch (e) {
    console.error(e);
    throw new Error("記事の登録で不正なエラーが発生しました。");
  }
};

// 全件削除
await deleteAllArticle();
// デフォルトデータの挿入
await insertArticles();
