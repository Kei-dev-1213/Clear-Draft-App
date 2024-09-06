import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Settings } from "./Settings";
import userEvent from "@testing-library/user-event";
import { LoadingProvider } from "../../context/LoadingProvider";
import { DB } from "../../supabase";

// モック化
jest.mock("../../supabase", () => ({
  DB: {
    registQiitaAPIKey: jest.fn(),
  },
}));

/*
 * 設定画面のテスト
 */
describe("初期表示テスト", () => {
  test("[正常系]入力項目が空であること", async () => {
    // 実行
    render(<Settings />);
    // 検証
    const apiInput = screen.getByTestId("qiita-api-input");
    expect(apiInput).toHaveValue("");
  });
});

describe("登録テスト", () => {
  test("[正常系]登録処理が正常に動作すること", async () => {
    // 実行
    render(<Settings />, { wrapper: LoadingProvider });
    // 入力
    const token = "test-api-key";
    const apiInput = screen.getByTestId("qiita-api-input");
    await userEvent.type(apiInput, token);
    // 登録
    const registButton = screen.getByTestId("regist-button");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      expect(DB.registQiitaAPIKey).toHaveBeenCalledTimes(1);
      expect(DB.registQiitaAPIKey).not.toHaveBeenCalledWith(token);
    });
    expect(apiInput).toHaveValue("");
  });

  test("[異常系]登録処理が正常に動作すること", async () => {
    // 実行
    render(<Settings />);
    // 検証
    const registButton = screen.getByTestId("regist-button");
    fireEvent.click(registButton);

    // 検証
    await waitFor(async () => {
      const errorMessage = screen.getByText("Qiita API キーの入力は必須です");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
