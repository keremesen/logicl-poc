import { Flex, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Main from "./Pages/Main";

function App() {
  return (
    <>
      <NavBar />
      <Flex
        w="100vw"
        h="93vh"
        direction="row"
        align="center"
        justify="center"
        bgColor="#CBD5E0"
      >
        <Main />
      </Flex>
    </>
  );
}

export default App;
