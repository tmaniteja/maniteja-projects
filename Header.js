import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import myImage from './tejsty-express.png'
import 'animate.css';

function Header() {
let cartItems = useSelector((state)=>
state.cartItems
)

    return  <div id="header" className='nav nav-underline' style={{position: "fixed",
      width: "100%"}}>
       
      <Link className='Header-title navbar-brand' to ="/"><a >
        <img src={myImage} className='animate__animated animate__backInLeft' alt='brand-logo' style={{height:"50px",width:"100px"}}/></a></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <NavLink to="/searchDishes" activeClassname="nav-link active" className='Header-title nav-link navbar-toggler'>
    <a className='Header-title'>Search Dishes</a></NavLink>
    <NavLink to="/searchRestaurants" activeClassname="nav-link active"className='Header-title nav-link navbar-toggler'>
    <a className='Header-title'>Search Restaurants</a></NavLink>
          {/* <Link className='Header-title navbar-toggler' to="/searchDishes"><a className='Header-title '>Search Dishes</a></Link>
          <Link className='Header-title navbar-toggler' to="/searchRestaurants"><a className='Header-title'>Search Restaurants</a></Link> */}
      {/* <a className='Header-title'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>Cart</a> */}
<NavLink className='Header-title nav-link navbar-toggler' activeClassname="nav-link active" to ="/cart">
<a className='Header-title'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>Cart</a> <span class="badge text-bg-warning">{cartItems.length}</span>
</NavLink>
    </div>
}

export default Header;