import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Shimmer from '../Shimmer';
import Locations from './Locations';
import InitialRestaurants from './InitialRestaurants';
//  import {BrowserRouter,Routes,Route } from 'react-router-dom';

function Home(){

        let[locations,setLocations] =useState({
      lat : "17.37240",
      long :"78.43780"
    })

return <>
<div className='container-fluid'>
          <div className='row'>
          
          <Locations
          setLocations={setLocations}
          />
          <InitialRestaurants
          setLocations = {setLocations}
          locations = {locations}
          />
          

        </div>
      </div>   


</>
}
export default Home;