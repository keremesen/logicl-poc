import { Avatar, Flex, FormLabel, Heading } from "@chakra-ui/react";
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
      <Heading m={5}>Profile</Heading>
      <Flex direction="row" m={6}>
        <Avatar
          boxSize={48}
          bgColor="#000"
          src={auth.user ? auth.user.photoUrl : ""}
        />
        <Flex direction="column" m={8}>
          <FormLabel>{auth.user ? auth.user.name : ""}</FormLabel>

          <FormLabel>{auth.user ? auth.user.email : ""}</FormLabel>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
