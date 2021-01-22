import { Flex, Text } from "@chakra-ui/react";
import IdeaGroup from "../components/IdeaGroup";
import Menu from "../components/Menu";

const ideas = [
  {
    title: "basasdasdasdasdasdlik",
    avatar: "",
  },
  {
    title: "basliasdasdask",
    avatar: "",
  },
  {
    title: "baslasdasdasik",
    avatar: "",
  },
  {
    title: "basliasfasdgfasdgk",
    avatar: "",
  },
];
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
          textAlign="center"
        >
          <Text>xD</Text>
        </Flex>
        <Flex flexDirection="row">
          <Menu />
          <Flex flexDirection="column" marginLeft="48px">
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Main;
