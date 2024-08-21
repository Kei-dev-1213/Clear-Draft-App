import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

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
};
