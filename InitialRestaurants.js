import React ,{useEffect,useState} from 'react';
import axios from 'axios';
import '../App.css';
import Shimmer from '../Shimmer'; 
import {useNavigate} from 'react-router-dom'


function InitialRestaurants({locations,setLocations}){

    let[restaurants,setRestaurants]= useState([]);
    let[userSearch,setUserSearch]=useState("");
    let[filteredRestaurants,setfilteredRestaurants]=useState([]);
    let navigate = useNavigate();

    console.log(locations.lat);

    useEffect(()=>{
        setRestaurants([]);
        setfilteredRestaurants([]);
        // console.log(locations.lat);
        axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${locations.lat}&lng=${locations.long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
    .then((res) => {
        console.log(res.data?.data)
      setRestaurants(res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    })
      },[locations])

      useEffect(()=>{

        let result = restaurants?.filter((item,i)=>{
          if(item.info.name.toLowerCase().includes(userSearch.toLowerCase())==true){
           return true
          }
        } )
        setfilteredRestaurants(result)
      },[userSearch])

        
  const sortByCategory = (category)=>{
    let restaurantData;
    if(category=="delivery"){
  
      if(filteredRestaurants?.length>0){
        restaurantData = [...filteredRestaurants];
      
      restaurantData?.sort((a,b)=>{
        return a.info.sla.deliveryTime - b.info.sla.deliveryTime
      })
      setfilteredRestaurants(restaurantData)
    }
    else{
      restaurantData = [...restaurants];
      restaurantData?.sort((a,b)=>{
        return a.info.sla.deliveryTime - b.info.sla.deliveryTime
      })
      setfilteredRestaurants(restaurantData)
    }
    }else if(category=="rating"){
  
      if(filteredRestaurants?.length>0){
        restaurantData = [...filteredRestaurants];
      restaurantData?.sort((a,b)=>{
        return b.info.avgRating- a.info.avgRating
      })
      setfilteredRestaurants(restaurantData)
    }
    else{
      restaurantData = [...restaurants];
      restaurantData?.sort((a,b)=>{
        return b.info.avgRating - a.info.avgRating
      })
      setfilteredRestaurants(restaurantData)
  
      restaurantData?.sort((a,b)=>{
        return b.info.avgRating - a.info.avgRating
      })
      setRestaurants(restaurantData)
    }
  
  }
  }

    return <>
    
    <div className='col-10'>
            <div style={{textAlign:"center",margin:"30px 0px"}}>
            
            <input value={userSearch} style={{width:"270px" ,margin:"75px 0px 10px"}} 
            onChange={(e)=>{
              setUserSearch(e.target.value)
            }}
              placeholder='Search Restaurants by Name'/>
              <br/>
              <button className='button_category' onClick={()=>{
                sortByCategory("delivery")
              }}
              >Fast Delivery</button>
              <button className='button_category' onClick={()=>{
                sortByCategory("rating")
              }}
              >Rating High to Low</button>
            </div>

            



           <div class="row row-cols-1 row-cols-md-3 g-4">
            { filteredRestaurants.length>0 ?
              filteredRestaurants?.map( (item,index) => {
               return <div class="col"onClick={()=>{
                navigate(`/restaurant/${item.info.id}/${item.info.name}`)}}
            
               >

              <div class="card h-100">
              <img src= { `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}  class="card-img" alt="..."/>
                <div class="card-body">
               <h5 class="card-title">{item.info.name}</h5>
               <p class="card-text">⭐<span style={{marginLeft : "5px"}}><b>{item.info.avgRating ? item.info.avgRating : item.info.avgRatingString }</b></span>
               <span style={{marginLeft : "15px"}}><i class="fa-solid fa-motorcycle"></i> <b>{item.info.sla.slaString}</b></span>
               <p style={{marginBottom:"0px"}} className='card-text'>{item.info.cuisines.slice(0,3).join(',')}</p>
               <p style={{marginTop:"5px"}}
                className='card-text'>{item.info.areaName}</p>
               </p>
              </div>
              </div>
              </div>  
             }):

             
             restaurants?.map( (item,index) => {
              return <div class="col"  onClick={()=>{
                navigate(`/restaurant/${item.info.id}/${item.info.name}`)
                console.log(item.info.id)
               }}
              >


             <div class="card h-100">
             <img src= { `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}  class="card-img" alt="..."/>
               <div class="card-body">
              <h5 class="card-title">{item.info.name}</h5>
              <p class="card-text">⭐<span style={{marginLeft : "5px"}}><b>{item.info.avgRating ? item.info.avgRating : item.info.avgRatingString }</b></span>
              <span style={{marginLeft : "15px"}}><i class="fa-solid fa-motorcycle"></i> <b>{item.info.sla.slaString}</b></span>
              <p style={{marginBottom:"0px"}} className='card-text'>{item.info.cuisines.slice(0,3).join(',')}</p>
              <p style={{marginTop:"5px"}}
               className='card-text'>{item.info.areaName}</p>
              </p>
             </div>
             </div>
             </div>  
              })} 


          </div>
          {filteredRestaurants.length == 0 && restaurants.length == 0 ? <Shimmer/> : ""}

          </div>


    </>

}
export default InitialRestaurants;