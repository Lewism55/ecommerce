import React from 'react';
import './Basket.css';

function Basket (props) {
    return( 
        <div className='basket-page'>
            <h2 className='basket-text'>Your Basket:</h2>
            {props.basket.length !== 0
            ?<div><table className="basket-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Volume</th>
                        <th>Price</th>
                        <th>Adjust volume</th>
                        <th>Remove Item</th>
                    </tr>
                </thead>
                <tbody>
                    {props.basket.map((item, index) => (
                        <tr key={index}>
                            <td><b> {item.name} </b></td>
                            <td> {item.vol} </td>
                            <td> £{item.price}.00 </td> 
                            <td> <button className='one-more-less' onClick={() => {props.oneLess(item, item.price)} }> -1 </button><button className='one-more-less' onClick={() => {props.oneMore(item, item.price)} }> +1 </button></td>
                            <td> <button className='one-more-less' onClick={() => {props.removeFromBasket(item, item.price, item.vol)} }>remove</button> </td>
                        </tr>)
                    )} 
                </tbody> 
            </table>
            <h3 className='basket-text'>Basket total price: £{props.basketValue}.00</h3>
            </div> 
            :
                <div className="basket-text">Your basket is empty! <br /> Please go back and add some items to your basket</div>
            }
        </div>
    )
}

export default Basket;



