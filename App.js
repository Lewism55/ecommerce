import React, { useState } from 'react';
import './App.css';
import Items from '../Items/Items.js';
import productList from '../ProductList/ProductList.js';
import Basket from '../Basket/Basket.js';

function App() {
  const [moreActive, setMoreActive] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);
  const [basket, setBasket] = useState([]);
  const [basketValue, setBasketValue] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [addedToBasket, setAddedToBasket] = useState(false);
  const [newItem, setNewItem] = useState({});

  const openCloseMore = () => {
    if (moreActive === false) {
      setMoreActive(true)
    } else {
      setMoreActive(false)
    }
  };

  const openBasket = () => {
      console.log('basket opened');
      let mixedBasket = basket;
      let result = [];
      mixedBasket.forEach(function (a) {
        if (!this[a.name]) {
          this[a.name] = { name: a.name, price: a.price, vol: 0 };
          result.push(this[a.name])
        }
        this[a.name].vol += a.vol;
      }, Object.create(null));

      console.log(result);
      setBasket(result)
      setActiveBasket(true);
      setAddedToBasket(false);
  };

  const closeBasket = () => {
    setActiveBasket(false);
    setIsShown(false);
  }

  const  handleAddToBasket = (item, price, count) => {
    let currentBasket = basket;
    let newBasket;
    newBasket = currentBasket.concat({name: item, price: price, vol: count});
    setBasket(newBasket); 
    let newBasketValue = basketValue;
    newBasketValue = newBasketValue + (price * count);
    setBasketValue(newBasketValue);
    closeItemAlert();
    const newItem = {name: item, price: price, vol: count}
    newItemAlert(newItem);
  }

  const handleRemoveFromBasket = (itemX, price, vol) => {
    let currentBasket = basket;
    currentBasket = currentBasket.filter(item => item.name !== itemX.name);
    setBasket(currentBasket);
    let newBasketValue = basketValue;
    newBasketValue = newBasketValue - (price * vol);
    setBasketValue(newBasketValue);
  }

  const oneMore = (itemX, price) => {
    const index = basket.findIndex(item => item.name === itemX.name);
    let newBasket = basket;
    let currentVolume = newBasket[index].vol
    newBasket[index] = {...newBasket[index], vol: currentVolume + 1};
    setBasket(newBasket);
    let newBasketValue = basketValue;
    newBasketValue = newBasketValue + price;
    setBasketValue(newBasketValue);
  }

  const oneLess = (itemX, price) => {
    const index = basket.findIndex(item => item.name === itemX.name);
    let newBasket = basket;
    let currentVolume = newBasket[index].vol
    if (currentVolume > 1) {
      newBasket[index] = {...newBasket[index], vol: currentVolume - 1};
      setBasket(newBasket);
      let newBasketValue = basketValue;
      newBasketValue = newBasketValue - price;
      setBasketValue(newBasketValue);
    }
  }

  const hoverBasket = () => {
    console.log('hover opened');
    if (basket.length > 0 ) {
      let mixedBasket = basket;
      let result = [];
      mixedBasket.forEach(function (a) {
        if (!this[a.name]) {
          this[a.name] = { name: a.name, price: a.price, vol: 0 };
          result.push(this[a.name])
        }
        this[a.name].vol += a.vol;
      }, Object.create(null));

      console.log(result);
      setBasket(result);
      setIsShown(true);
    } 
  }

  const newItemAlert = (newlyAddedItem) => {
  let check = newItem
  setNewItem(newlyAddedItem);
  setAddedToBasket(true);
  setTimeout(() => {
    if ( check === newItem ) {
      closeItemAlert();
    }
  }, 3000);
  }

  const closeItemAlert = () => {
  setAddedToBasket(false);
  setNewItem([]);
  }


  return (
    <div className="app">
      <header>
        <h1 className="ecommerce">EveryGen</h1>
        {activeBasket !== true
        ? <div><button className="basket-button"
        onClick={openBasket} 
        onMouseEnter={hoverBasket}
        onMouseLeave={() => setIsShown(false)}><h2 >Basket:<br />£{basketValue}</h2></button>
        {isShown && (
          <div className='hover-basket'>
            {basket.map(item => (
            <div key={item.id}>{item.name} x {item.vol}</div> 
            ))}
          </div>
        )}</div>
        : <>
          <button onClick={closeBasket} className="basket-button"><h2>Back to Shopping</h2></button>
          <button className="basket-button"><h2>Basket: £{basketValue}</h2></button>
          </>
        }
      </header>

    <div className="main-background">
      <div>
      {addedToBasket === false 
      ? <div></div>
      : <div className="new-item-popup">
        <div>you have added a new item!</div>
        <div>{newItem.name} -- 
        £{newItem.price}.00 x 
        {newItem.vol}</div>
        <button className="popup-close" onClick={closeItemAlert} >Close</button>
      </div>
      }
      </div>
      
      {activeBasket !== true
      ?
      <div className='subheader'><h2>Phones</h2>
        <p>EveryGen provides brand new iPhones from every generation!</p>
        <div className='grid'>
        {productList.slice(0, 6).map(item => <Items 
        key={item.id} 
        {...item} 
        addItem={handleAddToBasket} 
        newItem={newItemAlert}
        />)}
        </div>
        <div>
          {moreActive !== true
          ? <button onClick={openCloseMore} className="more-less">v  More  v</button>
          : <><div className='grid'>
            {productList.slice(6, 12).map(item => <Items 
            key={item.id} 
            {...item} 
            addItem={handleAddToBasket} 
            newItem={newItemAlert}
            />)}
          </div>
          <button onClick={openCloseMore} className="more-less">^ Less ^</button>
          </>
          }
        </div>
      </div>
       : <Basket
       basket={basket} 
       key={basket.id} 
       basketValue={basketValue} 
       removeFromBasket={handleRemoveFromBasket}
       oneMore={oneMore}
       oneLess={oneLess}
       />
      }
    </div>
      

      <footer>
        <h3>Designed by Michael Lewis</h3>
      </footer>
    </div>
  );
}

export default App;
