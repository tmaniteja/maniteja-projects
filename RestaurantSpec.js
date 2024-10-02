import React,{useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { addToCart } from "./Reducer";
import { useDispatch } from "react-redux";


function RestaurantSpec(){
  let dispatch = useDispatch();

    let [restaurantMenu,setrestaurantMenu]=useState([])
    let {restaurantId,restaurantName}= useParams();
    console.log(restaurantId,restaurantName);

    useEffect(()=>{
       
                // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=351873&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER
        axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4485835&lng=78.39080349999999&restaurantId=${restaurantId}&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER`)
        .then((res)=>{
            setrestaurantMenu(res.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        }).catch((err)=>{console.log(err)})
    },[])

    return (<div className="container">
        <div> <h2 style={{paddingTop:"100px"}}>{restaurantName} Menu</h2>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {restaurantMenu.map((item, i) => {
            console.log(item?.card?.card);
            if (item?.card?.card?.itemCards) {

              // return<><div><p>{item.card.card.title}</p>
              return <>
                {i = 0 ?

                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <b>{item.card.card.title}-{item?.card?.card?.itemCards.length}</b>
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                      </div>
                    </div>
                  </div> :
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button class="accordion-button collapsed menu-toggle" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`#collapse${i}`}>
                        <b>{item.card.card.title}-{item?.card?.card?.itemCards.length}</b>
                      </button>
                    </h2>
                    <div id={`collapse${i}`} class="accordion-collapse collapse menu-toggle" data-bs-parent="#accordionExample">
                      <div class="accordion-body">


                        <div class="row row-cols-1 row-cols-md-6 sm-1 g-4">

                          {item?.card?.card?.itemCards?.map((item, i) => {
                            console.log(item);
                            return <div class="col">
                              <div class="card h-100">
                                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item.card.info.imageId}`} class="card-img dish-image" alt="..." />
                                <div class="card-body">
                                  <h5 class="card-title">{item.card.info.name}</h5>
                                  {/* <p>{item?.card?.card?.ratings?.aggregatedRating?.rating}-{item?.card?.card?.ratings?.aggregatedRating?.ratingCount} ratings</p> */}
                                  {
                                    (item.card.info.price) ? <p class="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                    </svg> {(item.card.info.price) / 100}</p> :
                                      <p class="card-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                                      </svg> {(item.card.info.defaultPrice) / 100}</p>
                                  }

                                  <button

                                    onClick={() => {
                                      dispatch(addToCart({
                                        Name: item.card.info.name, Price: item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100,
                                        Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/${item.card.info.imageId}`
                                      }));
                                    }}


                                    className="cart-button btn btn-success">Add to cart</button>
                                </div>
                              </div>
                            </div>
        })}
      </div>
      </div>
    </div>
  </div>
   }
   </>

{/* <div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Accordion Item #2
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Accordion Item #3
    </button>
  </h2>
  <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div> 




                  <div class="accordion-item">
                       <h2 class="accordion-header">
                           <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="true" aria-controls={`#collapse${i}`}>
                           {item.card.card.title}
                           </button>
                       </h2>
                       <div id={`#collapse${i}`} class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                           <div class="accordion-body">
                               <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                           </div>
                       </div>
                   </div> : <div className="accordion-item">
                   <h2 className="accordion-header">
                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`#collapse${i}`}>
                       {item.card.card.title}
                       </button>
                   </h2>
                   <div id={`#collapse${i}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                       <div className="accordion-body">
                           <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                       </div>
                   </div>
</div> */}    
         
            
            
    
            
  
  {/* <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div> */}

           
        }   
       })}

       </div>

    
    </div>
    </div>
    )
}
export default RestaurantSpec;