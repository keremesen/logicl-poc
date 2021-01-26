import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { db } from "../libs/firebase";
import FullScreenSpinner from "../components/FullScreenSpinner";
import BannerIdea from "../components/BannerIdea";

const IdeaDetail = ({ match, history }) => {
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    const ideaId = match.params.ideaId;
    db.collection("ideas")
      .doc(ideaId)
      .get()
      .then((snapshot) => setIdea(snapshot.data()));
  }, []);

  if (idea === null) {
    return <FullScreenSpinner />;
  }

  return (
    <Flex
      w="1080px"
      height="93vh"
      background="#fff"
      overflowY="auto"
      padding={8}
      position="relative"
      alignItems='flex-start'
    >
      <Button
        bgColor="red.600"
        position="absolute"
        top="1%"
        left="1%"
        color="white"
        fontSize="24px"
        fontWeight="700"
        zIndex='100'
        _hover={{ bgColor: "red.500" }}
        onClick={() => history.goBack()}
      >
        ←
      </Button>
      <BannerIdea idea={idea} isBanner={false} />
    </Flex>
  );
};

export default IdeaDetail;

/**
 * <Flex width="100%" backgroundColor="tomato" p={8}>
        <Avatar
          boxSize={12}
          bgColor="#000"
          src={idea.authorPhotoUrl || ""}
        />
        <Flex direction="column" align="center" mx={4}>
          <Heading size="xl">
            {idea.title}
          </Heading>
          <Text fontSize="lg">{idea.desc}</Text>
        </Flex>
        <Flex mr="10px" ml="130px" backgroundColor="tomato">
          <Text mr="10px">{idea.like}</Text>
          <StarIcon w={6} h={6} />
        </Flex>
      </Flex>
 */
