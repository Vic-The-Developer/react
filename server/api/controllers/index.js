const { response } = require("express");
const { upload } = require("../../helpers/upload");
const { setResponse } = require("../../helpers/response")
require("dotenv");

module.exports = {
    uploadImage: (req, res) => {
        upload(req, res, (errno) => {
            if (errno) {
                setResponse(res, 400, false, "Only images are allowed!", 1, errno, null);
            }
            else{
                setResponse(res, 200, true, `${req.file.filename} uploaded successfully!`, 1, errno, null);
            }
        });
    },
 }

 