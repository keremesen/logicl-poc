import { Avatar, Button, Flex, FormControl, FormLabel, Heading, Input, VisuallyHidden } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { useAuth } from "../context/AuthContext";
import Auth from "./Auth";


const Profile = (props) => {

  const { user, loading } = useAuth();
 
const [read, setRead] = useState(true)

const [name , setName] = useState(user.name)
const [email , setEmail] = useState(user.email)


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
        <Flex direction="column">
        <Avatar boxSize={48} bgColor="#000" src={user.photoUrl} />
        <Button bgColor="gray.200" mt="15px">Change Photo</Button>
        </Flex>
        
        <Flex direction="column" m={8} w="320px">
          
          <FormLabel mt="30px">NAME</FormLabel>
         <Input value={name} isReadOnly={read} onChange={(e)=> {setName(e.target.value)}} /> 
         <FormLabel>EMAIL</FormLabel>
         <FormControl id="email" isRequired>
         <Input value={email} isReadOnly={read} onChange={(e)=> {setEmail(e.target.value)}}  type="email" /> 
         </FormControl>
         
         <Button bgColor="gray.200" mt="15px" onClick={()=> setRead(false)} isDisabled={!read} > Set Profile</Button>
         {read ? ''  : <Button bgColor="green.300" mt={4} onClick={()=> setRead(true)}  >Save</Button>}
         
         
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
