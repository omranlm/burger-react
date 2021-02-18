import React, { Component, Fragment } from "react";

import Modal from "../../componenets/UI/Modal/Modal";
const withErrorHandler = (WrappedComponenet, axios) => {
  return class extends Component {
    state = {
        error: null
    }
   
    constructor (props)
    {
        // console.log(' withErrorHandler constructor ');
       
        super(props);
        this.reqInter = axios.interceptors.request.use(req=>
            {
                this.setState({error: null});
                return req;
            })
            this.resInter = axios.interceptors.response.use(res => res,error=>
            {
                this.setState({error: error});

            })
    }

    componentWillUnmount ()
    {
        // console.log(' withErrorHandler componentWillUnmount ');
        axios.interceptors.request.eject(this.reqInter);
        axios.interceptors.response.eject(this.resInter);
    }
   
    errorConfirmedHandler =()=>
    {
        this.setState({error: null});
    }
    render()
    {
        return (
            <Fragment>
              <Modal show={this.state.error}
              modalClosed={this.errorConfirmedHandler}>
                  {this.state.error?this.state.error.message : null}
              </Modal>
              <WrappedComponenet {...this.props} />
            </Fragment>
          );
    }
  };
};

export default withErrorHandler;
