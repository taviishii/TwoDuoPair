import { useState } from "react";
import axios from "axios";
const GeocodeForm =()=>{
    const[address1,setAddress1]=useState("");
    const[address2,setAddress2]=useState("");
    const[location1,setLocation1]=useState(null);
    const[location2,setLocation2]=useState(null);

    const handleGeocode=async ()=>{
        try{
            const response1=await axios.get('https://nominatim.openstreetmap.org/search',{
                params:{
                    q:address1,
                    format:"json",
                },
            });
            console.log("Response for Address 1:", response1.data);
        
            const response2 = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                  q: address2,
                  format: "json",
                },
            });
            console.log("Response for Address 2:", response2.data);
            setLocation1(response1.data[0]); 
            setLocation2(response2.data[0]);
        } catch(error){
            console.error("Error with geocoding:", error);
        }
    };
    return(
        <div>
            <h2>Enter meeting addresses</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="text"
                placeholder="Your Address"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
            />
            <input
                type="text"
                placeholder="Meeting person's address"
                value={address1}
                onChange={(e)=>setAddress1(e.target.value)}
            />
            <button onClick={handleGeocode}>Find Midpoint & Venues</button>
        </div>
    );
};
export default GeocodeForm;
