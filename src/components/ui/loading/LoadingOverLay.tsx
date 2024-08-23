import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FC, memo } from "react";
import { DNA } from "react-loader-spinner";

export const LoadingOverLay: FC = memo(() => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading-overLay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <Box position="absolute" top="0" left="0" w="100%" h="100vh" zIndex="999" bg="#000" opacity="0.5">
          <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
            <DNA height={200} width={200} />
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
});
