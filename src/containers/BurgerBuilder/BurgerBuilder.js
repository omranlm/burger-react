import React, { Component, Fragment } from "react";
import Burger from "../../componenets/Burger/Burger";
import BuildControls from "../../componenets/Burger/BuildControls/BuildControls";
import Modal from "../../componenets/UI/Modal/Modal";
import OrderSummary from "../../componenets/Burger/OrderSummary/OrderSummary";
import Spinner from "../../componenets/UI/Spinner/Spinner";
import axios from "../../axios";
import withErrorHander from "../../hoc/withErrorHandler/withErrorHanlder";
import { connect } from "react-redux";
import * as actionCreator from "../../store/actions/index";


class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients:null,
      // totalPrice: 4,
      //purchaseable: false,
      purchasing: false,
      loading: false,
      error: false,
    };
  }
  componentDidMount() {
    // axios.get('/ingredients.json')
    // .then(response=>
    //     {
    //         this.setState({ingredients: response.data});
    //     })
    //     .catch(error=>
    //         {
    //             this.setState({error: true});
    //         })

    this.props.onInitIng(this.props.ing);
  }
  //

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  purchaseHandler = () => {
    if (this.props.isAuth)
      this.setState({ purchasing: true });
    else 
    {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }
  };
  modalClosedhandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinuehandler = () => {

    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    const disabledInfo = { ...this.props.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>App is not avialble</p>
    ) : (
      <Spinner></Spinner>
    );
    // console.log("this.props", this.props);
    if (this.props.ing) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ing}></Burger>
          <BuildControls
            added={(ingName) => this.props.onIngAdded(ingName)}
            removed={(ingName) => this.props.onIngRemoved(ingName)}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCanceled={this.modalClosedhandler}
          purchaseContinue={this.purchaseContinuehandler}
          price={this.props.totalPrice}></OrderSummary>
      );
    }
    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalClosedhandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth : state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngAdded: (ingName) => dispatch(actionCreator.addIngredient(ingName)),
    onIngRemoved: (ingName) =>
      dispatch(actionCreator.removeIngredient(ingName)),
    onInitIng: (ings) => dispatch(actionCreator.initIng(ings)),
    onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
    onSetAuthRedirectPath : (path) => dispatch(actionCreator.setAuthRedirect(path))
  };
};
export default connect(
  mapToProps,
  mapDispatchToProps
)(withErrorHander(BurgerBuilder, axios));
