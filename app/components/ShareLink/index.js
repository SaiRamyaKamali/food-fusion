"use client"
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import './index.css'
import User from '../User'
//import queryString from "query-string";

const ShareLink = ({ url }) => {

  const [renderUserPage, setRenderUserPage] = useState(false);
  const [renderShareLinkPage, setRenderShareLinkPage] = useState(true);

function copyLink() {

  const linkField = { link }.link
  const tempInput = document.createElement("input");
  tempInput.value = linkField
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied the link: " + linkField);

}
const handleContinue = () => {
  setRenderUserPage(true)
  setRenderShareLinkPage(false)
};

  return (
    <div>
      {renderShareLinkPage && <div><h1>Share the below link with your partner</h1>
    <div className="link-box">
      <a className="link" href={url} target="_blank">{url}</a>
      <button onClick={copyLink} className="copy-button">Copy to Clipboard</button>
    </div>
    <button onClick={handleContinue}>Continue</button></div>}
    {renderUserPage && <User/>}
    </div>
  );
};

export default ShareLink;
