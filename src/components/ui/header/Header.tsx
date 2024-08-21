import "./style.css";
import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CONSTANT } from "../../../constant";

export const Header: FC = memo(() => {
  return (
    <UI.Box as="header" bg="#fff" pt={3} boxShadow="lg" h={CONSTANT.HEADER_HEIGHT}>
      <UI.Heading as="h1" className="title" textAlign="center" mb={4}>
        ClearDraft
      </UI.Heading>
      <UI.Flex as="nav" gap={20} justifyContent="center" fontSize={16}>
        <Link to="/settings">
          <UI.Text shadow="sm" _hover={{ opacity: 0.8 }}>
            settings
          </UI.Text>
        </Link>
        <Link to="/articles">
          <UI.Text shadow="sm" _hover={{ opacity: 0.8 }}>
            articles
          </UI.Text>
        </Link>
      </UI.Flex>
    </UI.Box>
  );
});
