import { FC, memo, useCallback, useContext, useEffect } from "react";
import * as UI from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdOutlineAppRegistration } from "react-icons/md";

import { ContentWrapper } from "../../components/ui/container/ContentWrapper";
import { DB } from "../../supabase";
import { useMessage } from "../../hooks/useMessage";
import { Util } from "../../util";
import { CONSTANT } from "../../constant";
import { LoadingContext } from "../../context/LoadingProvider";
import { CustomButton } from "../../components/ui/parts/CustomButton";

export const Settings: FC = memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ token: string }>();

  // context
  const { setIsLoadingOverlay } = useContext(LoadingContext);

  // hooks
  const { displayMessage } = useMessage();

  // 初期処理
  useEffect(() => reset({ token: "" }), []);

  // 登録
  const registQiitaAPIKey: SubmitHandler<{ token: string }> = useCallback(async ({ token }) => {
    setIsLoadingOverlay(true);
    await DB.registQiitaAPIKey(Util.encrypt(token));
    displayMessage({ title: "登録が正常に完了しました。", status: "success" });
    setIsLoadingOverlay(false);
    reset({ token: "" });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(registQiitaAPIKey)}>
        <ContentWrapper w={CONSTANT.CONTENT_WIDTH} align="center">
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
              <CustomButton icon={MdOutlineAppRegistration} color="blue">
                登録
              </CustomButton>
            </UI.Flex>
            {errors.token && (
              <UI.Box as="p" role="alert" ml={12} color="red">
                {errors.token.message}
              </UI.Box>
            )}
          </UI.Flex>
        </ContentWrapper>
      </form>
    </>
  );
});
