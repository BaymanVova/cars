import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth-actions";

interface Props {
  onLogout: () => void;
}
const Logout: React.FC<Props> = props => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
