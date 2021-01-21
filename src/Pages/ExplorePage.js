import { Flex } from "@chakra-ui/react";
import React from "react";
import IdeaPreview from "../components/IdeaPreview";

const ExplorePage = () => {
  return (
    <Flex direction="column" align="center" minH="100vh">
      <Flex
        minH="100vh"
        background="#fff"
        w="1080px"
        h="100%"
        flexDirection="column"
        align="center"
      >
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
        <IdeaPreview />
      </Flex>
    </Flex>
  );
};

export default ExplorePage;
