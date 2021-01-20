import React from 'react'
import { Flex, Heading, Avatar } from "@chakra-ui/react";
const IdeaGroup = () => {
    return (
        <Flex
        direction="column"
        w="600px"
        h="auto"
        bgColor="#FEEBC8"
        borderRadius="15px"
        mt="30px"
      >
        <Flex
          direction="row"
          bgColor="transparent"
          p="15px"
          align="center"
          borderRadius="15px"
          m="5px"
          _hover={{ background: "#F6AD55" }}
        >
          <Avatar boxSize={8} bgColor="#000" mr="10px" />
          <Heading size="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Heading>
        </Flex>

        <Flex
          direction="row"
          bgColor="transparent"
          p="15px"
          align="center"
          borderRadius="15px"
          m="5px"
          _hover={{ background: "#F6AD55" }}
        >
          <Avatar boxSize={8} bgColor="#000" mr="10px" />
          <Heading size="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Heading>
        </Flex>

        <Flex
          direction="row"
          bgColor="transparent"
          p="15px"
          align="center"
          borderRadius="15px"
          m="5px"
          _hover={{ background: "#F6AD55" }}
        >
          <Avatar boxSize={8} bgColor="#000" mr="10px" />
          <Heading size="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Heading>
        </Flex>

        <Flex
          direction="row"
          bgColor="transparent"
          p="15px"
          align="center"
          borderRadius="15px"
          m="5px"
          _hover={{ background: "#F6AD55" }}
        >
          <Avatar boxSize={8} bgColor="#000" mr="10px" />
          <Heading size="md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Heading>
        </Flex>

       
      </Flex>
    )
}

export default IdeaGroup
