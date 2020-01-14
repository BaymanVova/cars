import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth-actions";
import Login from "./components/Login/Login";
import { CarCard } from "./components/CarCard/CarCard";

import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import Registration from "./components/Registration/Registration";
import { Properties } from "./components/Properties/Properties";
import Logout from "./components/Logout/Logout";
import { Content } from "./components/common/Content/Content";

class App extends Component<any> {
  constructor(props: any) {
    super(props);
    this.props.onTryAutoSignup();
  }

  render() {
    if (this.props.isInit) {
      if (this.props.isAuth) {
        return (
          <div>
            <Navbar />
            <Content>
              <Switch>
                <Route path="/" exact component={CarCard} />
                <Route path="/property" exact component={Properties} />
                <Route path="/logout" component={Logout} />
                <Redirect to="/" />
              </Switch>
            </Content>
          </div>
        );
      } else {
        return (
          <div className={styles.app}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={Registration} />
              <Redirect to="/" />
            </Switch>
          </div>
        );
      }
    }
    // TODO: Добавить спинер
    return <div>Спинер</div>;
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.token !== null,
    isInit: state.auth.initialized
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
