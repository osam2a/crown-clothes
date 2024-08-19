import { createContext, useEffect, useReducer, useState } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const flag = cartItems.find((e) => e.id === productToAdd.id);

  if (flag)
    return cartItems.map((element) =>
      element.id === productToAdd.id
        ? { ...element, quntity: element.quntity + 1 }
        : element
    );

  return [...cartItems, { ...productToAdd, quntity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const flag = cartItems.find(
    (e) => e.quntity >= 2 && e.id === productToRemove.id
  );

  if (flag)
    return cartItems.map((element) => {
      if (element.id === productToRemove.id && element.quntity >= 2)
        return { ...element, quntity: element.quntity - 1 };
      else return element;
    });
  return cartItems.filter((e) => e.id !== productToRemove.id);
};

export const clearItem = (cartItems, productToRemove) => {
  return cartItems.filter((e) => e.id !== productToRemove.id);
};

export const CartsContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  /* ***** ***  ***** */
  items: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  /* ***** ***  ***** */
  totalPrice: 0,
  setTotalPrice: () => {},
  /********** */
  cartCounter: 0,
  setCartCounter: () => {},
});

const INITAIL_STATE = {
  isCartOpen: false,
  setIsCartOpen: () => {},
  items: [],
  totalPrice: 0,
  cartCounter: 0,
};

const CART_ACTION = {
  UPDATE_ITEMS: `UPDATE_ITEMS`,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case CART_ACTION.UPDATE_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cart`);
  }
};
export const CartsProvider = ({ children }) => {
  const [{ items, totalPrice, cartCounter }, dispatch] = useReducer(
    cartReducer,
    INITAIL_STATE
  );

  const addToCartAction = (itemToAdd) => {
    const newCartCounter = items.reduce(
      (total, cartItem) => total + cartItem.quntity,
      0
    );
    const newTotalPrice = items.reduce(
      (total, cartItem) => (total += cartItem.quntity * cartItem.price),
      0
    );
    dispatch({
      type: CART_ACTION.UPDATE_ITEMS,
      payload: {
        items: itemToAdd,
        cartCounter: newCartCounter,
        totalPrice: newTotalPrice,
      },
    });
  };

  console.log(items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const [items, setItems] = useState([]);
  // const [cartCounter, setCartCounter] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // const setTotalPriceEffect = useEffect(() => {
  //   const newCartCounter = items.reduce(
  //     (total, cartItem) => total + cartItem.quntity,
  //     0
  //   );
  //   setCartCounter(newCartCounter);
  // }, [items]);

  // const setQuntityEffect = useEffect(() => {
  //   const newTotalPrice = items.reduce(
  //     (total, cartItem) => (total += cartItem.quntity * cartItem.price),
  //     0
  //   );
  //   setTotalPrice(newTotalPrice);
  // }, [items]);

  const getItemsFromLocalStorage = useEffect(() => {
    if (localStorage.getItem(`pro`))
      addToCartAction(JSON.parse(localStorage.getItem(`pro`)));
  }, []);

  const addItemToCart = (productToAdd) => {
    const newItem = addCartItem(items, productToAdd);
    localStorage.setItem(`pro`, JSON.stringify(newItem));
    addToCartAction(newItem);
  };

  const removeItemFromCart = (productToRemove) => {
    const removeItem = removeCartItem(items, productToRemove);
    addToCartAction(removeItem);
    localStorage.setItem(`pro`, JSON.stringify(removeItem));
  };

  const clearCart = (productToClear) => {
    const clearCart = clearItem(items, productToClear);
    addToCartAction(clearCart);
    localStorage.setItem(`pro`, JSON.stringify(clearCart));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    /** */
    items,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    /* */
    cartCounter,
    totalPrice,
  };

  return (
    <CartsContext.Provider value={value}>{children}</CartsContext.Provider>
  );
};
