// bring in prisma and cookie

const bcrypt = require("bcryptjs");
const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");

// user signup

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all fields");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // send user token
    cookieToken(user, res);
  } catch (error) {
    throw new Error(error);
  }
};

// user login

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // throw new Error("Invalid email or password");
      res.status(401).json({ message:"invalid password or email",sucess: false})

    }

    // send user token
    cookieToken(user, res);
  } catch (error) {
    throw new Error("Error during login:", error);
  }
};

// logout
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ data:"true",success:true})
  } catch (error) {
    throw new Error(error);
  }
};
