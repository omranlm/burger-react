import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.css";
const navigationItems = (props) => (
  <ul className={[classes.NavigationItems,classes.DesktopOnly].join(' ')}>
   
    <li className={classes.NavigationItem}>
      <NavLink 
      to="/" 
      activeClassName={classes.active}
      exact
      >
       Burger Builder
      </NavLink>
      </li>
      <li className={classes.NavigationItem}>
     
      <NavLink 
      to="/orders" 
      exact
      activeClassName={classes.active}
      
      >
        Orders
      </NavLink>
    </li>

  </ul>
);

export default navigationItems;
