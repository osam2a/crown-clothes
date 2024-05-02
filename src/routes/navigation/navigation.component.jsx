import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../context/user.context';
import { CartsContext } from '../../context/Cart.context';

import CartIcon from '../../componet/cart-icon/CardIcon.component';
import CartDropdown from '../../componet/cart-dropdown/CartDropdown';
const navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartsContext);

  return (
    <>
      <div className='navigation p-5 flex justify-between items-center relative'>
        {/* LOGO */}
        <div>
          <Link to='/'>
            <div className='w-fit'>logo</div>
          </Link>
        </div>
        {/* OPTIONS */}
        <div className='navigation-opations  flex justify-evenly items-center gap-6 text-lg font-bold '>
          <div>
            <Link to='/'>HOME</Link>
          </div>

          <div>
            <Link to='/shop'>SHOP</Link>
          </div>

          <div>
            <Link to='/cheackout'>CHEAKOUT</Link>
          </div>

          <div>
            <Link to='/about'>ABOUT</Link>
          </div>

          <div>
            {currentUser ? (
              <button
                type='button'
                onClick={signOutUser}
                className='nav-link uppercase'
              >
                sing out
              </button>
            ) : (
              <Link to='/auth' className='uppercase'>
                Sign In
              </Link>
            )}
          </div>

          <div>
            <CartIcon />
          </div>
        </div>
        {/* PRODUCTS */}
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default navigation;
