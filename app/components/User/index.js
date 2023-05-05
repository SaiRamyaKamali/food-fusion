import React, { useState, useEffect } from "react";
import Selection from "../restro";
import './index.css';

const ShareLink = () => {
  
  

  const [preferences, setPreferences] = useState({});
  const [renderRestro, setRenderRestro] = useState(false);
  const [renderForm, setRenderForm] = useState(true);
  const [loc, setLoc] = useState(false);

  

  const handlePreferenceChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [field]: value,
    }));
    
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     console.log(latitude)
    //     const apiKey = "14e1e4ee5cdd40c28466ccf4e1947170";

    //     fetch(
    //       `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    //     )
    //       .then(response => response.json())
    //       .then(data => {
    //         preferences.location1 = data.results[0].formatted;
    //       })
    //       .catch(error => console.error(error));
    //       console.log(preferences.location1);
    //   });
    // }
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
  },[loc])
  const handlePreferenceSubmit = (event) => {
    event.preventDefault();
    console.log('preferences submitted')
    console.log(preferences);
    setRenderRestro(true);
    setRenderForm(false);
    
  };
  const handleLocation = (event) =>{
    setLoc(true);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
      {renderForm &&
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="form">
            <h2 style={{marginBottom:'20px'}}>Enter Your Preferences</h2>
            <form onSubmit={handlePreferenceSubmit}>
              <label>
                Cuisine
                <br />
                <input type = "text"
                  name = "cuisine1"
                  onChange={handlePreferenceChange}>
                  
                </input>
                {/* <select
                  name="cuisine1"
                  value={preferences.cuisine1 || ""}
                  onChange={handlePreferenceChange}
                  required
                >
                  <option value="american">American</option>
                  <option value="chinese">Chinese</option>
                  <option value="french">French</option>
                  <option value="indian">Indian</option>
                  <option value="italian">Italian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="mexican">Mexican</option>
                  <option value="thai">Thai</option>
                  <option value="thai">Arabian</option>
                </select> */}
              </label>
              <br />
              <label>
                Price
                <br />
                <select
                  name="price1"
                  value={preferences.price1 || ""}
                  onChange={handlePreferenceChange}
                  required
                >
                  <option value="">Select a price range</option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                  <option value="4">Expensive</option>
                </select>
              </label>
              <br />
            </form>
          </div>
          <div className="form">
            <h2 style={{marginBottom:'20px'}}>Enter Your Partner's Preferences</h2>
            <form onSubmit={handlePreferenceSubmit}>
              <label>
                Cuisine
                <br />
                <input type = "text"
                  name = "cuisine2"
                  onChange={handlePreferenceChange}>
                  
                </input>
                {/* <select
                  name="cuisine2"
                  value={preferences.cuisine2 || ""}
                  onChange={handlePreferenceChange}
                  required
                >
                  <option value="american">American</option>
                  <option value="chinese">Chinese</option>
                  <option value="french">French</option>
                  <option value="indian">Indian</option>
                  <option value="italian">Italian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="mexican">Mexican</option>
                  <option value="thai">Thai</option>
                  <option value="thai">Arabian</option>
                </select> */}
              </label>
              <br />
              <label>
                Price
                <br />
                <select
                  name="price2"
                  value={preferences.price2 || ""}
                  onChange={handlePreferenceChange}
                  required
                >
                  <option value="">Select a price range</option>
                  <option value="1">Low</option>
                  <option value="2">Medium</option>
                  <option value="3">High</option>
                  <option value="4">Expensive</option>
                </select>
              </label>
              <br />
            </form>
          </div>
        </div>
      }

      {renderForm &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px' ,backgroundColor:'white' }}>
          <label>
            Location
            <br />
            <input
              type="text"
              name="location"
              value={preferences.location1 || ""}
              onChange={handlePreferenceChange}
            />
            <br/>
            <button onClick={handleLocation}>Get Location</button>
          </label>
        </div>
      }

      {renderForm &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type="submit" onClick={handlePreferenceSubmit}>Submit Preferences</button>
        </div>
      }

        {renderRestro && <Selection preferences={preferences} />}
    </div>
  );
};

export default ShareLink;
