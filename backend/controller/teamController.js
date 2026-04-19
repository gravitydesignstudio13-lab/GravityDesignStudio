import Team from "../model/teamSchema.js";
import cloudinary from "../config/cloudinary.js";

// ADD TEAM MEMBER
export const addTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;

    console.log("BODY =", req.body);
    console.log("FILE =", req.file);

    // validation
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ✅ get cloudinary url
    const image = req.file.path;

    // ✅ save to DB
    const newMember = new Team({
      name,
      role,
      image,
    });

    await newMember.save();

    // ✅ send response
    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: newMember,
    });

  } catch (error) {
    console.log("ADD TEAM MEMBER ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding team member",
    });
  }
};
// GET ALL TEAM MEMBERS
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.log("GET TEAM MEMBERS ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching team members",
    });
  }
};

// DELETE TEAM MEMBER (Cloudinary + DB)
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Team.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    // 🔥 Delete from Cloudinary
    if (member.image) {
      const publicId = member.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      await cloudinary.uploader.destroy(`gravity-images/${publicId}`);
    }

    await Team.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.log("DELETE TEAM MEMBER ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting team member",
    });
  }
};