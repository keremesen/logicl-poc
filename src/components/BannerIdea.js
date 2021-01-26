import { StarIcon } from "@chakra-ui/icons";
import { Flex, Text, Heading, Avatar } from "@chakra-ui/react";

const BannerIdea = ({idea, isBanner = true}) => {
  return (
    <Flex
      w="100%"
      h={isBanner ? "400px" : 'fill'}
      bgColor="gray.200"
      borderRadius="12px"
      _hover={isBanner && {bg:'gray.300'}}
      cursor={isBanner && 'pointer'}
      position='relative'
    >
      <Flex width="100%" justifyContent="space-between" m="32px" >
        <Flex alignItems="center" direction="column" flex="1">
          <Avatar boxSize={100} bgColor="#000" src={idea.authorPhotoUrl} mb="16px" />
          <Text>{idea.authorName}</Text>
          <Flex direction="row" alignItems='center'>
            <Text>{idea.counter === 0 ? '0' : idea.like / idea.counter}</Text>
            <StarIcon w={4} h={4} ml='2px' />
          </Flex>
        </Flex>
        <Flex direction="column" ml="32px" flex="6">
          <Heading size="xl" mb="16px">{idea.title}</Heading>
          <Text fontSize="lg">{idea.desc}</Text>
        </Flex>
        <Text fontWeight='500' color='#242424' position='absolute' top='2%' right='2%'>{!isBanner && idea.createdAt}</Text>
      </Flex>
    </Flex>
  );
};

export default BannerIdea;
