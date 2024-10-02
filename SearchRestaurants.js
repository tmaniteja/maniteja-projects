import axios from 'axios';
import {React,useState,useEffect} from 'react';
import Shimmer from '../Shimmer';
import { useNavigate } from 'react-router-dom';
 function SearchRestaurants(){

    const [restaurant,setRestaurants]= useState("");
    const [restaurantList,setRestaurantList]=useState([]);
    let navigate = useNavigate();



    useEffect(()=>{
        setRestaurantList([]);
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.37240&lng=78.43780&str=${restaurant}&trackingId=a2b23872-7cbc-c0ea-8725-b6546b4a5675&submitAction=ENTER&queryUniqueId=5c28aa05-053c-56ab-86b8-8c008282fb5f`)
        .then((res)=>{
            setRestaurantList(res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT )
        }).catch((err)=>{
            setRestaurantList('error');
        })
    },[restaurant])

    return(<><div style={{paddingTop:"100px",textAlign:"center"}}>
    <h2>Search Restaurants</h2>
    <input  placeholder='Search Restaurant' 
    onChange={(e)=>{
        setRestaurants(e.target.value)
    }}></input>
<div className='container restaurants-container'>
<div className='row row-cols-3 row-cols-md-4 sm-1 g-4'>
    {restaurantList?.cards?.map((item,i)=>{
        
        if(item?.card?.card?.info){
        // console.log(item?.card?.card?.info?.name);
        return <div
        onClick={()=>{
            navigate(`/restaurant/${item?.card?.card?.info?.id}/${item?.card?.card?.info?.name}`)
        }}
         class="col restaurants-container">

        <div class="card h-100 restaurant-card">
        <img src= { `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.cloudinaryImageId}`}  class="card-img" alt="..."/>
          <div class="card-body">
         <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
         <p class="card-text">⭐<span style={{marginLeft : "5px"}}><b>{item?.card?.card?.info?.avgRating ? item?.card?.card?.info?.avgRating : item?.card?.card?.info?.avgRatingString }</b></span>
         <span style={{marginLeft : "15px"}}>
            {/* writing code for delivery bike */}
            <i class="fa-solid fa-motorcycle"></i>
            {/* to here */}
            <b>{item?.card?.card?.info?.sla.slaString}</b></span>
         <p style={{marginBottom:"0px"}} className='card-text'>{item?.card?.card?.info?.cuisines?.slice(0,3).join(',')}</p>
         <p style={{marginTop:"5px"}}
          className='card-text'>{item?.card?.card?.info?.areaName}</p>
         </p>
        </div>
        </div>
        </div>}  
    else if(item?.card?.card?.restaurants) {
        // console.log(item?.card?.card?.info?.name);
   
        return <div class="col restaurants-container"
        onClick={()=>{
            navigate(`/restaurant/${item?.card?.card?.info?.id}/${item?.card?.card?.info?.name}`)
        }}
        >
                    <div class="card h-100 restaurant-card">
                        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${item?.card?.card?.info?.cloudinaryImageId}`} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
                            <p class="card-text">{item?.card?.card?.info?.address}</p>
                            {/* <button className="cart-button"  >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
            Add to cart</button> */}
                        </div>
                    </div>
                        </div>
        } })
        }
        
     </div>   
   </div>
   {restaurant?.length >=2 || restaurantList?.length == 0 ? <Shimmer/>:""}
   </div>
    </>
 )}
 export default SearchRestaurants;