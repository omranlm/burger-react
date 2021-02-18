import React from 'react'
import { withRouter } from 'react-router';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // console.log('burger',props)
    // console.log('burger props.ingredients', props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + Math.random()} type={igKey}></BurgerIngredient>
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    // console.log(transformedIngredients);
    if (transformedIngredients.length === 0)
        transformedIngredients = <p>Pelase start adding ingredients </p>;
   
    return (

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>

    );
}

export default withRouter(burger) ;