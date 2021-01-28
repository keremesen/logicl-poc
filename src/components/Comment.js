import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Comment = ({ comment, feeling }) => {
  return (
    <Flex
      p={4}
      bgColor={feeling === 1 ? "blue.100" : "red.100"}
      boxShadow="base"
      width="70%"
      overflow='hidden'
      borderRadius="6px"
      my={4}
      flexDirection="row"
      position="relative"
    >
      <Flex>
        <Avatar src={comment.authorPhotoUrl} />
      </Flex>
      <Flex flexDirection="column" mx={4} justifyContent="center">
        <Heading size="md" fontWeight="600" color="gray.700">
          {comment.authorName}
        </Heading>
        <Text color='gray.700'>{comment.comment}</Text>
      </Flex>
      <Text
        position="absolute"
        bottom="1%"
        right="1%"
        fontSize="14px"
        fontWeight="500"
        color="gray.400"
      >
        {comment.createdAt}
      </Text>
    </Flex>
  );
};

export default Comment;
