import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import { CarCard } from "./components/CarCard/CarCard";
import styles from "./App.module.scss";

const App: React.FC = () => (
  <div className={styles.app}>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/car" exact component={CarCard} />
      <Redirect to="/" />
    </Switch>
  </div>
);
export default App;
