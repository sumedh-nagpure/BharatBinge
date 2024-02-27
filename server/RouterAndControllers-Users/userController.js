const Users = require("../schemas/UserSchema");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;

const crypto = require('crypto');

const validateEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password should be at least 4 characters long
  return password.length >= 4;
};

const validateName = (name, fieldName) => {
  // Name should be at least 2 characters long and should not contain only spaces
  if (name.trim().length < 3) {
    throw new Error(`${fieldName} should be at least 3 characters long and should not contain only spaces.`);
  }
  return true;
};

const validateAge = (age) => {
  // Age should be greater than 10 and less than 150
  if (age <= 10 || age >= 150) {
    throw new Error("Age should be greater than 10 and less than 150.");
  }
  return true;
};

const userController = {
  /////// delete all users from database
  deleteAllUsers: (req, res) => {
    Users.deleteMany({})
      .then((result) => {
        res.status(200).json({
          message: `Deleted ${result.deletedCount} users`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
        });
      });
  },

  ///////// verify token
  verifyToken: async (req, res, next) => {
    console.log("verifiyingtoken1")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    console.log("verify2")

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    console.log("verify3")
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verify-4 : decoded: ", decodedToken)
      req.userData = { userId: decodedToken.userId, email: decodedToken.email };
      next();
    } catch (err) {
      console.log("error: ", err)
      return res.status(401).json({ message: "Invalid token" });
    }
  },

  ////////// update dislikes
  updateDislikes: async (req, res) => {
    let { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "Movie object  is required" });
    }
    try {
      const user = await Users.findById(req.userData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      let movieInDislikes = await Users.findOne({
        _id: req.userData.userId,
        dislikes: { $elemMatch: { originalId: movie.originalId } },
      });
      if (movieInDislikes !== null) {
        await Users.findByIdAndUpdate(req.userData.userId, {
          $pull: { dislikes: movie },
        });
        res.json({
          status: true,
          message: "Movie was found in Dislikes. Now removed",
        });
      } else {
        let movieInLikes = await Users.findOne({
          _id: req.userData.userId,
          likes: { $elemMatch: { originalId: movie.originalId } },
        });
        if (movieInLikes !== null) {
          await Users.findByIdAndUpdate(req.userData.userId, {
            $pull: { likes: movie },
          });
          await Users.findByIdAndUpdate(req.userData.userId, {
            $addToSet: { dislikes: movie },
          });
          res.json({
            status: true,
            message:
              "Movie not found in dislikes. Movie found in likes . removed and added to dislikes",
          });
        } else {
          await Users.findByIdAndUpdate(req.userData.userId, {
            $addToSet: { dislikes: movie },
          });
          res.json({
            status: true,
            message: "May be a fresh movie. Added to dislikes",
          });
        }
      }
    } catch (error) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  },
  //////////// update watchlist
  updateWatchlist: async (req, res) => {
    let { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "Movie object  is required" });
    }
    try {
      const user = await Users.findById(req.userData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      let movieInWatchlist = await Users.findOne({
        _id: req.userData.userId,
        watchlist: { $elemMatch: { originalId: movie.originalId } },
      });
      if (movieInWatchlist !== null) {
        await Users.findByIdAndUpdate(req.userData.userId, {
          $pull: { watchlist: movie },
        });
        res.json({
          status: true,
          message: "Movie removed from watchlist",
        });
        // remove this movie from likes
      } else {
        await Users.findByIdAndUpdate(req.userData.userId, {
          $addToSet: { watchlist: movie },
        });
        res.json({
          status: true,
          message: "movie added to watchlist",
        });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  },
  updateLikes: async (req, res) => {
    let { movie } = req.body;

    if (!movie) {
      return res.status(400).json({ error: "Movie object  is required" });
    }
    try {
      const user = await Users.findById(req.userData.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      let movieInLikes = await Users.findOne({
        _id: req.userData.userId,
        likes: { $elemMatch: { originalId: movie.originalId } },
      });
      if (movieInLikes !== null) {
        await Users.findByIdAndUpdate(req.userData.userId, {
          $pull: { likes: movie },
        });
        res.json({
          status: true,
          message: "Movie was found in Likes. Now removed",
        });
        // remove this movie from likes
      } else {
        let movieInDislikes = await Users.findOne({
          _id: req.userData.userId,
          dislikes: { $elemMatch: { originalId: movie.originalId } },
        });
        if (movieInDislikes !== null) {
          // remove from dislikes , add to likes
          await Users.findByIdAndUpdate(req.userData.userId, {
            $pull: { dislikes: movie },
          });
          await Users.findByIdAndUpdate(req.userData.userId, {
            $addToSet: { likes: movie },
          });
          res.json({
            status: true,
            message: "Removed from dislikes. Added to likes",
          });
        } else {
          await Users.findByIdAndUpdate(req.userData.userId, {
            $addToSet: { likes: movie },
          });
          res.json({
            status: true,
            message: "May be a fresh movie. Added to likes",
          });
        }
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  },

  //////////////////// get all users from the database
  verifyLogin: async (req, res) => {
    try {
      // Extract the token from the header
      const authHeader = req.headers.authorization;
      console.log("authHeader : ", authHeader)
      if (!authHeader || authHeader === null) {
        // If authorization header is missing, return false
        return res.json({ verified: false, message: "auth header missing" });
      }

      const token = authHeader.split(' ')[1];
      if (!token || token === null) {
        // If token is missing or null, return false
        return res.json({ verified: false, message: "token header missing" });
      }

      // Verify the token
      console.log("token :", token)
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        // If token verification fails, return false
        return res.json({ verified: false, message: "DECODED NOT VERIFIED" });
      } else {
        // If token verification succeeds, return true
        return res.json({ verified: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.find();
      const count = users.length;
      res.json({ status: true, message: "Users found", count, data: users });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  ////////// get a individual user
  getUserById: async (req, res) => {
    try {

      const user = await Users.findById(req.userData.userId);
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }
      res.json({ status: true, msg: "User found ", user: user });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  ////// user login Login user
  loginUser: async (req, res) => {
    try {
      var { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide email and password" });
      }
      try {
        console.log("here")

        if (!validateEmail(email)) {
          throw new Error("Invalid email format.");
        }
        if (!validatePassword(password)) {
          throw new Error("Password should be at least 4 characters long.");
        }
      } catch (validationError) {
        return res.status(400).json({
          status: false,
          swal_title: "Invalid Input",
          swal_message: validationError.message,
        });
      }
      // Check if user exists
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(404).json({
          status: false,
          swal_title: "Incorrect email",
          swal_message: "Email doesnt exist in the database",
        });
      }

      password = crypto.createHash('sha256').update(password).digest('hex');

      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({
          status: false,
          swal_title: "Invalid credentials",
          swal_message: "Email and password dont match.Please recheck",
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.json({ status: true, message: "Login successful", token });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        swal_title: "OOPS",
        swal_message: "Something went wrong",
      });
    }
  },



  createUser: async (req, res) => {
    try {
      var { firstName, lastName, age, email, password } = req.body;

      // Validate input fields
      try {
        validateName(firstName, "First name");
        validateName(lastName, "Last name");
        validateAge(age);
        if (!validateEmail(email)) {
          throw new Error("Invalid email format.");
        }
        if (!validatePassword(password)) {
          throw new Error("Password should be at least 4 characters long.");
        }
      } catch (validationError) {
        return res.status(400).json({
          status: false,
          swal_title: "Invalid Input",
          swal_message: validationError.message,
        });
      }

      // Check if user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          swal_title: "User exists already",
          swal_message: "User with this email already exists. Try with a different email, or try logging in",
        });
      }

       password = crypto.createHash('sha256').update(password).digest('hex');


      const user = new Users({ firstName, lastName, age, email, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ status: true, message: "User created successfully", token });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        swal_title: "OOPS",
        swal_message: "Something went wrong",
      });
    }
  },


  ///////////////////////// update a user
  updateUser: (req, res) => { },

  ////////////////// Delete a user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await Users.findByIdAndDelete(req.userData.userId);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }
      res.json({ status: true, message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },
};

module.exports = userController;
