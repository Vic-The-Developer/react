import React, { useState } from "react";
import { ImagesGallery } from "./imagesGal";
import "./comp.css";
import axios from "axios";
import { Alert } from "react-bootstrap";

function Advertise() {
  //file preview
  const [photos, updatePhotos] = useState([]);
  //for upload
  const [photos2, updatePhotos2] = useState(null);
  const _onchange = (e) => {
    const selectedFiles = [];
    const selectedFiles2 = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      selectedFiles.push(URL.createObjectURL(file));
      selectedFiles2.push(file);
    });
    updatePhotos(selectedFiles);
    updatePhotos2(selectedFiles2);
  };
  const [message, setMessage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();

    //submit for backend validation
    const loginFormData = new FormData();
    for (const file of photos2) {
      loginFormData.append("images", file);
    }
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:5000/api/upload/image", loginFormData, headers)
      .then((res) => {
        setMessage({
          variant: res.data.success,
          message: res.data.message,
        });
      })
      .catch((error) => {
        setMessage({
          variant: false,
          message: error.message,
        });
      });
  };
  return (
    <div>
      <h1>Advertise</h1>
      <form onSubmit={handleSubmit}>
        <div className="uploadPics">
          <label for="upImg" className="upImgHead">
            Upload images(<i>Upto 15 photos max</i>)
          </label>
          <br />
          <div className="uploadWrap">
            <input
              type="file"
              name="upImg"
              id="upImg"
              size={20}
              multiple
              accept="image/x-png,image/gif,image/jpeg"
              onChange={_onchange}
            />
            <div class="drag-text">
              <h3>Drag and drop or select to add Images</h3>
            </div>
          </div>
          <ImagesGallery images={photos} />
        </div>
        <button type="submit">Submit</button>
        <div>
          {message ? (
            <Alert variant={message.variant ? "success" : "danger"}>{message.message}</Alert>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default Advertise;
