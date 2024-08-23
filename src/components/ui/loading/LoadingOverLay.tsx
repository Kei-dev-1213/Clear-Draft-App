import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo } from "react";
import { DNA } from "react-loader-spinner";

export const LoadingOverLay: FC<{ isLoadingOverlay: boolean }> = memo(({ isLoadingOverlay }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoadingOverlay && (
        <motion.div
          key="loading-overLay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box position="absolute" top="0" left="0" w="100%" h="100vh" zIndex="9999" bg="rgba(0,0,0,0.3)">
            <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              <DNA height={200} width={200} />
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
