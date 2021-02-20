import React, {  Fragment, } from "react";

import Modal from "../../componenets/UI/Modal/Modal";
import useHttpErrorHandler from '../../hooks/http-error-handler'
const withErrorHandler = (WrappedComponenet, axios) => {
  return props =>
   {
   
        const [error,errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <Fragment>
              <Modal show={error}
              modalClosed={errorConfirmedHandler}>
                  {error && error.message }
              </Modal>
              <WrappedComponenet {...props} />
            </Fragment>
          );
    
  };
};

export default withErrorHandler;
