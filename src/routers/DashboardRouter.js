/* eslint-disable react/react-in-jsx-scope */
import { Switch, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import React from "react";
import { Redirect } from "react-router-dom";
const DashboardRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={JournalScreen} />
      <Redirect to="/"/>
    </Switch>
  );
};

export default DashboardRouter;
