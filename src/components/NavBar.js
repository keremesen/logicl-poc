import { Flex, Avatar, Heading, Stack, Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const auth = useAuth();
  return (
    <Flex
      as="nav"
      w="100vw"
      h="60px"
      bgColor="#FEEBC8"
      align="center"
      justify="space-between"
      px="32px"
    >
      <Flex>
        <Heading>
          <Link to="/">logicl</Link>
        </Heading>
      </Flex>
      <Button backgroundColor="teal.100" w="100px">
        <Link to="/explore">Explore</Link>
      </Button>
      <Stack direction="row" spacing="16px" align="center">
        <Link to={auth.user ? "/share" : "/auth"}>
          <AddIcon boxSize={6} />
        </Link>
        <Link to={auth.user ? "/profile" : "/auth"}>
          <Avatar
            boxSize={8}
            bgColor="#000"
            src={auth.user ? auth.user.photoUrl : ""}
          />
        </Link>
      </Stack>
    </Flex>
  );
};

export default NavBar;
