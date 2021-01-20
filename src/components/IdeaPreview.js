import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const IdeaPreviewItem = () => {
  return (
    <Flex
      w="70%"
      h="170px"
      backgroundColor="gray.200"
      borderRadius="15px"
      my="10px"
      boxShadow="lg"
      cursor="pointer"
      _hover={{ background: "gray.300" }}
    >
      <Avatar boxSize={8} bgColor="#000" mr="10px" ml="3%" mt="2%" />
      <Flex direction="column">
        <Heading size="md" mt="20px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Heading>
        <Text fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit
          amet convallis tellus, sed placerat odio.
        </Text>
      </Flex>
      <Flex mr="10px" ml="130px" mt="2%">
        <Text mr="5px">5</Text>
        <StarIcon w={5} h={6} />
      </Flex>
    </Flex>
  );
};

export const IdeaPreview = ({children}) => {
  return (
    <Flex
      w="1080px"
      h="100%"
      bgColor="#fff"
      direction="column"
      align="center"
      p="6px"
      minH="100vh"
    >{children}</Flex>
  );
};
