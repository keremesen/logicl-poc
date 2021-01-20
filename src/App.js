import { Flex, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Main from "./Pages/Main";

function App() {
  return (
    <>
      <NavBar />
      <Flex
        w="100vw"
        h={100%-7}
        direction="row"
        align="center"
        justify="center"
        width="100%"
        height="auto"
        bgColor="#CBD5E0"
      >
        <Main />
      </Flex>
    </>
  );
}

export default App;
