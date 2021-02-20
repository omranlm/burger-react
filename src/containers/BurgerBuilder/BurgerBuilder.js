import React, { useState, Fragment, useEffect, useCallback } from "react";
import Burger from "../../componenets/Burger/Burger";
import BuildControls from "../../componenets/Burger/BuildControls/BuildControls";
import Modal from "../../componenets/UI/Modal/Modal";
import OrderSummary from "../../componenets/Burger/OrderSummary/OrderSummary";
import Spinner from "../../componenets/UI/Spinner/Spinner";
import axios from "../../axios";
import withErrorHander from "../../hoc/withErrorHandler/withErrorHanlder";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../store/actions/index";

const burgerBuilder = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // ingredients:null,
  //     // totalPrice: 4,
  //     //purchaseable: false,
  //     purchasing: false,
  //     loading: false,
  //     error: false,
  //   };
  // }
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  
  const onIngAdded = (ingName) =>   dispatch(actionCreator.addIngredient(ingName));
  const onIngRemoved = (ingName) =>   dispatch(actionCreator.removeIngredient(ingName));
  const onInitIng = useCallback(
    (ings) => dispatch(actionCreator.initIng(ings))
  ,[]);
  const onInitPurchase = () => dispatch(actionCreator.purchaseInit());
  const onSetAuthRedirectPath = (path) =>   dispatch(actionCreator.setAuthRedirect(path));

  // ing: state.burgerBuilder.ingredients,
  // totalPrice: state.burgerBuilder.totalPrice,
  // error: state.burgerBuilder.error,
  // isAuth: state.auth.token !== null,
  const ing = useSelector (state=> state.burgerBuilder.ingredients);
  const totalPrice = useSelector (state=> state.burgerBuilder.totalPrice);
  const error = useSelector (state=> state.burgerBuilder.errors);
  const isAuth = useSelector (state=> state.auth.token !== null);
  


  //const { onInitIng } = props;
  useEffect(() => {
    onInitIng(ing);
    return () => {};
  }, [onInitIng]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  const purchaseHandler = () => {
    if (isAuth) setPurchasing(true);
    else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };
  const modalClosedhandler = () => {
    setPurchasing(false);
  };
  const purchaseContinuehandler = () => {
    onInitPurchase();
    props.history.push({
      pathname: "/checkout",
    });
  };

  const disabledInfo = { ...ing };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>App is not avialble</p> : <Spinner></Spinner>;
  // console.log("this.props", this.props);
  if (ing) {
    burger = (
      <Fragment>
        <Burger ingredients={ing}></Burger>
        <BuildControls
          added={(ingName) => onIngAdded(ingName)}
          removed={(ingName) => onIngRemoved(ingName)}
          disabledInfo={disabledInfo}
          price={totalPrice}
          purchaseable={updatePurchaseState(ing)}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ing}
        purchaseCanceled={modalClosedhandler}
        purchaseContinue={purchaseContinuehandler}
        price={totalPrice}></OrderSummary>
    );
  }
  //if (loading) orderSummary = <Spinner />;

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={modalClosedhandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};


export default (withErrorHander(burgerBuilder, axios));
