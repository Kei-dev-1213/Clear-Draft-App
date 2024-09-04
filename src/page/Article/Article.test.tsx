import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DB } from "../../supabase";
import { Article } from "./Article";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import queryJson from "../../hooks/ai.queryText.json";

const initialArticle = {
  title: "編集記事タイトル",
  tag: "記事_タグ1 記事_タグ2 記事_タグ3",
  main_text: "# メイン記事の内容です。",
  ai_answer: "AIの回答です",
  posted: false,
};

// モック化
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("axios", () => ({
  post: jest.fn(),
}));
jest.mock("../../supabase", () => ({
  DB: {
    fetchArticleFromId: jest.fn(),
    registArticle: jest.fn(),
    updateArticle: jest.fn(),
    fetchQiitaAPIKey: jest.fn(),
  },
}));
window.HTMLElement.prototype.scrollIntoView = jest.fn();
const generateContentMock = jest.fn().mockResolvedValue({
  response: {
    text: () => "生成AIの回答です。",
  },
});
jest.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: generateContentMock,
    }),
  })),
}));

/*
 * 記事編集画面のテスト
 */
describe("初期表示テスト", () => {
  test("[正常系]各項目に初期値が設定されていること", async () => {
    // モック化
    (useParams as jest.Mock).mockReturnValue("1");
    (DB.fetchArticleFromId as jest.Mock).mockResolvedValue(initialArticle);
    // 実行
    await act(async () => {
      render(<Article />);
    });

    fireEvent.click(screen.getByTestId("accordion-button"));

    // 検証
    await waitFor(async () => {
      const titleInput = screen.getByTestId("title-input");
      const tagInput = screen.getByTestId("tag-input");
      const simpleMde = screen.getByTestId("simple-mde");
      expect(titleInput).toHaveValue("編集記事タイトル");
      expect(tagInput).toHaveValue("記事_タグ1 記事_タグ2 記事_タグ3");
      expect(simpleMde).toHaveValue("# メイン記事の内容です。");
    });
  });
});

describe("ボタン押下テスト", () => {
  describe("保存ボタン押下テスト", () => {
    test("[正常系]正常に保存処理が実行されること", async () => {
      // モック化
      (useParams as jest.Mock).mockReturnValue("1");
      (DB.fetchArticleFromId as jest.Mock).mockResolvedValue(initialArticle);
      (DB.updateArticle as jest.Mock).mockResolvedValue(null);
      // 実行
      await act(async () => {
        render(<Article />);
      });

      // 値書き換え
      const titleInput = screen.getByTestId("title-input");
      const tagInput = screen.getByTestId("tag-input");
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, "編集記事タイトル_編集後");
      await userEvent.clear(tagInput);
      await userEvent.type(tagInput, "編集記事タグ_編集後");

      // 保存
      const registButton = screen.getByTestId("regist-button");
      fireEvent.click(registButton);

      await waitFor(async () => {
        expect(DB.updateArticle).toHaveBeenCalledWith({
          id: undefined,
          title: "編集記事タイトル_編集後",
          tag: "編集記事タグ_編集後",
          main_text: "# メイン記事の内容です。",
          ai_answer: "AIの回答です",
          posted: false,
        });
      });
    });
  });

  describe("投稿ボタン押下テスト", () => {
    test("[正常系]正常に投稿処理が実行されること", async () => {
      // モック化
      (useParams as jest.Mock).mockReturnValue("1");
      (DB.fetchArticleFromId as jest.Mock).mockResolvedValue(initialArticle);
      (DB.updateArticle as jest.Mock).mockResolvedValue(null);
      (DB.fetchQiitaAPIKey as jest.Mock).mockResolvedValue({ token: "aaa:bbb" });
      (axios.post as jest.Mock).mockResolvedValue({ status: 201, data: { url: "test_url" } });
      // 実行
      await act(async () => {
        render(<Article />);
      });

      // 値書き換え
      const titleInput = screen.getByTestId("title-input");
      const tagInput = screen.getByTestId("tag-input");
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, "編集記事タイトル_編集後");
      await userEvent.clear(tagInput);
      await userEvent.type(tagInput, "編集記事タグ");

      // 投稿
      const registButton = screen.getByTestId("post-button");
      fireEvent.click(registButton);
      await waitFor(() => {
        fireEvent.click(screen.getByTestId("post-to-qiita-button"));
      });

      // 検証
      await waitFor(async () => {
        expect(axios.post).toHaveBeenCalledWith(
          "https://qiita.com/api/v2/items",
          {
            body: "# メイン記事の内容です。",
            private: false,
            tags: [{ name: "編集記事タグ", versions: [] }],
            title: "編集記事タイトル_編集後",
          },
          { headers: { Authorization: "Bearer ", "Content-Type": "application/json" } }
        );
      });
    });
  });

  describe("生成AIに聞くボタン押下テスト", () => {
    test("[正常系]正常にリクエスト処理が実行されること", async () => {
      // モック化
      (useParams as jest.Mock).mockReturnValue("1");
      (DB.fetchArticleFromId as jest.Mock).mockResolvedValue(initialArticle);
      (DB.updateArticle as jest.Mock).mockResolvedValue(null);

      // 実行
      await act(async () => {
        render(<Article />);
      });

      // 値書き換え
      const titleInput = screen.getByTestId("title-input");
      const tagInput = screen.getByTestId("tag-input");
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, "編集記事タイトル_編集後");
      await userEvent.clear(tagInput);
      await userEvent.type(tagInput, "編集記事タグ");

      // 生成AIに聞く
      const requestAiButton = screen.getByTestId("request-ai-button");
      fireEvent.click(requestAiButton);
      await waitFor(() => {
        fireEvent.click(screen.getByTestId("request-to-gemini-button"));
      });

      // 検証
      await waitFor(async () => {
        expect(generateContentMock).toHaveBeenCalledWith(
          queryJson.advice_template_query_text
            .replace("$title", "編集記事タイトル_編集後")
            .replace("$main_text", "# メイン記事の内容です。")
        );
      });
    });
  });
});
