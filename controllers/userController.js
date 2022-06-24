const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../utils/genateJwtToken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  const userSaved = await newUser.save();
  if (userSaved) {
    return res.status(201).json({
      message: "User created successfully",
    });
  } else {
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = generateJwtToken(user);
  return res.status(200).json({
    message: "User logged in successfully",
    token,
  });
};

const userUpdate = async (req, res) => {
  const { name, email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  const userUpdated = await userModel.findOneAndUpdate(
    { email },
    { name, email }
  );
  if (userUpdated) {
    return res.status(200).json({
      message: "User updated successfully",
    });
  } else {
    return res.status(500).json({
      message: "Error updating user",
    });
  }
};

const userChangePassword = async (req, res) => {
  const { email, password} = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }
  const isPasswordSame = await bcrypt.compare(password, user.password);
  if (!isPasswordSame) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userUpdated = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    if (userUpdated) {
      return res.status(200).json({
        message: "password changed successfully",
      });
    } else {
      return res.status(500).json({
        message: "Error updating user",
      });
    }
  } else {
    return res.status(500).json({
      message: "password is same",
    });
  }
};



const sendResetPasswordLink = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "mehrabriyan4@gmail.com", // generated user
                  pass: process.env.PASSWORD, // generated  password
                },
                tls: {
                  rejectUnauthorized: false,
                },
              });
          
              // send mail with defined transport object
              await transporter.sendMail({
                from: '"Reset password "<mehrabriyan4@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Reset password", // Subject line
                // text: "Hello world?", // plain text body
                html: `<h3>${user.name} your password reset link...</h3>
                <a href="http://${req.headers.host}/user/verify-email?token=${generateJwtToken(user)}">"http://${req.headers.host}/user/verify-email?token=${generateJwtToken(user)}"<a/>`, // html body
              });
                return res.status(200).json({
                    message: "Email sent successfully",
                });

        }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error sending email",
      });
    }
  };

module.exports = { userRegister, userLogin, userUpdate, userChangePassword, sendResetPasswordLink };
