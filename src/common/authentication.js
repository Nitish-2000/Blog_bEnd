import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const hashpassword = async (password) => {
  // var salt = bcrypt.genSalt(Number(process.env.SALT))
  // var input = bcrypt.hash(password)
  var hash = bcrypt.hash(password, Number(process.env.SALT)); //auto-gen a salt and hash)
  return hash;
};
const hashcompare = async (password, hashpwd) => {
  return await bcrypt.compare(password, hashpwd);
};

const createToken = async (payload) => {
  let token = await jwt.sign(payload, process.env.JWT_Secretkey, {
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

    req.headers.userId = data.id;

    let currentTime = (+new Date()) / 1000;
    if (currentTime > data.exp) {
      res.status(400).send({ message: "Session expired" });
    } else {
      next();
    }
  } else {
    res.status(401).send({ message: "No token Found " });
  }
};

const checkrole = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    let data = await decodetoken(token);
    if (data.role == "admin") {
      next();
    } else res.status(401).send("Only admins are authorised to login");
  }
};

export default { hashpassword, hashcompare, createToken, validate, checkrole };
