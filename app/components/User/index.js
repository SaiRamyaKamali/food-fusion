import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Selection from "../restro";

const ShareLink = () => {
  const [preferences, setPreferences] = useState({});
  const [renderRestro, setRenderRestro] = useState(false);

  

  const handlePreferenceChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [field]: value,
    }));
  };

  const handlePreferenceSubmit = (event) => {
    event.preventDefault();
    console.log('preferences submitted')
    console.log(preferences);
    setRenderRestro(true);
    
  };

  return (
    <div>
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
          />
        </label>
        <br/>
        <button type="submit">Submit Preferences</button>
      </form>
      
      {renderRestro && <Selection preferences={preferences}/>}
    </div>
  );
};

export default ShareLink;
