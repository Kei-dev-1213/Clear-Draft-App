import { FC, memo, MouseEvent } from "react";
import * as UI from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { LoadingSpinner } from "../loading/LoadingSpinner";

type Props = {
  accordionRef: React.RefObject<HTMLDivElement>;
  aiAnswerText: string;
  accordionButtonRef: React.RefObject<HTMLButtonElement>;
  accordionIndex: number | null;
  toggleAiAnswerAccordion: (e: MouseEvent<HTMLButtonElement>) => void;
  aiAnswerloading: boolean;
};

export const AiAnswerAccordion: FC<Props> = memo(
  ({ accordionRef, aiAnswerText, accordionButtonRef, accordionIndex, toggleAiAnswerAccordion, aiAnswerloading }) => {
    return (
      <UI.Accordion index={accordionIndex ?? undefined} allowToggle mb={4} ref={accordionRef}>
        <UI.AccordionItem>
          <UI.AccordionButton
            ref={accordionButtonRef}
            _expanded={{ bg: "tomato", color: "white" }}
            onClick={toggleAiAnswerAccordion}
          >
            <UI.Box as="span" flex="1" textAlign="left">
              <UI.Flex alignItems="center" gap={2} h="100%">
                <FaRobot size={20} />
                <UI.Text>生成AIの回答</UI.Text>
              </UI.Flex>
            </UI.Box>
            <UI.AccordionIcon />
          </UI.AccordionButton>
          <UI.AccordionPanel pb={4} h="80vh" bg="white" overflowY="auto" py={5} px={8}>
            {aiAnswerloading ? (
              <LoadingSpinner />
            ) : (
              <div className="ai-answer" dangerouslySetInnerHTML={{ __html: aiAnswerText }}></div>
            )}
          </UI.AccordionPanel>
        </UI.AccordionItem>
      </UI.Accordion>
    );
  }
);
