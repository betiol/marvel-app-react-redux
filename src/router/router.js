import React from "react";

import ComicsScreen from "../screens/ComicsScreen";
import ComicsDetails from "../screens/ComicsDetails";
import CharactersScreen from "../screens/CharactersScreen";
import CharacterDetails from "../screens/CharacterDetails";
import HomeScreen from "../screens/HomeScreen";

import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/comics" component={ComicsScreen} />
      <Route exact path="/comic/:id" component={ComicsDetails} />
      <Route exact path="/character/:id" component={CharacterDetails} />
      <Route exact path="/characters" component={CharactersScreen} />
    </Switch>
  );
};

export default withRouter(Router);
