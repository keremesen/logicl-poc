import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FullScreenSpinner from "../components/FullScreenSpinner";
import IdeaPreview from "../components/IdeaPreview";
import firebase from "../libs/firebase";

const ExplorePage = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("ideas")
      .where("status", "==", "approved")
      .orderBy("createdAt", "desc")
      .onSnapshot((docSnapshot) => {
        let tempIdeas = [];
        docSnapshot.forEach((snapshot) => {
          tempIdeas.push({ id: snapshot.id, ...snapshot.data() });
        });
        tempIdeas.sort();
        setIdeas(tempIdeas);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  if (ideas.length < 1) {
    return <FullScreenSpinner />
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
        {ideas.map((idea, index) => {
          return (
            <IdeaPreview
              key={index}
              title={idea.title}
              text={idea.desc}
              avatar={idea.authorPhotoUrl ? idea.authorPhotoUrl : ""}
              rating={idea.counter !== 0 ? idea.like / idea.counter : "0"}
              id={idea.id}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ExplorePage;
