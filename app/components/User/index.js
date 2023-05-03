"use client"
import './index.css'
//import queryString from "query-string";

const ShareLink = () => {
  return (
    <div>
        <form>
            <label>
                Enter Username
                <br/>
                <input type="text" className="username-input" placeholder="username"/>
            </label>
            <button className="submit" type="submit">submit</button>
        </form>
    </div>
  );
};

export default ShareLink;
