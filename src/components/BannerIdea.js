import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text, Heading, Avatar } from "@chakra-ui/react";

const BannerIdea = ({idea}) => {
  return (
    <Flex
      w="100%"
      h="400px"
      bgColor="gray.200"
      borderRadius="12px"
      _hover={{bg:'gray.300'}}
      cursor="pointer"
    >
      <Flex width="100%" justifyContent="space-between" m="32px" >
        <Flex alignItems="center" direction="column" flex="1">
          <Avatar boxSize={100} bgColor="#000" src={idea.avatar} mb="16px" />
          <Text>Sinan Topal</Text>
          <Flex direction="row" mt="16px">
            <Text>{idea.rating}</Text>
            <StarIcon w={7} h={7} />
          </Flex>
        </Flex>
        <Flex direction="column" ml="32px" flex="6">
          <Heading size="xl" mb="16px">{idea.title}</Heading>
          <Text fontSize="lg">{idea.text}</Text>
        </Flex>
        
      </Flex>
    </Flex>
  );
};

export default BannerIdea;
