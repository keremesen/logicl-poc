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
      <Flex width="100%" justifyContent="space-between" m="32px" textAlign="center">
        <Avatar boxSize={12} bgColor="#000" src={idea.avatar} mr={4} />
        <Flex direction="column" mt="16px">
          <Heading size="md" mb="16px">{idea.title}</Heading>
          <Text fontSize="lg">{idea.text}</Text>
        </Flex>
        <Flex >
          <Text mr="5px">{idea.rating}</Text>
          <StarIcon w={7} h={7} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BannerIdea;
