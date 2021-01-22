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
        <IdeaPreview
          title="Baslik"
          text="lorem ipsum gerisini bbilmiyombil miyombilmiyom bilmiyomi bilmiyom lmiyom"
          avatar=""
          rating="31"
        />
        <IdeaPreview
          title="Baslik"
          text="lorem ipsum gerisini bilmiyom"
          avatar=""
          rating="31"
        />
        <IdeaPreview
          title="Baslik"
          text="lorem ipsum gerisini bilmiyom"
          avatar=""
          rating="31"
        />
        <IdeaPreview
          title="Baslik"
          text="lorem ipsum gerisini bilmiyom"
          avatar=""
          rating="31"
        />
      </Flex>
    </Flex>
  );
};

export default ExplorePage;
