import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import firebase from "../libs/firebase";

const ShareIdea = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const user = useAuth().user;
  return (
    <Flex
      flexDirection="column"
      w="720px"
      background="#fff"
      p={5}
      my="auto"
      borderRadius="15px"
    >
      <Heading>Add Idea</Heading>
      <FormControl isRequired my={5}>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <FormLabel mt={5}>Description</FormLabel>
        <Textarea
          placeholder="Desc"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />

        <FormLabel mt={5}>Category</FormLabel>
        <RadioGroup onChange={setCategory} value={category}>
          <Radio value="Web">Web</Radio>
          <Radio ml={4} value="Mobile">
            Mobile
          </Radio>
          <Radio ml={4} value="Design">
            Design
          </Radio>
        </RadioGroup>
      </FormControl>

      <Button
        isDisabled={title === "" || desc === "" || category === ""}
        mt={4}
        alignSelf="flex-end"
        colorScheme="teal"
        padding={6}
        onClick={async () => {
          let day = new Date().getDate();
          let month = new Date().getMonth();
          let year = new Date().getFullYear();
          let hour = new Date().getHours();
          let minute = new Date().getMinutes();
          let second = new Date().getSeconds();

          let time = `${day}-${month}-${year} ${hour}:${minute}:${second}`

          const ideaData = {
            authorId: user.uid,
            authorName: user.name,
            authorPhotoUrl: user.photoUrl,
            title,
            desc,
            createdAt: time,
            like: 0,
            disslike: 0,
            counter: 0,
            category,
            commentsId: "",
            status: "approved",
          };
          const ideaDoc = await firebase
            .firestore()
            .collection("ideas")
            .add(ideaData);
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .update({
              sharedIdes: firebase.firestore.FieldValue.arrayUnion(ideaDoc),
            })
            .then(() => {
              window.location = "/explore";
            })
            .catch((err) => console.log(err));
        }}
      >
        +Add
      </Button>
    </Flex>
  );
};

export default ShareIdea;

/* 
.then(() => {
              toast({
                title: "Idea shared.",
                description:
                  "We've shared your idea for you. After validation, your idea will be public.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            })
*/
