import React from 'react';
import './index.css'

const Welcome = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to Food Fusion</h1>
      <h1 className="sub-heading">A delicious way to connect</h1>
      <p className="details">Stop worrying about conflicting food preferences when dining out with friends or loved ones. With Food Fusion, you can easily find restaurants that cater to your unique tastes and preferences, no matter how diverse they may be</p>
      <button className="getStarted-btn">Get Started</button>
    </div>
  );
};

export default Welcome;