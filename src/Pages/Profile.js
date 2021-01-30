import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { useAuth } from "../context/AuthContext";

const Profile = (props) => {
  const { user, loading } = useAuth();

  const [read, setRead] = useState(true);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isValid, setisValid] = useState(false);

  const isMounted = useRef(null);

  const invalid = (e) => {
    setEmail(e.target.value);
    if (email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );

      if (pattern.test(email)) {
        setisValid(true);
      } else {
        setisValid(false);
      }
    }
  };

  const setProfile = () => {
    setRead(false);
    setisValid(false)
    setName("");
    setEmail("");
  };

  const setProfileCancel = () => {
    setRead(true);
    setName(user.name);
    setEmail(user.email);
  };

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

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <Flex
      w="1080px"
      h="100%"
      minH="93vh"
      background="#fff"
      direction="column"
      align="center"
    >
      <Heading m={5} fontSize="64px">Profile</Heading>
      <Flex direction="column" m={6} textAlign="center">
        <Flex direction="column" alignItems="center">
          <Avatar boxSize={64} bgColor="#000" src={user.photoUrl} />
          <Button bgColor="gray.200" width="35%" mt={6}>
            Change Photo
          </Button>
        </Flex>

        <Flex direction="column" m={8} w="320px">
          <Heading size="lg">User Info</Heading>
          <FormLabel mt="30px">NAME</FormLabel>
          <Input
            value={name}
            isReadOnly={read}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormLabel>EMAIL</FormLabel>
          <FormControl id="email" isRequired>
            <Input
              value={email}
              isReadOnly={read}
              onChange={(e) => {
                invalid(e);
              }}
              type="email"
            />
          </FormControl>

          <Button
            bgColor="gray.200"
            mt="15px"
            onClick={() => setProfile()}
            isDisabled={!read}
          >
            {" "}
            Set Profile
          </Button>
          {/* {read ? ''  : <Button bgColor="green.300" mt={4} onClick={()=> setRead(true)}  >Save</Button>} */}

          {isValid ? (
            read ? (
              ""
            ) : (
              <Flex mt={4} justify="space-between">
                <Button bgColor="gray.400" width="48%" onClick={() => setProfileCancel()}>
                  Cancel
                </Button>
                <Button bgColor="green.400" width="48%" onClick={() => setRead(true)}>
                  Save
                </Button>
              </Flex>
            )
          ) : read ? (
            ""
          ) : (
            <Flex mt={4} justify="space-between">
              <Button bgColor="gray.400" width="48%" onClick={() => setProfileCancel()}>
                Cancel
              </Button>
              <Button fontSize="12px" fontWeight="700" bgColor="red.400" width="48%" disabled onClick={() => setRead(true)}>
                Please enter a valid email!
              </Button>
            </Flex>
          )}


        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
