import { Avatar, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { useAuth } from "../context/AuthContext";

const Profile = (props) => {
  const { user, loading, signout } = useAuth();

  const isMounted = useRef(null);

  useEffect(() => {
    // executed when component mounted
    isMounted.current = true;
    return () => {
      // executed when unmount
      isMounted.current = false;
    };
  }, []);

  if (isMounted && !loading && !user) {
    props.history.push("/auth");
    return <FullScreenSpinner />;
  }

  if(loading){
    return <FullScreenSpinner />
  }

  return (
    <Flex
      w="1080px"
      h="100%"
      minH="93vh"
      background="#fff"
      direction="column"
      align="flex-start"
    >
      <Heading m={5}>Profile</Heading>
      <Flex direction="row" m={6}>
        <Avatar boxSize={48} bgColor="#000" src={user.photoUrl} />
        <Flex direction="column" m={8}>
          <Heading>{user.name}</Heading>
          <Heading>{user.email}</Heading>
          <Button mx={4} colorScheme="gray" onClick={signout}>
            Sign Out
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
