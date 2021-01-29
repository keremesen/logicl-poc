import {
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { db } from "../libs/firebase";
import BannerIdea from "../components/BannerIdea";
import firebase from "../libs/firebase";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";
import DatePicker from "../utils/datePicker";

const IdeaDetail = ({ match, history }) => {
  const [idea, setIdea] = useState(null);
  const [feeling, setFeeling] = useState(0);
  const [comment, setComment] = useState("");
  const [isInteractedBefore, setIsInteractedBefore] = useState(false);

  const [ideaLoading, setIdeaLoading] = useState(true);
  const [interactionLoading, setInteractionLoading] = useState(true);
  const [process, setProcess] = useState(false);

  const [interactions, setInteractions] = useState([]);

  const [inProgress, setInProgress] = useState(false);

  const user = useAuth().user;
  const toast = useToast();
  const ideaId = match.params.ideaId;

  useEffect(() => {
    setIdeaLoading(true);
    setInteractionLoading(true);
    db.collection("ideas")
      .doc(ideaId)
      .get()
      .then((res) => {
        setIdeaLoading(false);
        const ideaTemp = res.data();
        setIdea(ideaTemp);
        if (
          ideaTemp.interactionsId !== undefined &&
          ideaTemp.interactionsId !== null &&
          ideaTemp.interactionsId !== ""
        ) {
          const interactionsDocId = ideaTemp.interactionsId;
          db.collection("interactions")
            .doc(interactionsDocId)
            .get()
            .then((res) => {
              const interactionsTemp = res.data().interactions;
              setInteractions(interactionsTemp);
              setInteractionLoading(false);
            });
        }
      });
  }, [ideaId]);

  useEffect(() => {
    if (idea !== null && interactions.length > 0) {
      const ahmet = interactions.find((e) => e.authorId === user.uid);

      if (ahmet !== "" && ahmet !== null && ahmet !== undefined) {
        setIsInteractedBefore(true);
        setFeeling(ahmet.feeling);
      }
    }
  }, [idea, interactions, user]);

  if (!ideaLoading && idea === null) {
    return <Heading>Bad path.</Heading>;
  }

  return (
    <Flex
      w="1080px"
      height="93vh"
      background="#fff"
      overflowY="auto"
      padding={8}
      position="relative"
      alignItems="flex-start"
      flexDirection="column"
    >
      <Button
        bgColor="red.600"
        position="absolute"
        top="1%"
        left="1%"
        color="white"
        fontSize="24px"
        fontWeight="700"
        zIndex="100"
        _hover={{ bgColor: "red.500" }}
        onClick={() => history.goBack()}
      >
        ←
      </Button>
      <BannerIdea
        idea={idea}
        isBanner={false}
        feeling={feeling}
        setFeeling={!isInteractedBefore && setFeeling}
        isInteractedBefore={isInteractedBefore}
        ideaLoading={ideaLoading}
        interactionLoading={interactionLoading}
      />
      <Flex
        display={!isInteractedBefore && feeling !== 0 ? "flex" : "none"}
        width="100%"
        padding={2}
        mt={6}
        boxShadow="md"
        flexDirection="column"
      >
        <Flex position="relative">
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            isInvalid={comment.length > 362}
            placeholder="Give me some advice, i need some help ova hiye"
          />
          <Text
            fontWeight="600"
            fontSize="14px"
            color="gray.600"
            position="absolute"
            bottom="1%"
            right="1%"
          >
            {362 - comment.length}
          </Text>
        </Flex>
        <Button
          mt={2}
          colorScheme={feeling === 1 ? "blue" : "red"}
          isDisabled={comment.length > 362 || inProgress}
          isLoading={inProgress || process}
          loadingText="Sending feedback."
          onClick={async () => {
            setInProgress(true);
            if (comment.length > 362) return;
            setProcess(true);

            //interaction obj
            const tempInteraction = {
              authorId: user.uid,
              authorName: user.name,
              authorPhotoUrl: user.photoUrl,
              comment: comment,
              createdAt: DatePicker(),
              feeling: feeling,
            };

            const interactionsDocId = idea.interactionsId;
            db.collection("interactions")
              .doc(interactionsDocId)
              .update({
                interactions: firebase.firestore.FieldValue.arrayUnion(
                  tempInteraction
                ),
              })
              .then((res) => {
                if (feeling === 1) {
                  db.collection("ideas")
                    .doc(ideaId)
                    .update({
                      counter: firebase.firestore.FieldValue.increment(1),
                      upVote: firebase.firestore.FieldValue.increment(1),
                    })
                    .then((res) => {
                      setIsInteractedBefore(true);
                      setInteractions([tempInteraction, ...interactions]);
                      toast({
                        title: "Comment sent succesfully.",
                        description: "Thanks for your feedback.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                      setProcess(false);
                      setInProgress(false);
                      history.push(`/i/${ideaId}`);
                    });
                } else if (feeling === -1) {
                  db.collection("ideas")
                    .doc(ideaId)
                    .update({
                      counter: firebase.firestore.FieldValue.increment(1),
                      downVote: firebase.firestore.FieldValue.increment(1),
                    })
                    .then((res) => {
                      setIsInteractedBefore(true);
                      setInteractions([tempInteraction, ...interactions]);
                      toast({
                        title: "Comment sent succesfully.",
                        description: "Thanks for your feedback.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                      setProcess(false);
                      setInProgress(false);
                      history.push(`/i/${ideaId}`);
                    });
                } else {
                  //feeling === 0 ?
                }
              });
          }}
        >
          Give Feedback.
        </Button>
      </Flex>
      <Flex
        bgColor="gray.50"
        width="100%"
        padding={4}
        mt={6}
        boxShadow="base"
        flexDirection="column"
      >
        {ideaLoading || interactionLoading ? (
          <Spinner
            boxSize={12}
            size="md"
            color="red.500"
            alignSelf="center"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
        ) : (
          <>
            <Heading>Interactions</Heading>
            <Text>{interactions.length} interactions</Text>
            <Flex flexDirection="column" alignItems="flex-start">
              {interactions.length > 0 ? (
                interactions.map((interaction) => {
                  if (interaction.comment === "") {
                    return null;
                  }
                  return (
                    <Comment
                      key={interaction.authorId}
                      feeling={interaction.feeling}
                      comment={interaction}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default IdeaDetail;

/**
 * <Flex width="100%" backgroundColor="tomato" p={8}>
        <Avatar
          boxSize={12}
          bgColor="#000"
          src={idea.authorPhotoUrl || ""}
        />
        <Flex direction="column" align="center" mx={4}>
          <Heading size="xl">
            {idea.title}
          </Heading>
          <Text fontSize="lg">{idea.desc}</Text>
        </Flex>
        <Flex mr="10px" ml="130px" backgroundColor="tomato">
          <Text mr="10px">{idea.like}</Text>
          <StarIcon w={6} h={6} />
        </Flex>
      </Flex>
 */

/**
  * 
            //first time feeling start
            if (
              idea.feelingsId === "" ||
              idea.feelingsId === undefined ||
              idea.feelingsId === null
            ) {
              db.collection("feelings")
                .add({ feelings: feelingArray })
                .then((response) => {
                  if (feeling === 1)
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        feelingsId: response.id,
                        counter: firebase.firestore.FieldValue.increment(1),
                        like: firebase.firestore.FieldValue.increment(1),
                      })
                      .then((res) => setIsInteractedBefore(true));
                  else if (feeling === -1)
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        feelingsId: response.id,
                        counter: firebase.firestore.FieldValue.increment(1),
                        disslike: firebase.firestore.FieldValue.increment(1),
                      })
                      .then((res) => setIsInteractedBefore(true));
                });
            } //first time feeling end
            else {
              db.collection("feelings")
                .doc(idea.feelingsId)
                .update({
                  feelings: firebase.firestore.FieldValue.arrayUnion(
                    tempFeeling
                  ),
                })
                .then((res) => {
                  if (feeling === 1)
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        counter: firebase.firestore.FieldValue.increment(1),
                        like: firebase.firestore.FieldValue.increment(1),
                      })
                      .then((res) => setIsInteractedBefore(true));
                  else
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        counter: firebase.firestore.FieldValue.increment(1),
                        disslike: firebase.firestore.FieldValue.increment(1),
                      })
                      .then((res) => setIsInteractedBefore(true));
                });
            }

            //first time comment start
            if (
              idea.commentsId === "" ||
              idea.commentsId === undefined ||
              idea.commentsId === null
            ) {
              db.collection("comments")
                .add({ comments: tempCommentArray })
                .then((response) => {
                  const commentDocId = response.id;
                  db.collection("ideas")
                    .doc(ideaId)
                    .update({ commentsId: commentDocId })
                    .then((res) => {
                      setIsInteractedBefore(true);
                      setCommentsPlural([tempComment, ...commentsPlural]);
                      toast({
                        title: "Comment sent succesfully.",
                        description: "Thank for your feedback.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    });
                });
            } else {
              db.collection("comments")
                .doc(idea.commentsId)
                .update({
                  comments: firebase.firestore.FieldValue.arrayUnion(
                    tempComment
                  ),
                })
                .then((res) => {
                  setIsInteractedBefore(true);
                  setCommentsPlural([tempComment, ...commentsPlural]);
                  toast({
                    title: "Comment sent succesfully.",
                    description: "Thank for your feedback.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                });
            }
  */
