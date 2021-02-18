import React from 'react'
import classes from './Order.css'
const order = props =>{


    const ingredients=[];

    for (let ing in props.order.ingredients)
        ingredients.push(
            {
                name:ing,
                amount:props.order.ingredients[ing]
            }
        );

        const ingOutput = ingredients.map(ig=>{
            return  <span 
            style={
                {
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 5px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }
            }
            key={ig.name}>{ig.name} ({ig.amount}) </span>
        });
    return(
        <div className={classes.Order}>
            {ingOutput}
            <p>Price <strong>({props.order.price})</strong></p>
        </div>
    )

       
    
}
export default order;
