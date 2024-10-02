import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./Reducer";

function Cart(){
    let dispatch = useDispatch();

    let cartItems = useSelector((state)=>{
        return state.cartItems
    })
   

    console.log(cartItems);

   let totalPrice = cartItems.reduce((acc,item,i)=>{
      return acc + item.Price
    },0)

    return(<>
    <div >
    <h3 style={{paddingTop:"100px", textAlign:"center"}}>Cart Items</h3>
    <h5 style={{textAlign:"center",textRendering:"geometricPrecision"}}>Amount to be paid ₹  {totalPrice}</h5>
    <div className="container"></div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        {cartItems.map((item,i)=>{
           console.log(item)
       return <div class="card mb-3" >
        
  <div class="row g-0">
    <div class="col-md-4">
      <img src={item.Img} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{item.Name}</h5>
             
        <p className="card-text"> {item.Description }</p>       
        <p class="card-text">
          The very famous {item.Name}</p>
        <p class="card-text">₹ {item.Price}</p>
        <button onClick={()=>{
          dispatch(removeFromCart(i))
        }}
         type="button" class="btn btn-danger"> ⊖ Remove from cart</button>

      </div>
    </div>
  </div>
</div>
 })}
    </div>
    </div>
    
    </>) 
}

export default Cart