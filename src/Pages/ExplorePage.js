import { Flex } from "@chakra-ui/react";
import React from "react";
import IdeaPreview from "../components/IdeaPreview";

const ExplorePage = () => {
  return (
    <Flex direction="column" align="center">
      <IdeaPreview />
      <IdeaPreview />
      <IdeaPreview />
      <IdeaPreview />
    </Flex>
  );
};

export default ExplorePage;
