import React, { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import IdeaGroup from "../components/IdeaGroup";
import BannerIdea from "../components/BannerIdea";
import { db } from "../libs/firebase";
import FullScreenSpinner from "../components/FullScreenSpinner";

function Main() {
  const [banner, setBanner] = useState(null);
  const [todaysHit, setTodaysHit] = useState({ displayText: "", hits: [] });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    db.collection("ideas")
      .where("isBanner", "==", true)
      .get()
      .then((res) => {
        if (res.docs.length > 0) {
          const tempBanner = { id: res.docs[0].id, ...res.docs[0].data() };
          setBanner(tempBanner);
        }
        db.collection("selecteds")
          .doc("todays-hits")
          .get()
          .then((res) => {
            if (res.exists) {
              const selectionName = res.data().displayText;
              const ideaIds = res.data().ideas;
              ideaIds.map((ideaId) => {
                db.collection("ideas")
                  .doc(ideaId)
                  .get()
                  .then((res) => {
                    const idea = { id: res.id, ...res.data() };
                    setTodaysHit({
                      displayText: selectionName,
                      hits: [idea, ...todaysHit.hits],
                    });
                  });
                return null;
              });
            }
            setLoading(false);
          });
      });
  }, []);

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <>
      <Flex w="1080px" h="100%" bgColor="#fff" p="24px" direction="column">
        {banner !== null && <BannerIdea idea={banner} />}
        <Flex flexDirection="column" mx={4}>
          {todaysHit !== null || todaysHit.hits.length < 1 ? (
            <Heading my={4} mx='auto' size="lg">No selection lists found.</Heading>
          ) : (
            <IdeaGroup list={todaysHit.hits} title={todaysHit.displayText} />
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default Main;
