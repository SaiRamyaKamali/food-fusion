import React, { useEffect, useState } from 'react';
import RestroItem from '../restroItem';
import {TailSpin} from 'react-loader-spinner'

const Selection = ({preferences}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
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

    if (preferences.location1 && preferences.cuisine1 && preferences.price1 && preferences.location2 && preferences.cuisine2 && preferences.price2) {
      getNearbyRestaurants(preferences);
    }
  }, [preferences]);
  const handleRestroClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div>
      {isLoading? <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} /> :(<div><h2>Suggested Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <RestroItem key={restaurant.place_id} name={restaurant.name} rating={restaurant.rating} type={restaurant.type} vicinity={restaurant.vicinity} photo={restaurant.photos[0].photo_reference}/>         
        ))}
      </ul></div>)}
      {selectedRestaurant && (
        <div>
          <h3>{selectedRestaurant.name}</h3>
          <p>{selectedRestaurant.rating}</p>
          <p>{selectedRestaurant.types[0]}</p>
          <p>{selectedRestaurant.vicinity}</p>
          <p>{selectedRestaurant.website}</p>
          {/* <p>{selectedRestaurant.photos[0].html_attributions[0]}</p> */}
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedRestaurant.photos[0].photo_reference}&key=${apiKey}`} alt={selectedRestaurant.name} />
        </div>
      )}
    </div>
  );
};

export default Selection;
