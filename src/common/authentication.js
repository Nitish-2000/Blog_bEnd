const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashpassword = async (password) => {
  // var salt = bcrypt.genSalt(Number(process.env.SALT))
  // var input = bcrypt.hash(password)
  var hash = bcrypt.hash(password, Number(process.env.SALT));
  return hash;
};
const hashcompare = async (password, hashpwd) => {
  return await bcrypt.compare(password, hashpwd);
};

const createToken = async (payload) => {
  token = await jwt.sign(payload, process.env.JWT_Secretkey, {
    expiresIn: process.env.JWT_Exp,
  });
  return token;
};

const decodetoken = async (token) => {
  let decodedToken = await jwt.decode(token);
  return decodedToken;
};

const validate = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    let data = await decodetoken(token);
    let currentTime = +new Date() / 1000;
    if (currentTime > data.exp) {
      res.status(400).send({ message: "Session expired" });
    } else {
      next();
    }
  } else {
    res.status(404).send({ message: "Invalid token" });
  }
};

const checkrole = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    let data = await decodetoken(token);
    if (data.role == "customer") {
      next();
    } else res.status(404).send("Only customers are authorised to login");
  }
};

module.exports = { hashpassword, hashcompare, createToken, validate,checkrole };
