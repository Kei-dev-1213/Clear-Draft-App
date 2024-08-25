import "./style.scss";
import { FC, memo } from "react";
import * as UI from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CONSTANT } from "../../../constant";
import { NavLinkText } from "../parts/NavLinkText";

export const Header: FC = memo(() => {
  return (
    <UI.Box as="header" bg="#fff" pt={3} boxShadow="md" h={CONSTANT.HEADER_HEIGHT}>
      <UI.Heading as="h1" className="title" textAlign="center" mb={4}>
        ClearDraft
      </UI.Heading>
      <UI.Flex as="nav" gap={20} justifyContent="center" fontSize={16}>
        <Link to="/settings">
          <NavLinkText>settings</NavLinkText>
        </Link>
        <Link to="/articles">
          <NavLinkText>articles</NavLinkText>
        </Link>
      </UI.Flex>
    </UI.Box>
  );
});
