import React, { useState } from 'react';
import './items.css';

function Items (props) {
    const [count, setCount] = useState(1);

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

    const addClass = () => { 
        const Y = document.getElementById(props.name); 
        if (Y.className !== "border expand") {
            Y.className += " expand"; 
        }
        const X = document.getElementById(props.id);
        X.style.display = 'flex';
        const Z = document.getElementById(props.description);
        Z.style.display = 'flex';
        const W = document.getElementById(expandholder);
        W.style.display = 'none';
        console.log(props.image)
    } 

    const removeClass= () => {
        const Y = document.getElementById(props.name);
        if (Y.className === "border expand") {
        Y.classList.remove("expand")
        }
        const X = document.getElementById(props.id);
        X.style.display = null;
        const Z = document.getElementById(props.description);
        Z.style.display = null;
        const W = document.getElementById(expandholder);
        W.style.display = 'inline-block';
    }


    const item = props
    const expandholder = (props.id*props.price)+1000
    return(
        <div className='border' id={item.name}>
            <button className='x' onClick={removeClass} id={item.id}>x</button>
            <h2 className='item-name'>{item.name}</h2>
            <img src={item.image} alt="phone" className="item-image" onClick={addClass}/>
            <div className='item-price'>£{item.price}.00</div>
            <div className='item-description' id={item.description}>{item.description}</div>
            <button className='expand-button more-info' id={expandholder} onClick={addClass}>Info +</button>
            <div className="item-count">
                <button className='other-button plus-minus' onClick={minusCount}>-</button>
                <span> {count} </span>
                <button className='other-button plus-minus' onClick={addCount}>+</button>
            </div>
            <button className='other-button add-to-basket' onClick={() => {props.addItem(item.name, item.price, count); removeClass()}}>Add to Basket</button>
        </div>
    );
};

export default Items;