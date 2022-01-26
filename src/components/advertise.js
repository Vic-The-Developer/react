import React, { Component } from "react";
import './comp.css';


function Advertise(){
    const[victor, setVictor] = useState(false);
    const[John, setJohn] = useState(false);
    const[Joseph, setJoseph] = useState(false);
    const[Ronnie, setRonnie] = useState(false);
    const inp1 = () =>{
        setVictor(!victor)
    };
    const inp2 = () =>{
        setJohn(!John)
    };
    const inp3 = () =>{
        setJoseph(!Joseph)
    };
    const inp4 = () =>{
        setRonnie(!Ronnie)
    };


    const [arr1, updateArr1] = useState([]);
    const [arr2, updateArr2] = useState([]);
    const [arr3, updateArr3] = useState([]);

    var x = document.getElementById("longiLat");
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>{
                x.innerHTML = "Latitude: " + arr3[0] + 
                "<br>Longitude: " + arr3[1];
                updateArr3(arr =>[position.coords.latitude, position.coords.longitude])
            });
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        alert(arr1 +":" +arr2 +":" +arr3);
    }
    return(
        <div>
            <h1>
                Advertise
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='checkbox' value='victor' onClick={inp1} onChange={e =>updateArr1(arr =>[...arr, e.target.value])}/>
                    <label for=''>&nbsp; Victor</label><br/>
                    <input type='checkbox' value='John' onClick={inp2} onChange={e =>updateArr1(arr =>[...arr, e.target.value])}/>
                    <label for=''>&nbsp; John</label><br/>
                    <input type='checkbox' value="Joseph" onClick={inp3} onChange={e =>updateArr1(arr =>[...arr, e.target.value])}/>
                    <label for='oneB'>&nbsp; Joseph</label><br/>
                    <input type='checkbox' value='Ronnie' onClick={inp4} onChange={e =>updateArr1(arr =>[...arr, e.target.value])}/>
                    <label for='twoB'>&nbsp; Ronnie</label>
                </div>
                <div>
                    {victor && (
                        <span>
                            <label for=''>Victor&nbsp;</label>
                            <input type='number' value={arr2[0]} onChange={e=>updateArr2(arr =>[...arr, e.target.value])}/><br/>
                        </span>
                    )}
                    {John && (
                        <span>
                            <label for=''>John&nbsp;</label>
                            <input type='number' value={arr2[1]} onChange={e=>updateArr2(arr =>[...arr, e.target.value])}/><br/>
                        </span>
                    )}
                    {Joseph && (
                        <span>
                            <label for=''>Joseph&nbsp;</label>
                            <input type='number' value={arr2[2]} onChange={e=>updateArr2(arr =>[...arr, e.target.value])}/><br/>
                        </span>
                    )}
                    {Ronnie && (
                        <span>
                            <label for=''>Ronnie&nbsp;</label>
                            <input type='number' value={arr2[3]} onChange={e=>updateArr2(arr =>[...arr, e.target.value])}/><br/>
                        </span>
                    )}
                </div>
                <div>
                    <h2>Google map</h2>
                    <button onClick={getLocation}>Location</button>
                    <div id="longiLat"></div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Advertise;