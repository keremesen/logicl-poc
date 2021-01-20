import logo from "./logo.svg";
import "./App.css";
import { Flex, flexbox, Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="center"
        width="100vw"
        height="100vh"
        bgColor="#CBD5E0"
      >
        <Heading size="xl" color='#2D3748'>Coming Soon</Heading>
      </Flex>
    </>
  );
}

export default App;
