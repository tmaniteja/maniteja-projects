import React ,{useEffect,useState} from 'react';
import './App.css';
import Home from "./Components/Home"

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Components/Header';
// import Header1 from './Components/Header1';
import RestaurantSpec from './Components/RestaurantSpec';
import SearchDishes from './Components/SearchDishes';
import SearchRestaurants from './Components/SearchRestaurants';
import Cart from './Components/Cart';
import { Provider } from 'react-redux';
//https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

function App(){

  var a,b;

  return<> <div>

    <BrowserRouter>
    <Header/> 
    <Routes>
    <Route path='/' element ={ <Home/>}/>
    <Route path='/restaurant/:restaurantId/:restaurantName' element = {<RestaurantSpec/>}  />
    <Route path='/searchDishes' element={<SearchDishes/>}/>
    <Route path='/searchRestaurants' element={<SearchRestaurants/>}/>
    <Route path='/cart' element={<Cart/>}/>
     </Routes>
     </BrowserRouter>
     
        <div>
          
    </div>
  
    </div>
    
{/* <p><b> {item.info.name}</b> </p>
// <img className='restaurant-image'
//  src ={ `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}/>
// </div> */} 
    </>
    }
   

export default App;