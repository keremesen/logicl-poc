import React from "react";
import { Flex, Heading, Avatar } from "@chakra-ui/react";

const IdeaGroup = ({ title, list }) => {

  return (
    <Flex direction="column" my="30px">
      <Heading size="lg" mb="5px">
        {title}
      </Heading>
      <Flex
        direction="column"
        w="600px"
        h="auto"
        bgColor="gray.100"
        borderRadius="15px"
        transition="200ms ease-in-out"
        boxShadow="xl"
      >
        {list.map((idea,index) => (
          <Flex
            key={index}
            direction="row"
            bgColor="transparent"
            p="15px"
            align="center"
            borderRadius="15px"
            m="5px"
            transition="200ms ease-in-out"
            cursor="pointer"
            _hover={{ background: "gray.200" }}
            
          >
            <Avatar boxSize={8} bgColor="#000" mr="10px" src={idea.avatar} />
            <Heading size="md" _selection={{background:"teal.300"}}>
              {idea.title}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default IdeaGroup;
