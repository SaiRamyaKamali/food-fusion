import React, { useEffect, useState } from 'react';

const Selection = ({preferences}) => {
  const [restaurants, setRestaurants] = useState([]);
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${preferences.cuisine}&key=${apiKey}`;

  useEffect(() => {
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
      <h2>Suggested Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id} onClick={()=> handleRestroClick(restaurant)}>{restaurant.name}</li>
         
        ))}
      </ul>
      {selectedRestaurant && (
        <div>
          <h3>{selectedRestaurant.name}</h3>
          <p>{selectedRestaurant.rating}</p>
          <p>{selectedRestaurant.types[0]}</p>
          <p>{selectedRestaurant.vicinity}</p>
          {/* <p>{selectedRestaurant.photos[0].html_attributions[0]}</p> */}
          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedRestaurant.photos[0].photo_reference}&key=${apiKey}`} alt={selectedRestaurant.name} />
        </div>
      )}
    </div>
  );
};

export default Selection;
