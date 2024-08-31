import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Settings } from "./Settings";

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
  test("[正常系]入力項目が空であること", async () => {
    // 実行
    render(<Settings />);
    // 検証
    const apiInput = screen.getByTestId("qiita-api-input");
    expect(apiInput).toHaveValue("");
  });
});
