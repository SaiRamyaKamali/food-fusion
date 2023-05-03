"use client"
import React from 'react';
import { useState, useEffect  } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import queryString from "query-string";
import ShareLink from '../ShareLink';
import User from '../User';
import './index.css'

const Welcome = () => {


  const [renderWelcomePage, setRenderWelcomePage] = useState(true);
  const [share, setShare] = useState(false);
  const [link, setLink] = useState("");
  const [uniqueSession, setUniqueSession] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
        const queryParameters = new URLSearchParams(window.location.search);
        setUniqueSession(queryParameters.get("id"));
        console.log("custom link", queryParameters.get("id"));
    }
  }, []);

  const handleGetStartedClick = () => {
    const sessionId = uuidv4(); 
    const queryParams = queryString.stringify({ id: sessionId });
    const url = `${window.location.origin}?${queryParams}`;
    console.log(url)
    setLink(url);
    setShare(true);
    setRenderWelcomePage(false);
  };


  return (
    <div className="container">
      {uniqueSession==null && renderWelcomePage && <div className="container"> <h1 className="title">Welcome to Food Fusion</h1>
      <h1 className="sub-heading">A delicious way to connect</h1>
      <p className="details">Stop worrying about conflicting food preferences when dining out with friends or loved ones. With Food Fusion, you can easily find restaurants that cater to your unique tastes and preferences, no matter how diverse they may be</p>
      <button className="getStarted-btn" onClick={handleGetStartedClick}>Get Started</button></div>}
      {share && <ShareLink url={link}/>}
      {uniqueSession!==null && <User/>}
    </div>
  );
};

export default Welcome;