import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/auth.js";

//Register Endpoint
export const addUser = async (req, res, next) => {
    try {
      //Check if name was entered
      const { first_name, last_name, email, password } = req.body;
      if (!first_name) {
        return res.status(400).json({
          errorMsg: "Name is required",
        });
      }

      if (!last_name) {
        return res.status(400).json({
          errorMsg: "Name is required",
        });
      }
  
      //Check if password is good
      if (!password || password.length < 6) {
        return res.status(400).json({
          errorMsg: "Password is required and should be at least 6 characters long",
        });
      }

       //Check if email exist
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({
        errorMsg: "Email already exist",
      });
    }


    //Add a user to the database
    const hashedPassword = await hashPassword(password);
    const createResult = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    // Return response
    res.status(201).json(createResult);
  } catch (error) {
    next(error);
  }
};


//Login Endpoint
export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      //Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          errorMsg: "No user found",
        });
      }
  
      
      //Check if password match
      const match = await comparePassword(password, user.password);
      if (match) {
        jwt.sign(
          { email: user.email, id: user._id, name: user.name },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            return res.status(202).json({ user, token });
          }
        );
      } else {
        return res.status(404).json({
          errorMsg: "Password don't match",
        });
      }
    } catch (error) {
      next(error);
    }
  };