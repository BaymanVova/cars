import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth-actions";
import Login from "./components/Login/Login";
import CarCard from "./components/CarPage/CarCard/CarCard";
import styles from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import Registration from "./components/Registration/Registration";
import Properties from "./components/Properties/Properties";
import Logout from "./components/Logout/Logout";
import { Content } from "./components/common/Content/Content";
import CarInfo from "./components/CarPage/CarDetail/CarDetail";
import { Spinner } from "./components/common/Spinner/Spinner";
import AddProperty from "./components/Properties/AddProperty";
import AddCar from "./components/CarPage/AddCar/AddCar";

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
              <Route path="/property/add" component={AddProperty} />
              <Route path="/property/edit/:id" component={AddProperty} />
              <Route path="/property" component={Properties} />
              <Route path="/logout" component={Logout} />
              <Route path={"/car"} exact component={CarCard} />
              <Route path={"/car/add"} exact component={AddCar} />
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
            <Route path={"/car/:id"} exact component={CarInfo} />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }
  }
  return <Spinner />;
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
