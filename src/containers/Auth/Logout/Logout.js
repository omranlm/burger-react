import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import * as actions from "../../../store/actions/index";

const logout = (props) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
    return () => {};
  }, [onLogout]);

  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(logout);
