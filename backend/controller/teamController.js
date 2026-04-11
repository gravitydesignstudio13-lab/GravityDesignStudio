import Team from "../model/teamSchema.js";

export const addTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;

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

    const image = `${process.env.BACKEND_URL}/upload/${req.file.filename}`;

    const newMember = new Team({
      name,
      role,
      image,
    });

    await newMember.save();

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

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Team.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

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