import React, { useEffect, useState } from 'react';
import RestroItem from '../restroItem';
import {TailSpin} from 'react-loader-spinner'
import './index.css'

const Selection = ({preferences}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [mostRest, setMostRest] = useState({likes:0});
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${preferences.cuisine}&key=${apiKey}`;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude)
        const apiKey = "14e1e4ee5cdd40c28466ccf4e1947170";

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
        )
          .then(response => response.json())
          .then(data => {
            preferences.location1 = data.results[0].formatted;
          })
          .catch(error => console.error(error));
          console.log(preferences.location1);
      });
    }
    async function getNearbyRestaurants(preferences) {
      console.log(preferences)
      try {
        const response = await fetch(`/api/restro`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferences),
        });
        const data = await response.json();
        console.log(data)
        setRestaurants(data.results);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    }

    if (preferences.location1 && preferences.cuisine1 && preferences.price1 && preferences.cuisine2 && preferences.price2) {
      getNearbyRestaurants(preferences);
    }
  }, [preferences]);
  const handleRestroClick = () => {
    setSelectedRestaurant(mostRest);
  };
  
  function mostRestro(restro) {
    console.log(
      "hhh"
    );
    console.log(restro);
    if(restro.likes>=mostRest.likes)
    setMostRest(restro);
}

  return (
    <div>
     
      {isLoading? <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} /> :(<div className="faqs-container"><h2 className="heading">Suggested Restaurants</h2>
      {selectedRestaurant && (
  <div className='Output'>
    Selected restaurant: {mostRest.name} <br/>
    Rating: {mostRest.rating} <br/>
    Address: {mostRest.vicinity}
  </div>
)}
      <ul className="faqs-list ">
        {restaurants.map((restaurant) => (
          <RestroItem key={restaurant.place_id} name={restaurant.name} rating={restaurant.rating} type={restaurant.type} vicinity={restaurant.vicinity} photo={restaurant.photos[0].photo_reference} mostRestro={mostRestro}/>         
        ))}
        
      </ul></div>)}
      <button onClick={handleRestroClick} className="pickRestaurant">Pick a Restuarent</button>
      
    </div>
  );
};

export default Selection;
