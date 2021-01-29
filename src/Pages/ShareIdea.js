import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import firebase, { db } from "../libs/firebase";
import DatePicker from "../utils/datePicker";

const ShareIdea = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const [categoryList, setCategoryList] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  const { user, loading } = useAuth();
  const toast = useToast();

  const isMounted = useRef(null);

  useEffect(() => {
    // executed when component mounted
    isMounted.current = true;
    return () => {
      // executed when unmount
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!loading && user && isMounted) {
      db.collection("categories")
        .get()
        .then((collection) => {
          let tempCategories = [];
          collection.forEach((categoryDoc) => {
            tempCategories.push({ id: categoryDoc.id, ...categoryDoc.data() });
          });
          setCategoryList(tempCategories);
          setLocalLoading(false);
        });
    }
  }, [loading, user]);

  if (!loading && !user && isMounted) {
    props.history.push("/auth");
  }

  return (
    <Flex
      flexDirection="column"
      w="720px"
      background="#fff"
      p={5}
      my="auto"
      borderRadius="15px"
      position="relative"
      minH="480px"
    >
      <Heading>Add Idea</Heading>
      {localLoading || loading ? (
        <Spinner
          boxSize={24}
          size="xl"
          color="red.500"
          pos="absolute"
          top="40%"
          left="50%"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      ) : (
        <>
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
            <Select
              onChange={(e) => {
                const tempSelectValue = e.target.value;
                const tempCategory = categoryList.find(
                  (e) => e.id === tempSelectValue
                );
                setCategory(tempCategory);
              }}
              icon={<TriangleDownIcon />}
              placeholder="Category"
            >
              {categoryList.map((cat, index) => {
                return (
                  <option key={index} value={cat.id}>
                    {cat.displayText}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <Button
            isDisabled={title === "" || desc === "" || category === ""}
            mt={4}
            alignSelf="flex-end"
            colorScheme="teal"
            padding={6}
            isLoading={progress}
            onClick={async () => {
              setProgress(true);

              let time = DatePicker();
              const interactionsId = await (
                await db.collection("interactions").add({ interactions: [] })
              ).id;
              const ideaData = {
                authorId: user.uid,
                authorName: user.name,
                authorPhotoUrl: user.photoUrl,
                title,
                desc,
                createdAt: time,
                upVote: 0,
                downVote: 0,
                counter: 0,
                category,
                interactionsId: interactionsId,
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
                  sharedIdeas: firebase.firestore.FieldValue.arrayUnion(
                    ideaDoc
                  ),
                })
                .then(() => {
                  setProgress(false);
                  props.history.push("/explore");
                  toast({
                    title: "Is it logicl?",
                    description: "Idea shared succesfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                })
                .catch((err) => console.log(err));
            }}
          >
            +Add
          </Button>
        </>
      )}
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
