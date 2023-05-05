import React, { useState, useEffect } from "react";
import Selection from "../restro";

const ShareLink = () => {
  const [preferences, setPreferences] = useState({});
  const [renderRestro, setRenderRestro] = useState(false);
  const [renderForm, setRenderForm] = useState(true);

  

  const handlePreferenceChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [field]: value,
    }));
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
  };
  useEffect(()=>{
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
  },[preferences])
  const handlePreferenceSubmit = (event) => {
    event.preventDefault();
    console.log('preferences submitted')
    console.log(preferences);
    setRenderRestro(true);
    setRenderForm(false);
    
  };

  return (
    <div>
      { renderForm && <div>
      <h2>Enter Your Preferences for User 1</h2>
      <form onSubmit={handlePreferenceSubmit}>
        <label>
          Cuisine
          <br />
          <input
            type="text"
            name="cuisine1"
            value={preferences.cuisine1 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <label>
          Location
          <br />
          <input
            type="text"
            name="location1"
            value={preferences.location1 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <label>
          Price
          <br />
          <input
            type="text"
            name="price1"
            value={preferences.price1 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <h2>Enter Your Preferences for User 2</h2>
        <label>
          Cuisine
          <br />
          <input
            type="text"
            name="cuisine2"
            value={preferences.cuisine2 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <label>
          Location
          <br />
          <input
            type="text"
            name="location2"
            value={preferences.location2 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <label>
          Price
          <br />
          <input
            type="text"
            name="price2"
            value={preferences.price2 || ""}
            onChange={handlePreferenceChange}
            required
          />
        </label>
        <br/>
        <button type="submit">Submit Preferences</button>
      </form>
      </div>}
      
      {renderRestro && <Selection preferences={preferences}/>}
    </div>
  );
};

export default ShareLink;
