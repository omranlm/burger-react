import React, { useEffect,Suspense} from "react";
import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./componenets/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from './containers/Auth/Logout/Logout'
import * as actionCraetor from './store/actions/index'
import { connect } from "react-redux";

const Checkout = React.lazy(()=>
{
  return import ('./containers/BurgerBuilder/Checkout/Checkout')
})


const Orders = React.lazy(()=>
{
  return import ('./containers/Orders/Orders')
})

const Auth = React.lazy(()=>
{
  return import ('./containers/Auth/Auth')
})
const app = props =>
 {
  
  const {onAuthCheckState} = props;

  useEffect(() => {

    onAuthCheckState();

    return () => {
      
    }
  }, [onAuthCheckState])
  // componentDidMount (){
   
  // }
  
    let routes = (
      <Switch>
         <Route path="/auth"  render={(props)=> <Auth {...props} />}/>
         <Route path="/" exact component={BurgerBuilder}></Route>
         <Redirect to="/" ></Redirect>
         
      </Switch>
    );

    if (props.isAuth)
    {
      routes = <Switch>
      <Route path="/checkout" render={(props)=> <Checkout {...props} />} ></Route>
      <Route path="/orders" render={(props)=> <Orders {...props} />} />
      <Route path="/logout"  component={Logout}/>
      <Route path="/auth" render={(props)=> <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" ></Redirect>
     
      </Switch>
      ;
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Suspense fallback="Loading">
              {routes}
            </Suspense>
           

          </Layout>
        </BrowserRouter>
      </div>
    );
  
}

const mapStateToProps = state =>
{
  return {
    isAuth : state.auth.token !== null
  }
}
const mapDispaotch = dispatch =>
{
  return {
    onAuthCheckState: () => dispatch (actionCraetor.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispaotch)(app));
