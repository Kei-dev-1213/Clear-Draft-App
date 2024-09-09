import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
// import { ArticleFormType } from "../domain/articleTypes";

// 環境変数を読み込む
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

// 記事の全件削除
const deleteAllArticle = async () => {
  try {
    await supabase.from("articles").delete();
  } catch (e) {
    console.error(e);
    throw new Error("記事の全件削除で不正なエラーが発生しました。");
  }
};
// npx tsx src/batch/index.ts

// デフォルトデータの挿入
// const insertArticle = async (formData: ArticleFormType) => {
//     const { title, tag, main_text, ai_answer, posted } = formData;
//     try {
//       await supabase
//         .from("articles")
//         .insert({ title, tag, main_text, ai_answer, posted, updated_at: new Date() })
//         .select("*");
//     } catch (e) {
//       console.error(e);
//       throw new Error("記事の登録で不正なエラーが発生しました。");
//     }
//   };


// 全件削除
deleteAllArticle();
