import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

type Props = {
  accordionRef: React.RefObject<HTMLDivElement>;
  aiAnswerText: string;
};

export const AiAnswerAccordion: FC<Props> = memo(({ accordionRef, aiAnswerText }) => {
  return (
    <UI.Accordion allowToggle mb={4} ref={accordionRef}>
      <UI.AccordionItem>
        <UI.AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
          <UI.Box as="span" flex="1" textAlign="left">
            <UI.Flex alignItems="center" gap={2} h="100%">
              <FaRobot size={20} />
              <UI.Text>生成AIの回答</UI.Text>
            </UI.Flex>
          </UI.Box>
          <UI.AccordionIcon />
        </UI.AccordionButton>
        <UI.AccordionPanel pb={4} h="92vh" bg="white">
          {aiAnswerText}
        </UI.AccordionPanel>
      </UI.AccordionItem>
    </UI.Accordion>
  );
});
