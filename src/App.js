import logo from "./logo.svg";
import "./App.css";
import { Flex, flexbox, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar/>
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
