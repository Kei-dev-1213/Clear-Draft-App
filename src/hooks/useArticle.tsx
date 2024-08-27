import { ArticleFormType } from "../domain/article";
import { DB } from "../supabase";

export const useArticle = () => {
  // 記事一覧取得
  const fetchAllArticles = async () => await DB.fetchAllArticles();

  // 記事一覧削除
  const deleteArticle = async (id: string) => await DB.deleteArticle(id);

  // IDから記事取得
  const fetchArticleFromId = async (id: string) => await DB.fetchArticleFromId(id);

  // 記事の更新
  const registArticle = async (isUpdateArticle: boolean, formData: ArticleFormType) => {
    if (isUpdateArticle) {
      await DB.updateArticle(formData);
    } else {
      return await DB.insertArticle(formData);
    }
  };

  return { fetchAllArticles, deleteArticle, fetchArticleFromId, registArticle };
};
