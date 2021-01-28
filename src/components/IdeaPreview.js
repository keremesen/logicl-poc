import { Flex, Heading, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const IdeaPreview = ({
  title,
  text,
  avatar,
  rating,
  id,
  counter,
  category,
}) => {
  return (
      <Flex
        w="960px"
        backgroundColor="gray.50"
        borderRadius="8px"
        my="16px"
        boxShadow="base"
        cursor="pointer"
        _hover={{ background: "gray.100" }}
        justifyContent="space-between"
        padding={4}
        as={Link}
        to={`/i/${id}`}
      >
        <Flex flex="6">
          <Avatar boxSize={8} bgColor="#000" src={avatar} mr={4} />
          <Flex direction="column">
            <Flex flexDirection="row">
              <Heading size="md">{title}</Heading>
              <Tag
                mx={2}
                size="md"
                variant="solid"
                colorScheme={
                  category.color !== null &&
                  category.color !== undefined &&
                  category.color !== ""
                    ? category.color
                    : "teal"
                }
              >
                {category.displayText || category}
              </Tag>
            </Flex>
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
          <Text mr="5px">
            {counter === 0 ? "Be the first one" : counter + " people voted."}{" "}
          </Text>
        </Flex>
      </Flex>
  );
};

export default IdeaPreview;
