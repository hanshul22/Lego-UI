const jwt = require("jsonwebtoken");
const AdminModel = require("../model/Admin.Schema");

var checkAdminAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers
  console.log(authorization);
  
  if (authorization)  {

    try {
      // Get Token from header
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const userId = decoded.userID;
      req.userID = userId;
      // Get User from token
      req.user = await AdminModel.findById(userId).select("-password");
      
      if (!req.user) {
        return res.status(401).send({ status: "failed", message: "Unauthorized User" });
      }
      
      next();
    } catch (error) {
      console.log("Error in middleware:", error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  } else {
    console.log("auth is not provided");
    
    res.status(401).send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

module.exports = checkAdminAuth;
