import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth-actions";
import Login from "./components/Login/Login";
import { CarCard } from "./components/CarCard/CarCard";

import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import Registration from "./components/Registration/Registration";
import { Properties } from "./components/Properties/Properties";
import Logout from "./components/Logout/Logout";

const App: React.FC = (props: any) => {
  useEffect(() => props.onTryAutoSignup());
  if (props.isAuth) {
    console.log("авторизован");
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={CarCard} />
          <Route path="/property" exact component={Properties} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    );
  } else {
    console.log(" не авторизован");
    return (
      <div className={styles.app}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Registration} />
        </Switch>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.token !== null
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
