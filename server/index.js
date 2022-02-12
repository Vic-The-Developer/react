require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');

const userRouter = require("./api/routes");
const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, PATCH, POST"
}


app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", userRouter);
app.set('view engine', 'ejs'); 
app.use('/images', express.static('images')); 
app.listen(process.env.PORT || 3001,'0.0.0.0', () => {
    console.log("Server up and running ON PORT:", process.env.PORT);
});