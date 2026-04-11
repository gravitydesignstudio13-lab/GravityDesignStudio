import generatetoken from "../config/token.js";
import AdminModel from "../model/userSchema.js";
import bcrypt from "bcrypt";


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill email and password",
      });
    }

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token =generatetoken(admin._id)

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.log("ADMIN LOGIN ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.log("ADMIN LOGOUT ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// create admin (use only once or protect it later)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const existingAdmin = await AdminModel.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await AdminModel.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    console.log("CREATE ADMIN ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};