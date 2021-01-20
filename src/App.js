import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExplorePage from "./Pages/ExplorePage";
import Main from "./Pages/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Flex
        w="100vw"
        h={100 % -7}
        direction="row"
        align="center"
        justify="center"
        width="100%"
        height="auto"
        bgColor="#CBD5E0"
      >
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/explore">
            <ExplorePage />
          </Route>
        </Switch>
      </Flex>
    </Router>
  );
}

export default App;
