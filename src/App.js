import { Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExplorePage from "./Pages/ExplorePage";
import Main from "./Pages/Main";
import Auth from "./Pages/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ShareIdea from "./Pages/ShareIdea";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Flex
          w="100vw"
          direction="column"
          align="center"
          height="100%"
          bgColor="#CBD5E0"
          style={{ minHeight: `calc(100vh - 60px)` }}
        >
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>

            <Route path="/explore">
              <ExplorePage />
            </Route>
            <Route path="/share">
              <ShareIdea />
            </Route>

            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Flex>
      </AuthProvider>
    </Router>
  );
}

export default App;
