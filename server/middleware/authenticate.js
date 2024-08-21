const jwt = require("jsonwebtoken");
const User = require("../database/models/user");

const Authenticate = async (req, res, next) => {
  try {
    // Extract token from authorization header
    const token = await req.headers.authorization.split(" ")[1];

    // Verify the token using the secret
    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const rootUser = await User.findOne({
      _id: verified._id,
      "tokens.jwtoken": token,
    });

    // If no user is found, throw an error
    if (!rootUser) {
      throw new Error("no such user");
    }

    // Attach token and user info to the request object
    req.token = token;
    req.rootUser = rootUser;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).send("Didn't find token!");
    console.log(err);
  }
};

module.exports = Authenticate;
