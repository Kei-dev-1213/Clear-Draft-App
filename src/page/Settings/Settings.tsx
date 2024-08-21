import { FC, memo, useCallback } from "react";
import * as UI from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";

import { Header } from "../../components/ui/header/Header";
import { Footer } from "../../components/ui/footer/Footer";
import { ContentCenterWrapper } from "../../components/ui/container/ContentCenterWrapper";
import { DB } from "../../supabase";
import { useMessage } from "../../hooks/useMessage";
import { Util } from "../../util";

export const Settings: FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ token: string }>();

  // hooks
  const { displayMessage } = useMessage();

  // 登録
  const registQiitaAPIKey: SubmitHandler<{ token: string }> = useCallback(async ({ token }) => {
    await DB.registQiitaAPIKey(Util.encrypt(token));
    displayMessage({ title: "登録が正常に完了しました。", status: "success" });
    reset({ token: "" });
  }, []);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(registQiitaAPIKey)}>
        <ContentCenterWrapper w="1000px">
          <UI.Flex w="100%" flexDirection="column">
            <UI.Flex w="100%">
              <UI.InputGroup>
                <UI.InputLeftAddon bg="gray.100" border="none">
                  <FaLock />
                </UI.InputLeftAddon>
                <UI.Input
                  {...register("token", { required: "Qiita API キーの入力は必須です" })}
                  variant="flushed"
                  placeholder="Qiita APIキーを入力してください"
                  px={2}
                />
              </UI.InputGroup>
              <UI.Button type="submit" px={8} colorScheme="gray">
                登録
              </UI.Button>
            </UI.Flex>
            {errors.token && (
              <UI.Box as="p" role="alert" ml={12} color="red">
                {errors.token.message}
              </UI.Box>
            )}
          </UI.Flex>
        </ContentCenterWrapper>
      </form>
      <Footer />
    </>
  );
});
