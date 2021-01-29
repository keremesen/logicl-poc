import {
  Flex,
  Avatar,
  Heading,
  Stack,
  Button,
  MenuList,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Menu,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const auth = useAuth();
  return (
    <Flex
      as="nav"
      w="100%"
      h="60px"
      bgColor="#FEEBC8"
      align="center"
      justifyContent="center"
      zIndex="10"
    >
      <Flex
        bgColor="#FEEBC8"
        h="60px"
        align="center"
        justify="space-between"
        px="8px"
        w="1080px"
      >
        <Flex>
          <Heading>
            <Link to="/" style={{ padding: "6px 16px 6px 0px" }}>
              logicl
            </Link>
          </Heading>
        </Flex>
        <Button backgroundColor="teal.200" w="100px">
          <Link to="/explore" style={{ padding: "12px 22px" }}>
            Explore
          </Link>
        </Button>

        <Stack direction="row" spacing="16px" align="center">
          <Link to="/share">
            <AddIcon boxSize={6} />
          </Link>
          {auth.user ? (
            <Menu>
              <MenuButton as={Link} colorScheme="transparent">
                <Avatar
                  boxSize={8}
                  bgColor="#000"
                  src={auth.user ? auth.user.photoUrl : ""}
                />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <Link to="/profile">
                    <MenuItem>My Account</MenuItem>
                  </Link>

                  <MenuItem>My Ideas </MenuItem>
                  <MenuItem onClick={auth.signout}>Sign Out</MenuItem>
                </MenuGroup>
                <MenuDivider />
              </MenuList>
            </Menu>
          ) : (
            <Link to="/profile">
              {" "}
              <Avatar
                boxSize={8}
                bgColor="#000"
                src={auth.user ? auth.user.photoUrl : ""}
              />
            </Link>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default NavBar;
