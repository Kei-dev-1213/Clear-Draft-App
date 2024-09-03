import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DB } from "../../supabase";
import { Articles } from "./Articles";
import { useNavigate } from "react-router-dom";

const initialArticles = [
  {
    id: 1,
    title: "初期表示未投稿記事１",
    tag: "記事1_タグ1 記事1_タグ2 記事1_タグ3",
    posted: false,
    updated_at: "2024-01-01T00:00:00.000+00:00",
  },
  {
    id: 2,
    title: "初期表示未投稿記事２",
    tag: "記事2_タグ1 記事2_タグ2 記事2_タグ3",
    posted: false,
    updated_at: "2024-01-02T00:00:00.000+00:00",
  },
  {
    id: 3,
    title: "",
    tag: "",
    posted: false,
    updated_at: "2024-01-03T00:00:00.000+00:00",
  },
  {
    id: 4,
    title: "初期表示投稿済記事４",
    tag: "記事4_タグ1 記事4_タグ2 記事4_タグ3",
    posted: true,
    updated_at: "2024-01-04 00:00:00.000+00",
  },
];

// モック化
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../supabase", () => ({
  DB: {
    fetchAllArticles: jest.fn(),
    deleteArticle: jest.fn(),
  },
}));

/*
 * 記事一覧画面のテスト
 */
describe("初期表示テスト", () => {
  test("[正常系]テーブルにデータが表示されていること", async () => {
    // モック化
    (DB.fetchAllArticles as jest.Mock).mockResolvedValue(initialArticles);
    // 実行
    await act(async () => {
      render(<Articles />);
    });
    // 検証
    await waitFor(async () => {
      const article1_title = screen.getByText("初期表示未投稿記事１");
      const article2_title = screen.getByText("初期表示未投稿記事２");
      const article3_title = screen.getByText("(タイトル未設定)");
      const article1_tag1 = screen.getByText("記事1_タグ1");
      const article1_tag2 = screen.getByText("記事1_タグ2");
      const article1_tag3 = screen.getByText("記事1_タグ3");
      expect(article1_title).toBeInTheDocument();
      expect(article2_title).toBeInTheDocument();
      expect(article3_title).toBeInTheDocument();
      expect(article1_tag1).toBeInTheDocument();
      expect(article1_tag2).toBeInTheDocument();
      expect(article1_tag3).toBeInTheDocument();
    });
  });
});

describe("ボタン押下テスト", () => {
  describe("新規登録ボタン押下テスト", () => {
    test("[正常系]正常に画面遷移すること", async () => {
      // モック化
      const navigate = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      (DB.fetchAllArticles as jest.Mock).mockResolvedValue(initialArticles);
      // 実行
      await act(async () => {
        render(<Articles />);
      });
      const addArticleButton = screen.getByTestId("add-article-button");
      fireEvent.click(addArticleButton);

      // 検証
      await waitFor(async () => {
        expect(navigate).toHaveBeenCalledWith("/article/0");
      });
    });
  });
  describe("未投稿の下書きのみ表示ボタン押下テスト", () => {
    test("[正常系]ボタン押下時に表示データが切り替わること", async () => {
      // モック化
      const navigate = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      (DB.fetchAllArticles as jest.Mock).mockResolvedValue(initialArticles);
      // 実行
      await act(async () => {
        render(<Articles />);
      });

      // 事前検証
      await waitFor(async () => {
        const article4_title = screen.getByText("初期表示投稿済記事４");
        const article4_tag1 = screen.getByText("記事4_タグ1");
        expect(article4_title).toBeInTheDocument();
        expect(article4_tag1).toBeInTheDocument();
      });

      const draftSwitch = screen.getByTestId("draft-switch");
      fireEvent.click(draftSwitch);

      // 検証
      await waitFor(async () => {
        const article4_title = screen.queryByText("初期表示未投稿記事４");
        const article4_tag1 = screen.queryByText("記事4_タグ1");
        expect(article4_title).not.toBeInTheDocument();
        expect(article4_tag1).not.toBeInTheDocument();
      });
    });
  });
  describe("編集ボタン押下テスト", () => {
    test("[正常系]正常に画面遷移すること", async () => {
      // モック化
      const navigate = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      (DB.fetchAllArticles as jest.Mock).mockResolvedValue(initialArticles);
      // 実行
      await act(async () => {
        render(<Articles />);
      });
      const editArticleButtons = screen.getAllByTestId("edit-article-button");
      fireEvent.click(editArticleButtons[0]);

      // 検証
      await waitFor(async () => {
        expect(navigate).toHaveBeenCalledWith("/article/1");
      });
    });
  });
  describe("削除ボタン押下テスト", () => {
    test("[正常系]ボタン押下時に表示データが切り替わること", async () => {
      // モック化
      const navigate = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      (DB.fetchAllArticles as jest.Mock).mockResolvedValue(initialArticles);
      (DB.deleteArticle as jest.Mock).mockResolvedValue(jest.fn);
      // 実行
      await act(async () => {
        render(<Articles />);
      });
      const deleteArticleButtons = screen.getAllByTestId("delete-article-button");
      fireEvent.click(deleteArticleButtons[0]);

      // ダイアログ
      await waitFor(async () => {
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
      });
      // 検証
      await waitFor(async () => {
        expect(DB.deleteArticle).toHaveBeenCalledWith(1);
      });
    });
  });
});
