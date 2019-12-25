import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth-actions";

const Logout = (props: any) => {
  useEffect(() => {
    props.onLogout();
  });
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
