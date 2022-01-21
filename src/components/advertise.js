import React, { Component } from "react";
import './comp.css';


function Advertise(){
    return(
        <div>
            <div className="profile">
                <h5 className="accHead">Account</h5>
                <div className="userN">Victor Mwendwa</div>
                <img src={require('../imgs/1B.jpg')} alt="profilePic"/>
                <button className="logout">Logout</button>
            </div>
            <h1>
                Advertise
            </h1>
        </div>
    )
}

export default Advertise;