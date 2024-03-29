import userModel from "../Models/users.js";
import pwdAuth from "../common/authentication.js";

const createUser = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await pwdAuth.hashpassword(req.body.password);
      await userModel.create(req.body);
      res.status(201).send({
        message:"Data Created"
      });
    } else {
      res.status(400).send({
        message: `Mail id ${req.body.email} already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message:`${error}.message`
    });
  }
};

const logincheck = async (req, res) => {
  // Creating login authentication for validating users email,
  // If email found in the Db an token is generated and
  // the token enrypted with basic user details.

  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let pwdcheck = await pwdAuth.hashcompare(
        req.body.password,
        user.password
      );

      if (pwdcheck) {
        let token = await pwdAuth.createToken({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        });
        let userData = await userModel.findOne(
          { email: req.body.email },
          { email: 0, password: 0, createdAt: 0, __v: 0, status: 0 }
        );
        res.status(200).send({
          message: "Login Successful",
          userData,
          token
        });
      } else {
        res.status(404).send({
          message:"Inavlid Password"
        });
      }
    } else {
      res.status(404).send({
        message: `user with MailId ${req.body.email} is not found`,
        token
      });
    }
  } catch (error) {
    res.status(401).send({
      message: "Invalid login",
      error: error.message,
    });
  }
};
export default {
  createUser,
  logincheck,
};
