import { createContext, useEffect, useReducer } from 'react';

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
  items: [],
  totalPrice: 0,
  cartCounter: 0,
};

const CART_ACTION = {
  UPDATE_ITEMS: `UPDATE_ITEMS`,
  IS_CART_OPEN: `IS_CART_OPEN`,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION.UPDATE_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cart`);
  }
};
export const CartsProvider = ({ children }) => {
  const [{ items, totalPrice, cartCounter, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITAIL_STATE
  );

  const updateCartItemsREducer = (newItem) => {
    const newCartCounter = newItem.reduce(
      (total, cartItem) => total + cartItem.quntity,
      0
    );
    const newTotalPrice = newItem.reduce(
      (total, cartItem) => (total += cartItem.quntity * cartItem.price),
      0
    );
    dispatch({
      type: CART_ACTION.UPDATE_ITEMS,
      payload: {
        items: newItem,
        cartCounter: newCartCounter,
        totalPrice: newTotalPrice,
      },
    });
  };
  // const [isCartOpen, setIsCartOpen] = useState(false);
  const setIsCartOpen = (state) => {
    dispatch({ type: CART_ACTION.IS_CART_OPEN, payload: state });
  };
  const getItemsFromLocalStorage = useEffect(() => {
    if (localStorage.getItem(`product`))
      updateCartItemsREducer(JSON.parse(localStorage.getItem(`product`)));
  }, []);

  const addItemToCart = (productToAdd) => {
    const newItem = addCartItem(items, productToAdd);
    localStorage.setItem(`product`, JSON.stringify(newItem));
    updateCartItemsREducer(newItem);
  };

  const removeItemFromCart = (productToRemove) => {
    const removeItem = removeCartItem(items, productToRemove);
    localStorage.setItem(`product`, JSON.stringify(removeItem));
    updateCartItemsREducer(removeItem);
  };

  const clearCart = (productToClear) => {
    const clearCart = clearItem(items, productToClear);
    localStorage.setItem(`product`, JSON.stringify(clearCart));
    updateCartItemsREducer(clearCart);
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
