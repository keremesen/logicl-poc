import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const IdeaPreview = ({ title, text, avatar, rating, id, counter }) => {
  return (
    <Link to={`/i/${id}`}>
      <Flex
        w="960px"
        h="170px"
        backgroundColor="gray.200"
        borderRadius="15px"
        my="16px"
        boxShadow="lg"
        cursor="pointer"
        _hover={{ background: "gray.300" }}
        justifyContent="space-between"
        padding={4}
      >
        <Flex flex="6">
          <Avatar boxSize={8} bgColor="#000" src={avatar} mr={4} />
          <Flex direction="column">
            <Heading size="md">{title}</Heading>
            <Text fontSize="lg" noOfLines={4}>
              {text}
            </Text>
          </Flex>
        </Flex>
        <Flex
          mr="10px"
          ml="36px"
          px={4}
          flexDirection="column"
          flex="1"
          alignItems="center"
        >
          <Text mr="5px">{rating}%</Text>
          <Text mr="5px">{counter} kişi oyladı.</Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default IdeaPreview;
