import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import IdeaPreview from "../components/IdeaPreview";
import firebase, { db } from "../libs/firebase";
import FormatNumber from "../utils/formatNumber";

const ExplorePage = () => {
  const [ideas, setIdeas] = useState([]);
  const [noIdea, setNoIdea] = useState(false);
  const [noMoreIdea, setNoMoreIdea] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMoreIdeas = (lastIdea) => {
    setLoading(true);
    db.collection("ideas")
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc")
      .startAfter(lastIdea.createdAt)
      .limit(10)
      .get()
      .then((res) => {
        if (res.size < 10) {
          setNoMoreIdea(true);
        } else {
          let tempIdeas = ideas;
          res.forEach((snapshot) => {
            tempIdeas.push({ id: snapshot.id, ...snapshot.data() });
          });
          setIdeas(tempIdeas);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("ideas")
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then((res) => {
        if (res.size < 1) {
          setNoIdea(true);
        } else {
          if (noIdea) setNoIdea(false);
          let tempIdeas = [];
          res.forEach((snapshot) => {
            tempIdeas.push({ id: snapshot.id, ...snapshot.data() });
          });
          tempIdeas.sort();
          setIdeas(tempIdeas);
        }
        if (res.size < 10) setNoMoreIdea(true);
        setLoading(false);
      });
  }, [noIdea]);

  if (noIdea) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Heading>No idea found..</Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" minH="100vh">
      <Flex
        minH="100vh"
        background="#fff"
        w="1080px"
        h="100%"
        flexDirection="column"
        align="center"
      >
        {loading ? (
          <Spinner
          boxSize={24}
            size="xl"
            color="red.500"
            pos="fixed"
            top="40%"
            left="50%"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        ) : (
          <>
            {ideas.map((idea, index) => {
              return (
                <IdeaPreview
                  key={index}
                  title={idea.title}
                  text={idea.desc}
                  avatar={idea.authorPhotoUrl ? idea.authorPhotoUrl : ""}
                  rating={
                    idea.counter !== 0
                      ? FormatNumber((idea.upVote / idea.counter) * 100)
                      : "0"
                  }
                  id={idea.id}
                  counter={idea.counter}
                  category={idea.category}
                />
              );
            })}
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="center"
              p={8}
              mb={24}
            >
              {!noMoreIdea ? (
                <Button
                  onClick={() => {
                    fetchMoreIdeas(ideas[ideas.length - 1]);
                  }}
                >
                  Load More Idea
                </Button>
              ) : (
                <Text>No more data</Text>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ExplorePage;
