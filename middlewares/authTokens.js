const { Router } = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRETE_KEY;
const User = require('../models/User.model');

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    // {
    //   expiresIn: "1h",
    // }
  );
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  user.refreshToken = token;
  await User.findOneAndUpdate({ email: user.email }, user);

  return token;
};

const handleRefreshToken = async (req, res, next) => {
  const refresh_token = (req.headers["refresh_token"]) || "";
  if (!refresh_token) {
    return res.status(401).send({ message: "Invalid refresh token" });
  }

  //verify the refresh token
  try {
    const decodedRefreshToken = jwt.verify(
      refresh_token,
      JWT_SECRET
    );

    if (!decodedRefreshToken) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    //check the refreshToken exist in user
    const user = await User.findOne({ email: decodedRefreshToken.email });
    if (user.refreshToken !== refresh_token) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    // generate access token
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(401).send({ message: error });
  }
};

const generateResetToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    JWT_SECRET,
    {
      expiresIn: "10mins",
    }
  );
};

const veryResetToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET,
      async (err, decoded) => {
        if (err) {
          resolve(false);
          reject(true);
        } else {
          try {
            resolve(decoded.email);
          } catch (error) {
            resolve(false);
          }
        }
      }
    );
  });
};

// // Define a middleware function to check jwt
const verifyAccessToken = async (req, res, next) => {

  // Get the token from the request header
  var token = req.headers["authorization"]?.replace("Bearer ", "") || "";

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  console.log("Token:", token);
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {

    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If verification succeeds, pass the decoded data to the next middleware
    try {
      const user = await User.findOne({ email: decoded.email });
      req["user"] = user;
      next();
    } catch (error) {
      return res.status(401).send({ message: "Invalid user" });
    }
  });
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  handleRefreshToken,
  generateResetToken,
  veryResetToken
}