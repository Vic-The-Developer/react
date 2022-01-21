import React, { Component } from "react";
import { Router,  Route, Routes, useHistory, Link } from "react-router-dom";
import './comp.css';
import View from './view-in-detail';


class Search extends Component{
    state = {
        open: false,
        open2: false,
    };
    handleBtnClick = () =>{
        this.setState((state) => {
            return{
                open: !state.open
            };
        });
    };
    handleBtnClick2 = () =>{
        this.setState((state) => {
            return{
                open2: !state.open2
            };
        });
    };
    render(){
        return(
            <div>
                <div className="searchFilter">
                    <div className="lbFilter">Filter results by: </div>
                    <span className="sBox">
                        <label for="search">Search: </label>
                        <input type='text' name="search" placeholder="e.g Nairobi"/>
                    </span>
                    <span className="filter">
                        <div className="types">
                            <button className="dropBtn1" onClick={this.handleBtnClick}>Type <span>&#x25BC;</span></button>
                            {this.state.open && (
                                <div className="dropList1" id="dropList1">
                                    <a href="#">lorem</a>
                                    <a href="#">lorem</a>
                                    <a href="#">Lorem</a>
                                    <a href="#">Lorem</a>
                                    <a href="#">Lorem</a>
                                </div>
                            )}
                        </div>
                        <div className="types">
                            <button className="dropBtn1" onClick={this.handleBtnClick2}>Type <span>&#x25BC;</span></button>
                            {this.state.open && (
                                <div className="dropList1" id="dropList1">
                                    <a href="#">lorem2</a>
                                    <a href="#">lorem2</a>
                                    <a href="#">Lorem2</a>
                                    <a href="#">Lorem2</a>
                                    <a href="#">Lorem2</a>
                                </div>
                            )}
                        </div>
                    </span>
                </div>
                <div className="resHelp">
                    
                </div>
            </div>
        )
    }
}

export default Search;