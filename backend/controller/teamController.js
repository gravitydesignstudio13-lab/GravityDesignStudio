import Team from "../model/teamModel.js";


// ✅ ADD TEAM
export const addTeamMember = async (req, res) => {
  try {
    const { name, role, description } = req.body;

    if (!name || !role) {
      return res.json({ 
        success: false, 
        message: "Name and Role are required" 
      });
    }

    const image = req.file?.path;

    if (!image) {
      return res.json({ 
        success: false, 
        message: "Image is required" 
      });
    }

    const newMember = new Team({
      name,
      role, // ✅ added
      description,
      image,
    });

    await newMember.save();

    res.json({
      success: true,
      message: "Team member added successfully",
      data: newMember,
    });
  } catch (error) {
    console.log("ADD TEAM ERROR =", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ GET ALL TEAM
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: 1 }); // latest first

    res.json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.log("GET TEAM ERROR =", error);
    res.status(500).json({ success: false });
  }
};


// ✅ DELETE TEAM
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    await Team.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("DELETE TEAM ERROR =", error);
    res.status(500).json({ success: false });
  }
};


// ✅ UPDATE TEAM
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, description } = req.body;

    let updateData = { name, role, description }; // ✅ added role

    if (!name || !role) {
      return res.json({ 
        success: false, 
        message: "Name and Role are required" 
      });
    }

    // If new image uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Team.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("UPDATE TEAM ERROR =", error);
    res.status(500).json({ success: false });
  }
};