import React, { useEffect, useState } from 'react';

const Selection = ({ username, preferences}) => {
  const [restaurants, setRestaurants] = useState([]);
  const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${preferences.cuisine}&key=${apiKey}`;

  useEffect(() => {
    async function getNearbyRestaurants() {
      try {
        const response = await fetch(`/api/restro`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferences }),
        });
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (preferences.location && preferences.cuisine && preferences.price) {
      getNearbyRestaurants();
    }
  }, [preferences]);

  return (
    <div>
      <h2>{username}'s Selection:</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Selection;

// import React, { useEffect, useState } from 'react';

// const Selection = ({ username, preferences}) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const apiKey = 'AIzaSyBDx0Jt2uc5577zBvhflHCmnAS-fe_y_3s';
//   const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=${preferences.cuisine}&key=${apiKey}`;

//   useEffect(() => {
//     async function getNearbyRestaurants() {
//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setRestaurants(data.results);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     if (preferences.location && preferences.cuisine && preferences.price) {
//       getNearbyRestaurants();
//     }
//   }, [preferences]);

//   return (
//     <div>
//       <h2>{username}'s Selection:</h2>
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.place_id}>{restaurant.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Selection;
