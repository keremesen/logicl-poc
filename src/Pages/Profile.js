import { Avatar, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const auth = useAuth();

  return (
    <Flex
      w="1080px"
      h="100%"
      minH="93vh"
      background="#fff"
      direction="column"
      align="flex-start"
    >
      {auth.user ? (
        <>
          <Heading m={5}>Profile</Heading>
          <Flex direction="row" m={6}>
            <Avatar
              boxSize={48}
              bgColor="#000"
              src={auth.user.photoUrl}
            />
            <Flex direction="column" m={8}>
              <Heading>{auth.user.name}</Heading>
              <Heading>{auth.user.email}</Heading>
              <Button mx={4} colorScheme="gray" onClick={auth.signout}>
                Sign Out
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Heading m={5}>
            You're not signed in. Go to <Link onClick={() => window.location = "/auth"}>auth page</Link>
          </Heading>
        </>
      )}
    </Flex>
  );
};

export default Profile;
