import { Flex } from "@chakra-ui/react";
import IdeaGroup from "../components/IdeaGroup";
import Menu from "../components/Menu";
import BannerIdea from "../components/BannerIdea";

const bannerIdea = {
  title: "banneridea",
  avatar: "",
  text:
    "Daha geniş bir ifadeyle paragraf; bir duyguyu, bir düşünceyi bir isteği, bir durumu, bir öneriyi, olayın bir yönünü, yalnızca bir yönüyle anlatım tekniklerinden ve düşünceyi geliştirme yollarından yararlanarak anlatan yazı türüdür. Kelimeler cümleleri, cümleler paragrafları, paragraflar da yazıları oluşturur.",
  rating: "5",
};

const ideas = [
  {
    title: "basasdasdasdasdasdlik",
    avatar: "",
  },
  {
    title: "basliasdasdask",
    avatar: "",
  },
  {
    title: "baslasdasdasik",
    avatar: "",
  },
  {
    title: "basliasfasdgfasdgk",
    avatar: "",
  },
];
function Main() {
  return (
    <>
      <Flex w="1080px" h="100%" bgColor="#fff" p="64px" direction="column">
        <BannerIdea idea={bannerIdea} />
        <Flex flexDirection="row">
          <Menu />
          <Flex flexDirection="column" marginLeft="48px">
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
            <IdeaGroup list={ideas} title="Emre Mert" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Main;
