import { Flex, Heading } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Main from "./Pages/Main";

function App() {
  return (
    <>
      <Flex bgColor='gray.200' w='100vw' h='100vh' align='center' justify='center'>
        <Heading fontSize='96px' fontWeight='500' color='gray.700'>coming soon...</Heading>
      </Flex>
    </>
  );
}
/**
 * 
 *       <NavBar />
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
 */
export default App;
