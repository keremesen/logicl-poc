import {
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { db } from "../libs/firebase";
import FullScreenSpinner from "../components/FullScreenSpinner";
import BannerIdea from "../components/BannerIdea";
import firebase from "../libs/firebase";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";

const IdeaDetail = ({ match, history }) => {
  const [idea, setIdea] = useState(null);
  const [feeling, setFeeling] = useState(0);
  const [comment, setComment] = useState("");
  const [isInteractedBefore, setIsInteractedBefore] = useState(false);
  const [loading, setLoading] = useState(true);

  const [feelingsPlural, setFeelingsPlural] = useState([]);
  const [commentsPlural, setCommentsPlural] = useState([]);

  const user = useAuth().user;
  const toast = useToast();
  const ideaId = match.params.ideaId;

  useEffect(() => {
    db.collection("ideas")
      .doc(ideaId)
      .get()
      .then((snapshot) => {
        setIdea(snapshot.data());
        const feelingsId = snapshot.data().feelingsId;
        const commentsId = snapshot.data().commentsId;

        if (
          feelingsId !== "" &&
          feelingsId !== null &&
          feelingsId !== undefined &&
          commentsId !== "" &&
          commentsId !== null &&
          commentsId !== undefined
        ) {
          db.collection("feelings")
            .doc(feelingsId)
            .get()
            .then((response) => {
              setFeelingsPlural(response.data().feelings);
              const responseFeelings = response.data().feelings;
              if (user) {
                if (responseFeelings.length > 0) {
                  responseFeelings.map((feeling) => {
                    if (feeling.authorId === user.uid) {
                      setFeeling(feeling.feeling);
                      setIsInteractedBefore(true);
                    }
                    return null;
                  });
                }
              }
            });
          db.collection("comments")
            .doc(commentsId)
            .get()
            .then((response) => setCommentsPlural(response.data().comments));
        }
      });
    setLoading(false);
  }, [ideaId, user]);

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (idea === null) {
    return <FullScreenSpinner />;
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
          isDisabled={comment.length > 362}
          onClick={() => {
            if (comment.length > 362) return;

            //feeling obj
            const tempFeeling = {
              authorId: user.uid,
              feeling: feeling,
            };
            const feelingArray = [tempFeeling];

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
                        counter: idea.counter + 1,
                        like: idea.like + 1,
                      })
                      .then((res) => setIsInteractedBefore(true));
                  else
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        feelingsId: response.id,
                        counter: idea.counter + 1,
                        disslike: idea.disslike + 1,
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
                        counter: idea.counter + 1,
                        like: idea.like + 1,
                      })
                      .then((res) => setIsInteractedBefore(true));
                  else
                    db.collection("ideas")
                      .doc(ideaId)
                      .update({
                        counter: idea.counter + 1,
                        disslike: idea.disslike + 1,
                      })
                      .then((res) => setIsInteractedBefore(true));
                });
            }

            //date
            let day = new Date().getDate();
            let month = new Date().getMonth();
            let year = new Date().getFullYear();
            let hour = new Date().getHours();
            let minute = new Date().getMinutes();
            let second = new Date().getSeconds();

            let time = `${day}-${month}-${year} ${hour}:${minute}:${second}`;

            //comment obj
            const tempComment = {
              authorId: user.uid,
              authorName: user.name,
              authorPhotoUrl: user.photoUrl,
              comment: comment,
              createdAt: time,
            };

            const tempCommentArray = [tempComment];

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
            //first time comment end
          }}
        >
          Comment
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
        <Heading>Comments</Heading>
        <Flex flexDirection="column">
          {commentsPlural.map((comment) => {
            const commenterId = comment.authorId;
            const feeling = feelingsPlural.find(
              (e) => e.authorId === commenterId
            );

            return (
              <Comment
                key={comment.authorId}
                feeling={feeling}
                comment={comment}
              />
            );
          })}
        </Flex>
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
