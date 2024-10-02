import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { addToCart } from "./Reducer";
import { useDispatch } from "react-redux";
import 'animate.css';



function SearchDishes(){

    const [dishName,setDishName] = useState("");
    const [dishes,setDishes]=useState([]);

    let dispatch = useDispatch();

    useEffect(() => {
        if(dishName.length>2){
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.37240&lng=78.43780&str=${dishName}&trackingId=c51c1c22-a61f-5af6-3f56-1ea2aa05c7ac&submitAction=ENTER&queryUniqueId=239a5db1-ac00-4ce1-28c4-b7129fa41fab`)
            .then((res) => {
                if(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH){
                    setDishes(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.slice(1))
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }, [dishName]);

    console.log(dishes);
    let navigate = useNavigate();  

    return(<>
    <div style={{paddingTop:"90px",textAlign:"center"}}>
        <h2>Search Dishes</h2>
        <input onChange={(e)=>{
            setDishName(e.target.value)
        }}
         placeholder="Search Dishes"></input>
        </div>
        <div className="container dishes-display">
        <div className="row row-cols-1 row-cols-md-4 sm-1 g-2">
        {dishes.map((item,i)=>{
            
       return <div className="col">
         <div className="card h-100 p-4">
            <h4 className="card-title">{item?.card?.card?.restaurant?.info?.name},
            
            <h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>
                {item?.card?.card?.restaurant?.info?.areaName}</h5></h4>
            <p>⭐{item?.card?.card?.info?.ratings?.aggregatedRating.rating} Rating , Time to delivery  
            <button className="primary-btn"
           onClick={()=>{
            navigate(`/restaurant/${item?.card?.card?.restaurant?.info?.id}/${item?.card?.card?.restaurant?.info?.name}`)
            // console.log(item.info.id)
           }}       
            >View Restaurant</button></p>
            <div className="row">
            <div className="col-4">
      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.card?.card?.info?.imageId}`} 
      className="card-img-top h-80" alt="..."/></div>
      <div className="card-body col-8">
      <h5 className="card-title">{item?.card?.card?.info?.name}</h5>
        <p className="card-text"><b>₹ {item?.card?.card?.info?.price / 100}/-</b>
        </p>{/* {item?.card?.card?.info?.description} */}
       
        <button onClick={()=>{ 
          dispatch(addToCart({Name : item?.card?.card?.info?.name, Price :item?.card?.card?.info?.price / 100,
        Img : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item?.card?.card?.info?.imageId}`,
      Description : item?.card?.card?.info?.description
      })) ;
        }}
         className="cart-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
            Add to cart</button>
      </div>
      </div>
    </div>
  </div>
})}
        </div></div>
        <div >

          {dishName?.length>=2 && dishes?.length==0 ? <div class="d-flex justify-content-center">
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div> :""}
          
        </div >

</>
    )
}

export default SearchDishes;