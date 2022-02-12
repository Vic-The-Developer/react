const { response } = require("express");
const { genSaltSync, hashSync, compareSync } = require("bcrypt-nodejs");
const { getUserByUserEmail, checkUser, create, verify, sendMail, suspenduser, unsuspenduser, sendForgotPasswordEmail, resetUserPassword, getuserprofile, updatepassword, verifyotp, verifyuser } = require("../services/account");
const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { validator } = require('../../helpers/validator');
require("dotenv");
const salt = genSaltSync(5);
var otp_code = Math.floor(Math.random() * 90000) + 10000;

module.exports = {
    signIn: (req, res) => {
        const validationRule = {
            "email": "required|email",
            "password": "required",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
                return res.status(200).json({
                    success: false,
                    status: 1,
                    message: 'Validation error!',
                    errors: err
                });
            } else {
                const body = req.body;
                getUserByUserEmail(body.email, (error, results) => {
                    if(error){
                        return res.status(200).json({
                            success: false,
                            message: "Incorrect password or email!",
                            status: 1,
                            errors: ['Incorrect password or email!'],
                            data: null
                        });
                    }
                    if(!results){
                        return res.status(200).json({
                            success: false,
                            message: "Incorrect password or email!",
                            status: 1,
                            errors: ['Incorrect password or email!'],
                            data: null
                        });
                }
                const result = compareSync(body.password, results.password);
                if(result){
                    results.password = undefined;
                    const jsontoken = sign({user: results.email }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "1h"
                    });
                    if(results.status === 0){
                    return res.status(200).json({
                        success: false,
                        message: "Your account has not been activated. Please visit the email associated with this account!",
                        status: 1,
                        errors: ['Your account has not been activated. Please visit the email associated with this account!'],
                        data: null
                    });
                    }
                    else{
                        return res.status(200).json({
                            success: true,
                            message: "Login successfully!",
                            status: 0,
                            errors: null,
                            data: {
                                user: {
                                    user_id: results.user_id,
                                    role: results.role,
                                    name: results.name
                                },
                                token: jsontoken
                            },
                        });
                }
                }
                else{
                    return res.status(200).json({
                        success: false,
                        message:"Invalid email or password!",
                        status: 1,
                        errors: ['Incorrect password or email!'],
                        data: null
                    });
                }
                });
            }
        });
    },
    registerUser: (req, res) => {
        const validationRule = { 
            "email": "required|email",
            "password": "required",
            "name": "required",
            "contact": "required",
            "password_confirm": "required"
         }
        validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
                return res.status(200).json({
                    success: false,
                    status: 1,
                    message: 'Validation error!',
                    errors: err,
                    data: null
                });
            } else {
                const body = req.body;
                if(!body.password === body.password_confirm){
                    return res.status(200).json({
                        success: false,
                        status: 1,
                        message: 'Passwords submitted do not match!',
                        errors: ['Validation error'],
                        dat: null
                    });
                }
                body.password = hashSync(body.password, salt);
                const user_id = Math.random().toString(36);   
                checkUser(body.email, (error, user_results) => {
                    if(user_results !== null){
                        return res.status(200).json({
                            success: false,
                            status: 1,
                            message: "Email already in use!",
                            errors: ["Email already in use!"],
                            data: null
                        });
                    }
                    create(user_id, body, (err) => {
                        if(err){
                            return res.status(200).json({
                                success: false,
                                message: err,
                                status: 1,
                                errors: [err],
                                data: null
                            });
                        }
                        else{
                            sendMail(body.email, otp_code, (er, response) => {
                                if(er){
                                    return res.status(200).json({
                                        success: false,
                                        message: "The email you submitted does not exist or is not functional!",
                                        status: 1,
                                        errors: ["The email you submitted does not exist or is not functional!"],
                                        data: null
                                    });
                                }
                                else{
                                return res.status(200).json({
                                    success: true,
                                    message: "We've sent you an email. Please check your email to verify and activate your account.",
                                    status: 0,
                                    errors: [],
                                    data: null
                                });
                            }
                            });      
                        }
                    });
                });
            }
        });
    },
    verifyOtp: (req, res) => {
        const validationRule = {
            "email": "required|email",
            "otp": "required",
        }
        validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
                return res.status(200).json({
                    success: false,
                    status: 1,
                    message: ' Validation error!',
                    errors: err,
                    data: []
                });
            }
             else {
                verifyotp(req.body, (error, data) => {
                    if(error || data === null || data === undefined){
                      return res.status(200).json({
                          success: false,
                          status: 1,
                          message: "Verification unsuccessful!",
                          errors: [error ? error : "Invalid otp code!"],
                          data: []
                      });
                    }
                    else{
                        const hour= 1000 * 60 * 60;
                        const hour_ago = Date.now() - hour;
                      if(hour_ago > data.created_at){
                        return res.status(200).json({
                            success: true,
                            status: 1,
                            message: "Invalid otp!",
                            errors: ["Expired otp!"],
                            data: []
                        });
                      }
                      else{
                        verifyuser(req.body.email, (er) => {
                            if(er){
                                return res.status(200).json({
                                    success: true,
                                    status: 1,
                                    message: "Verification unsucceddfull!",
                                    errors: [er],
                                    data: []
                                });
                            }
                            return res.status(200).json({
                                success: true,
                                status: 0,
                                message: "Otp verified successfully!",
                                errors: [],
                                data: []
                            });
                        });
                      }
                    }
                  })
             }
            });
    },
    verifyUser: (req, res) => {
        verify(req.params.id, (error) => {
          if(error){
            return res.status(200).json({
                success: false,
                message: "Verification unsuccessful!"
            });
          }
          else{
            return res.status(200).json({
                success: true,
                message: "Account verified successfully!"
            });
          }
        })
    },
    forgotPassword: (req, res) => {
        getUserByUserEmail(req.body.email, (error, results) => {
            if(error || !results){
                return res.status(200).json({
                    success: false,
                    message: "Denied access!"
                });
            }
            else{
                sendForgotPasswordEmail(req.body.email, results.user_id, (error, response) => {
                     if(error){
                         return res.status(200).json({
                             success: false,
                             message: "Email submitted is not functional!"
                         });
                     }
                     else{
                        return res.status(200).json({
                            success: true,
                            message: "A link has been sent to your email, chek your mail!"
                        })
                     }
                })
            }
        });
    },
    resetPassword: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, salt);
        resetUserPassword(body, (error) => {
            if(error){
                return res.status(200).json({
                    success: false,
                    message: error
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "You have successfully updated your password!"
                });
            }
        })
    },
    suspendUser: (req, res) => {
        suspenduser(req.params.id, req.body, (error) => {
            if(error){
                return res.status(200).json({
                    success: false,
                    message: error
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "User suspended successfully"
                })
            }
        })
    },
    unsuspendUser: (req, res) => {
        unsuspenduser(req.params.id, req.body, (error) => {
            if(error){
                return res.status(200).json({
                    success: false,
                    message: error
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    message: "User activated successfully"
                })
            }
        })
    },
    getUsers: (req, res) => {
        getAllUsers(req, (error, results) => {
            if(error){
                return res.status(200).json({
                    success: false,
                    message: error
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    data: results
                })
            }
        })
    },
    getUser: (req, res) => {
        getSingleUser(req.params.id, (error, results) => {
            if(error){
                return res.status(200).json({
                    success: false,
                    message: error
                })
            }
            else{
                if(results){
                    return res.status(200).json({
                        success: true,
                        data: results
                    })
                }
                else{
                    return res.status(200).json({
                        success: false,
                        message: 'User does not exist!'
                    })
                }
            }
        })
    },
    updateUser: (req, res) => {
        upload(req, res, (err) => {
            const profileData = req.body;
            if(err){
                res.status(200).json({
                    success: false,
                    message: err
                })
            }
                else {
                if(req.file == undefined){
                    updateuseraccountdetails(req.params.id, profileData, (error) => {
                        if(error){
                            return res.status(200).json({
                                success: false,
                                message: error
                            })
                        }
                        else{
                            updateusergeneraldetails(req.params.id, profileData, null, (errno) => {
                                if(errno){
                                    return res.status(200).json({
                                        success: false,
                                        message: errno
                                    })
                                }
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Profile updated successfully!'
                                    });
                            });
                        }
                    });
                } 
                else {
                updateusergeneraldetails(req.params.id, profileData, `https://magentapi.herokuapp.com/public/uploads/${req.file.filename}`, (errno) => {
                    if(errno){
                        return res.status(200).json({
                            success: false,
                            message: errno
                        })
                    }
                        return res.status(200).json({
                            success: true,
                            message: 'Profile updated successfully!'
                        });
                })
                }
            }
            });
    }
 }