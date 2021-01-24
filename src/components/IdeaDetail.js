import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const IdeaDetail = ({ title, text, avatar, rating }) => {
  return (
    <Flex w="1080px" height="93vh" background="#fff" overflowY="auto">
      <Flex width="100%">
        <Avatar boxSize={12} bgColor="#000" src={avatar} m={4} />
        <Flex direction="column" align="center">
          <Heading size="xl" my="16px">{title}</Heading>
          <Text fontSize="lg" ml="64px">{text}</Text>
        </Flex>
      </Flex>
      <Flex mr="10px" ml="130px" mt="2%">
        <Text mr="10px">{rating}</Text>
        <StarIcon w={6} h={6} />
      </Flex>
    </Flex>
  );
};

export default IdeaDetail;
