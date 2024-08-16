import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

/*
 * サンプルテスト
 */
describe("サンプルテスト", () => {
  test("[正常系]サンプルテスト", async () => {
    // 実行
    render(<App />);

    // 検証
    waitFor(() => {
      // expect(screen.getByText("Vite:SECRET_KEY_VALUE")).toBeInTheDocument();
    });
  });
});
