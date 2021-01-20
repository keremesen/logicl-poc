import { Flex, Text } from "@chakra-ui/react";
import IdeaGroup from "../components/IdeaGroup";

function Main() {
  return (
    <>
      <Flex w="1080px" h="100%" bgColor="#fff" p="64px" direction="column">
        <Flex
          w="100%"
          h="350px"
          bgColor="gray.300"
          borderRadius="12px"
          justify="center"
          align="center"
          textAlign="center"asdad
        >
          <Text>xD</Text>
        </Flex>
        <IdeaGroup />
        <IdeaGroup />
        <IdeaGroup />
      </Flex>
    </>
  );
}

export default Main;
