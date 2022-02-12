const router = require("express").Router();
const { uploadImage } = require("../controllers");

//Routes
router.post("/upload/image", uploadImage);

module.exports = router;