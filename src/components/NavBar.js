import { Flex, Avatar, Heading, Stack } from "@chakra-ui/react";
import { BellIcon, AddIcon } from "@chakra-ui/icons";

const NavBar = () => {
  return (
    <Flex
      as="nav"
      w="100vw"
      h="7vh"
      bgColor="#FEEBC8"
      align="center"
      justify="space-between"
      px="32px"
    >
      <Flex>
        <Heading>logicl</Heading>
      </Flex>
      <Stack direction="row" spacing="16px" align="center">
        <AddIcon boxSize={6} />
        <BellIcon boxSize={8} />
        <Avatar boxSize={8} bgColor="#000" />
      </Stack>
    </Flex>
  );
};

export default NavBar;
