import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const auth = useAuth();

  return (
    <Flex direction="column" h="93vh" p={16}>
      {!auth.user ? (
        <>
          <Flex
            direction="column"
            align="center"
            bgColor="gray.200"
            py={16}
            px={32}
            borderRadius={8}
            boxShadow="md"
          >
            <Heading>Authentication</Heading>
            <Flex my={4} direction="column">
              <Button
                mx={4}
                colorScheme="gray"
                onClick={() => {
                  auth.signinWithGitHub();
                }}
              >
                Sign In with Github
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </Flex>
  );
};

/*
<FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="name@site.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="submitButton" mt={4}>
            <Button
              colorScheme="teal"
              isDisabled={email.length < 6 || password.length < 6}
            >
              Sign In
            </Button>
        
*/
export default Auth;
