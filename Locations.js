import React,{useState,useEffect} from "react";
import axios from 'axios';

function Locations({setLocations}){
//https://www.swiggy.com/dapi/misc/place-autocomplete?input=${}&types=

let [userLocationSearch,setUserLocationSearch]=useState("");
let [locationSuggestion,setlocationSuggestion]=useState([]);

useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${userLocationSearch}&types=`)
    .then((res)=>{
        if(res.data.data){
        setlocationSuggestion(res.data.data)
        }
    })
},[userLocationSearch]);

return <>
<div className='col-2 pt-4'>
            <input
            value={userLocationSearch}
            onChange={(e)=>{
                setUserLocationSearch(e.target.value)
            }}
            style={{margin:"75px 0px"}} placeholder='Search by Area'></input>
            <br/>
            <br/>
            <ol>
                {userLocationSearch !=" "? locationSuggestion.map((item,id)=>{
                    return <li onClick={()=>{
                      // console.log(item.place_id)
                      axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${item.place_id}`)
                      //https://www.swiggy.com/dapi/misc/address-recommend?place_id=ChIJcYeVDsqMTDoRVR8WJSBsA9M
                      .then((res)=>{
                       let locationData = res.data.data[0].geometry.location
                        setLocations({
                          lat : locationData.lat,
                          long : locationData.lng
                        })
                        setlocationSuggestion([]);
                      }).catch((err)=>{
                        console.log(err)
                      })
                    }
                    }
                     className="location-name">{item.description}</li>
                }):""}
            </ol>

             

            {/* <label><input name='search_Location'
             onChange={()=>{
              setLocations({
                lat:"17.4485835",
                long:"78.39080349999999"
              })
              console.log(`Lat= 17.4485835,Long= 78.39080349999999`)
            }}
            type="radio"/>
            Madhapur</label><br/> */}
            {/* <label><input name='search_Location'
            onChange={()=>{
              setLocations({
                lat:"17.3684658",
                long:"78.53159409999999"
              })
              console.log(`Lat=17.3684658 Long=78.53159409999999`)
            }}
            type="radio"/>Dilsukhnagar</label><br/> */}

              {/* <label><input name='search_Location'
            onChange={()=>{
              setLocations({
                lat:"17.3535583", 
                long:"78.53159409999999"
              })
              console.log(`Lat=17.3535583 Long=78.53159409999999`)
            }}
            type="radio"/>Santhosh Nagar</label> */}
          </div>


</>
}
export default Locations;