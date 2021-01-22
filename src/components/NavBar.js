import { Flex, Avatar, Heading, Stack, Button } from "@chakra-ui/react";
import { BellIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const auth = useAuth();
  return (
    <Flex
      as="nav"
      w="100vw"
      h="7vh"
      bgColor="#FEEBC8"
      justifyContent="center"
    >
      <Flex
        w="1080px"
        h="7vh"
        bgColor="#FEEBC8"
        align="center"
        justify="space-between"
        px="8px"
      >
        <Flex>
          <Heading>
            <Link to="/" style={{padding:'8px 16px 8px 0px'}}>logicl</Link>
          </Heading>
        </Flex>
        <Button backgroundColor="teal.100" w="100px">
          <Link to="/explore" style={{padding:'12px 22px'}}>Explore</Link>
        </Button>
        <Stack direction="row" spacing="16px" align="center">
          <AddIcon boxSize={6} />
          <BellIcon boxSize={8} />

          <Link to="/auth">
            <Avatar
              boxSize={8}
              bgColor="#000"
              src={auth.user ? auth.user.photoUrl : ""}
            />
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
