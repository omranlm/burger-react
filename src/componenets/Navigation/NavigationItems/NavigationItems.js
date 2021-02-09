import React from "react";
import classes from "./NavigationItems.css";
const navigationItems = (props) => (
  <ul className={[classes.NavigationItems,classes.DesktopOnly].join(' ')}>
   
    <li className={classes.NavigationItem}>
      <a 
      href="/" 
      className={classes.active}>
       Burger Builder
      </a>
      </li>
      <li className={classes.NavigationItem}>
      <a 
      href="/" 
      className={classes.notactive}>
        Checkout
      </a>
    </li>

  </ul>
);

export default navigationItems;
