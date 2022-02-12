const { verify } = require("jsonwebtoken");
require("dotenv");

module.exports = {
    checkToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token){
          verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
              if(error){
                  return res.status(403).json({
                      status: 1,
                      success: false,
                      message: error.message
                  });
              }
              else{
                  req.email = user;
                  next();
              }
          })
        }
        else{
            return res.status(401).json({
                status: 1,
                success:false,
                message: "Access denied! Uauthorized access!"
            })
        }
    }
}