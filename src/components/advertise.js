import React, { Component } from "react";
import {ImagesGallery} from './imagesGal';
import './comp.css';


function Advertise(){

    //file uploads
    const [photos, updatePhotos] = useState([]);
    const _onchange = (e) =>{
        const selectedFiles =[];
        const targetFiles =e.target.files;
        const targetFilesObject= [...targetFiles];
        targetFilesObject.map((file)=>{
            return selectedFiles.push(URL.createObjectURL(file))
        })
        updatePhotos(selectedFiles);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        alert(arr1 +":" +arr2 +":" +arr3);

        //submit for backend validation
        const loginFormData = new FormData();
        loginFormData.append("image", photos);
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        axios.post('http://localhost:5000/users/register', loginFormData, headers)
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });

        console.log(loginFormData);
    }
    return(
        <div>
            <h1>
                Advertise
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="uploadPics">
                        <label for='upImg' className="upImgHead">Upload images(<i>Upto 15 photos max</i>)</label><br/>
                        <div className="uploadWrap">
                            <input type='file' name="upImg" id="upImg" size={20} multiple accept="image/x-png,image/gif,image/jpeg" onChange={_onchange}/>
                            <div class="drag-text">
                                <h3>Drag and drop or select to add Images</h3>
                            </div>
                        </div>
                        <ImagesGallery images={photos}/>
                    </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Advertise;