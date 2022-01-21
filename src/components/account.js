import React , {Component} from "react";
import { Link } from "react-router-dom";
import './comp.css';

function Account(){
    return(
        <div className="acc">
            <div className="profile">
                <h5 className="accHead">Account</h5>
                <div className="userN">Victor</div>
                <img src={require('../imgs/1B.jpg')} alt="profilePic"/>
                <button className="logout">Logout</button>
            </div>
        </div>
    )
}

export default Account;