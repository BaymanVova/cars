import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth-actions";
import Login from "./components/Login/Login";
import CarCard from "./components/CarPage/CarCard/CarCard";
import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import Registration from "./components/Registration/Registration";
import { Properties } from "./components/Properties/Properties";
import Logout from "./components/Logout/Logout";
import { Content } from "./components/common/Content/Content";
import CarInfo from "./components/CarPage/CarDetail/CarDetail";

const App: React.FC = (props: any) => {
  useEffect(() => props.onTryAutoSignup(), []);

  console.log("App");
  if (props.isInit) {
    if (props.isAuth) {
      return (
        <div>
          <Navbar />
          <Content>
            <Switch>
              <Route path="/property" exact component={Properties} />
              <Route path="/logout" component={Logout} />
              <Route path={"/car"} exact component={CarCard} />
              <Route path={"/car/:id"} component={CarInfo} />
              <Redirect to="/car" />
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
};

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
