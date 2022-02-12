const { response } = require("express");
const pool = require("../../config");
const nodemailer = require("nodemailer");
const { compareSync } = require("bcrypt");
require("dotenv");

module.exports = {
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                  return callBack(error, null);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getuserprofile: (user_id, callBack) => {
      pool.query(
          `SELECT name, email, contact, city FROM users WHERE user_id = ?`,
          [user_id],
          (error, results, fields) => {
              if(error){
                return callBack(error, null);
              }
              return callBack(null, results[0]);
          }
      );
    },
    
    checkUser: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                 return callBack(error, null);
                }
                if(results.length > 0){
                 return callBack(null, results[0]);
                }
                else{
                 return callBack(null, null); 
                }
            }
        );
    },
    create: (user_id, data, callBack) => {
        pool.query(
            `INSERT INTO users(user_id, name, password, email, contact, role, status) VALUES(?,?,?,?,?,?,?)`,
            [ 
              user_id,
              data.name,
              data.password,
              data.email,
              data.contact,
              2,
              0
            ],
            (error) => {
              if(error){
              return callBack(error);
              }
              return callBack(null);
            }
        );
    },
    sendMail: (email, otp_code, callBack) => {
      pool.query(
        `INSERT INTO otp_codes(email, otp_code) VALUES(?,?)`,
        [ 
          email, 
          otp_code
        ],
        (error) => {
          if(error){
          return callBack(error);
          }
            async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
                },
            });

            let info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Email Verification",
                html: "<br></br>Hello,<br> Verification code(Expires in 1 hour!)" + otp_code
            });

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
            return callBack(null, response);
            }

            main().catch(console.error);
          }
      );
    },
    verifyuser: (email, callBack) => {
        pool.query(
            `UPDATE users SET status = ? WHERE email = ?`,
            [ 
              1,
              email
            ],
            (error, results, field) => {
              if(error){
                return callBack(error);
              }
              if(results.affectedRows > 0){
                return callBack(null);
              }
            }
        );
    },
    sendForgotPasswordEmail: (email, user_id, callBack) => {
      async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password recovery(M-agent)",
            html: "<br></br>Hello,<br> Visit this link to reset your password: <a href='https://magent-j7gp6.ondigitalocean.app/reset-password/" + user_id + "'</a>"
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 
        return callBack(null, response);
        }

        main().catch(console.error)
    },
    resetUserPassword: (data, callBack) =>{
      pool.query(
        `UPDATE account SET password = ? WHERE user_id = ?`,
        [
          data.password,
          data.user_id
        ],
        (error, results, field) => {
          if(error){
            return callBack(error);
          }
          return callBack(null);
        }
      );
    },
    getUser: (user_id, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [user_id],
            (error, results, fields) => {
                if(error){
                  return callBack(error, null);
                }
                return callBack(null, results[0]);
            }
        );
    },
    suspenduser: (id, user, callBack) => {
      pool.query(
        `SELECT * FROM account WHERE user_id = ?`,
        [
          user.user_id
        ],
        (error, results, fields) => {
          if(error){
            return callBack(error);
          }
          if(results.length < 1){
            return callBack('User does not exist!');
          }
          const result = compareSync(user.password, results[0].password);
          if(result){
              pool.query(
                      `SELECT * FROM account WHERE user_id = ? AND status = ?`,
                      [
                        id,
                        0
                      ],
                      (error, results, field) => {
                          if(results.length > 0){
                            return callBack('User is already inactive!');
                          }
                          else{
                              pool.query(
                                  `UPDATE account SET status = ? WHERE user_id = ? AND status = ?`,
                                  [
                                    0,
                                    id,
                                    1
                                  ],
                                  (error) => {
                                      if(error){
                                        return callBack('User suspended successfully!');
                                      }
                                        return callBack(null);
                                  }
                              );
                          }
                      }
                  );
          }
          else{
            return callBack('Incorrect password!')
          }
        }
      )
    },
    unsuspenduser: (id, user, callBack) => {
      pool.query(
        `SELECT * FROM account WHERE user_id = ?`,
        [
          user.user_id
        ],
        (error, results, fields) => {
          if(error){
            return callBack(error);
          }
          if(results.length < 1){
            return callBack('User does not exist!');
          }
          const result = compareSync(user.password, results[0].password);
          if(result){
              pool.query(
                      `SELECT * FROM account WHERE user_id = ? AND status = ?`,
                      [
                        id,
                        1
                      ],
                      (error, results, field) => {
                          if(results.length > 0){
                            return callBack('User is already active!');
                          }
                          else{
                              pool.query(
                                  `UPDATE account SET status = ? WHERE user_id = ? AND status = ?`,
                                  [
                                    1,
                                    id,
                                    0
                                  ],
                                  (error) => {
                                      if(error){
                                        return callBack('User unsuspended successfully!');
                                      }
                                        return callBack(null);
                                  }
                              );
                          }
                      }
                  );
          }
          else{
            return callBack('Incorrect password!')
          }
        }
      )
    },
    updatepassword: (user_id, data, callBack) => {
      console.log(data.current_password)
        pool.query(
          `SELECT * FROM users WHERE user_id = ? AND password = ?`,
          [
            user_id,
            data.current_password
          ],
          (error, results, fields) => {
            if(results.length === 0){
              return callBack('Incorrect password!')
            }
              pool.query(
                  `UPDATE users SET password = ? WHERE user_id = ?`,
                  [
                    data.new_password,
                    user_id
                  ],
                  (errno, result, fields) => {
                    console.log(results)
                    if(errno){
                      return callBack(errno);7
                    }
                    return callBack(null);
                  }
              );
          }
        );
    },
    verifyotp: (data, callBack) => {
      pool.query(
        `SELECT created_at FROM otp_codes WHERE email = ? AND otp_code = ?`,
        [
          data.email,
          data.otp
        ],
        (error, results, fields) => {
            if(error){
              return callBack(error, null);
            }
            return callBack(null, results[0]);
        }
    );
    }
  }