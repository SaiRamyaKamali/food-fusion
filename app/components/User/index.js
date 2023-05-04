import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Selection from "../restro";

const ShareLink = () => {
  const [usernames, setUsernames] = useState({});
  const [preferences, setPreferences] = useState({});
  const [renderRestro, setRenderRestro] = useState(false);
  const [userID,setUserID] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = uuidv4();
    const username = event.target.username.value;
    setUsernames((prevUsernames) => ({
      ...prevUsernames,
      [userId]: username,
    }));
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [userId]: {},
    }));
    // console.log('JJ'+usernames);
    // console.log('KK'+preferences);
    event.target.reset();
  };

  const handlePreferenceChange = (event, userId) => {
    const field = event.target.name;
    const value = event.target.value;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [userId]: { ...prevPreferences[userId], [field]: value },
    }));
  };

  const handlePreferenceSubmit = (event, userId) => {
    event.preventDefault();
    console.log('JJ'+ usernames[userId]);
    console.log(preferences[userId]);
    console.log(`Preferences submitted for user ${usernames[userId]}:`);
    console.log(preferences[userId]);
    setUserID(userId);
    setRenderRestro(true);
    
  };

  return (

      <div>
      
      {Object.keys(usernames).length === 0 && (
        <form onSubmit={handleSubmit}>
          <label>
            Enter Username
            <br />
            <input type="text" placeholder="username" name="username" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {Object.entries(usernames).map(([userId, username]) => (
        <div key={userId}>
          <h2>Hello, {username} Enter Your Preferences</h2>
          <form onSubmit={(event) => handlePreferenceSubmit(event, userId)}>
            <label>
              Cuisine
              <br />
              <input
                type="text"
                name="cuisine"
                value={preferences[userId].cuisine || ""}
                onChange={(event) => handlePreferenceChange(event, userId)}
              />
            </label>
            <br/>
            <label>
              Location
              <br />
              <input
                type="text"
                name="location"
                value={preferences[userId].location || ""}
                onChange={(event) => handlePreferenceChange(event, userId)}
              />
            </label>
            <br/>
            <label>
              Price
              <br />
              <input
                type="text"
                name="price"
                value={preferences[userId].price || ""}
                onChange={(event) => handlePreferenceChange(event, userId)}
              />
            </label>
            <br/>
            <button type="submit">Submit Preferences</button>
          </form>
        </div>
         
      ))}
      {renderRestro && <Selection username={usernames[userID]} preferences={preferences[userID]}  />}
</div>
  );
};

export default ShareLink;
