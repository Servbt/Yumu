import React from "react";
import {loadClient, execute, gapiLoad } from "../../utils/gapi"
 


const Gapi = () => {
    return (
      <div className="container">
        <button onClick={gapiLoad()}>gapiLoad</button>
        <button onClick={loadClient()}>authorize and load</button>
        <button onClick={execute()}>execute</button>
      </div>
    );
  };

export default Gapi;