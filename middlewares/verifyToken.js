const jwt = require("jsonwebtoken");
const {User}=require("../models/User")
// verify token
async function verifyToken (req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      // verify بتعطيني البيلود لانو فيها ال id بدي ياها اجباري مشان اعرف اليوسر
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id).select("email isAdmin");
      if (!user) return res.status(404).json({ message: "User not found" });
        req.user ={
            id:user._id,
            email:user.email,
            isAdmin:user.isAdmin
        };
      next();
    } catch (error) {
      res.status(401).json({ message: "invaled token" });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}
// verify token && authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id||req.user.isAdmin) {
        next();
    }else{
        return res.status(403).json({message:"you are not allwoed "})
    }
  });
}
// verify token && Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
        next();
    }else{
        console.log(req.user)
        return res.status(403).json({message:"you are not allwoed; only admin allwoed"})
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
