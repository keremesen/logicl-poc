import { CSSReset, Flex } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ExplorePage from "./Pages/ExplorePage";
import Main from "./Pages/Main";
import Auth from "./Pages/Auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ShareIdea from "./Pages/ShareIdea";
import Profile from "./Pages/Profile";
import IdeaDetail from "./Pages/IdeaDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CSSReset />
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
            <Route path="/" exact component={Main} />

            <Route path="/explore" component={ExplorePage} />

            <Route path="/share" component={ShareIdea} />

            <Route path="/auth" component={Auth} />

            <Route path="/profile" component={Profile} />

            <Route path="/i/:ideaId" component={IdeaDetail} />
          </Switch>
        </Flex>
      </AuthProvider>
    </Router>
  );
}

export default App;
