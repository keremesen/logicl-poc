import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const IdeaPreview = ({ title, text, avatar, rating,id }) => {
  return (
   
     <Flex
      w="70%"
      h="170px"
      backgroundColor="gray.200"
      borderRadius="15px"
      my="16px"
      boxShadow="lg"
      cursor="pointer"
      _hover={{ background: "gray.300" }}
      justifyContent="space-between"
      padding={4}
     onClick={()=> window.location=`/i/${id}`}
    >
      <Flex width="100%">
        <Avatar boxSize={8} bgColor="#000" src={avatar} mr={4} />
        <Flex direction="column">
   
          <Heading size="md">{title}</Heading>
          <Text fontSize="lg">{text}</Text>
        </Flex>
      </Flex>
      <Flex mr="10px" ml="130px" mt="2%">
        <Text mr="5px">{rating}</Text>
        <StarIcon w={5} h={6} />
      </Flex>
    </Flex>
    
   
  );
};

export default IdeaPreview;
