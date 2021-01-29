import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Heading,
  Avatar,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import FormatNumber from "../utils/formatNumber";
import { Link } from "react-router-dom";
const BannerIdea = ({
  idea,
  isBanner = true,
  feeling,
  setFeeling,
  isInteractedBefore,
  interactionFeeling = 0,
  ideaLoading,
  interactionLoading,
}) => {
  const { user } = useAuth();
  return (
    <Flex
      w="100%"
      h={isBanner ? "320px" : "fill"}
      minH="300px"
      bgColor="gray.50"
      boxShadow="base"
      borderRadius="12px"
      _hover={isBanner && { bg: "gray.100" }}
      cursor={isBanner && "pointer"}
      position="relative"
      as={isBanner && Link}
      to={!ideaLoading && isBanner ? `/i/${idea.id}` : undefined}
    >
      {ideaLoading ? (
        <>
          <Spinner
            boxSize={12}
            size="md"
            color="red.500"
            pos="absolute"
            top="40%"
            left="50%"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        </>
      ) : (
        <>
          {!isBanner && (
            <HStack position="absolute" bottom="2%" left="1%">
              {interactionLoading ? (
                <Spinner
                  boxSize={8}
                  size="sm"
                  color="red.500"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  mx={10}
                />
              ) : (
                <>
                  {" "}
                  <Button
                    onClick={() => {
                      if (!isInteractedBefore) {
                        if (feeling === 1) setFeeling(0);
                        else setFeeling(1);
                      }
                    }}
                    colorScheme={
                      feeling === 0 || feeling === 1 ? "blue" : "blue"
                    }
                    bgColor={feeling !== 1 || feeling === 0 ? "#80caf2" : ""}
                    variant="solid"
                    disabled={!user || (isInteractedBefore && feeling === -1)}
                  >
                    <TriangleUpIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (!isInteractedBefore) {
                        if (feeling === -1) setFeeling(0);
                        else setFeeling(-1);
                      }
                    }}
                    colorScheme={
                      feeling === 0 || feeling === -1 ? "red" : "red"
                    }
                    bgColor={feeling !== -1 || feeling === 0 ? "#fc7e7e" : ""}
                    variant="solid"
                    disabled={!user || (isInteractedBefore && feeling === 1)}
                  >
                    <TriangleDownIcon />
                  </Button>{" "}
                </>
              )}
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
              <Flex direction="column" alignItems="center" textAlign="center">
                <Text
                  fontSize={idea.counter === 0 ? "14px" : "18px"}
                  fontWeight="500"
                  color={idea.counter === 0 ? "gray.500" : "gray.600"}
                >
                  {idea.counter === 0
                    ? "No votes yet 😢"
                    : "" +
                      FormatNumber((idea.upVote / idea.counter) * 100) +
                      "%"}
                </Text>
                {idea.counter !== 0 && (
                  <Text fontSize="14px" fontWeight="500">
                    {idea.counter} people voted.
                  </Text>
                )}
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
        </>
      )}
    </Flex>
  );
};

export default BannerIdea;
