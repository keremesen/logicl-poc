import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Text, Heading, Avatar, Button, HStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import FormatNumber from "../utils/formatNumber";

const BannerIdea = ({
  idea,
  isBanner = true,
  feeling,
  setFeeling,
  isInteractedBefore,
}) => {
  const { user } = useAuth();
  return (
    <Flex
      w="100%"
      h={isBanner ? "400px" : "fill"}
      bgColor="gray.50"
      boxShadow="base"
      borderRadius="12px"
      _hover={isBanner && { bg: "gray.100" }}
      cursor={isBanner && "pointer"}
      position="relative"
    >
      {!isBanner && (
        <HStack position="absolute" bottom="2%" left="1%">
          <Button
            onClick={() => {
              if (!isInteractedBefore) {
                if (feeling === 0) setFeeling(1);
                else setFeeling(0);
              }
            }}
            colorScheme={feeling === 0 || feeling === 1 ? "blue" : "gray"}
            variant="solid"
            disabled={!user || feeling === -1}
          >
            <TriangleUpIcon />
          </Button>
          <Button
            onClick={() => {
              if (!isInteractedBefore) {
                if (feeling === 0) setFeeling(-1);
                else setFeeling(0);
              }
            }}
            colorScheme={feeling === 0 || feeling === -1 ? "red" : "gray"}
            variant="solid"
            disabled={!user || feeling === 1}
          >
            <TriangleDownIcon />
          </Button>
        </HStack>
      )}
      <Flex
        width="100%"
        justifyContent="space-between"
        m="32px"
        pb={!isBanner && 8}
      >
        <Flex alignItems="center" direction="column" flex="1">
          <Avatar
            boxSize={100}
            bgColor="#000"
            src={idea.authorPhotoUrl}
            mb="16px"
          />
          <Text fontWeight="600" color="gray.700">
            {idea.authorName}
          </Text>
          <Flex direction="row" alignItems="center" textAlign="center">
            <Text
              fontSize={idea.counter === 0 ? "14px" : "18px"}
              fontWeight="500"
              color={idea.counter === 0 ? "gray.500" : "gray.600"}
            >
              {idea.counter === 0
                ? "No votes yet 😢"
                : "" + FormatNumber((idea.like / idea.counter) * 100) + "%"}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" ml="32px" flex="6">
          <Heading size="xl" mb="16px">
            {idea.title}
          </Heading>
          <Text fontSize="lg">{idea.desc}</Text>
        </Flex>
        <Text
          position="absolute"
          top="2%"
          right="2%"
          fontWeight="500"
          color="gray.500"
        >
          {!isBanner && idea.createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

export default BannerIdea;
