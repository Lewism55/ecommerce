import React, { useState } from 'react';
import './items.css';

function Items (props) {
    const [count, setCount] = useState(1);
    const [expand, setExpand] = useState(false);

    const minusCount = () => {
        if (count > 1) {
            setCount(count - 1)
        } 
    };

    const addCount = () => {
        if (count > 0) {
            setCount(count + 1)
        }
    };

    const expandBox = () => {
        if (expand === false) {
            setExpand(true);
        } setExpand(false)
    }    

    const addClass = () => { 
        const Y = document.getElementById(props.name); 
        if (Y.className !== "border expand") {
            Y.className += " expand"; 
        }
        const X = document.getElementById(props.image);
        X.style.display = 'flex';
    } 

    const removeClass= () => {
        const Y = document.getElementById(props.name);
        if (Y.className === "border expand") {
        Y.classList.remove("expand")
        }
        const X = document.getElementById(props.image);
        X.style.display = null;
    }



    const item = props
    return(
        <div className='border' id={item.name}>
            <button className='x' onClick={removeClass} id={item.image}>X</button>
            <h2>{item.name}</h2>
            <div>{item.image}</div>
            <div>£{item.price}.00</div>
            <div>{item.description}</div>
            <button onClick={addClass}>expand</button>
            <div>
                <button onClick={minusCount}>-</button>
                {count}
                <button onClick={addCount}>+</button></div>
            <button onClick={() => {props.addItem(item.name, item.price, count)} }>Add to Basket</button>
        </div>
    );
};

export default Items;