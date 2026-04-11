import Inquiry from "../model/inquerySchema.js";


export const createInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, service, message } = req.body;

    if (!fullName || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const newInquiry = new Inquiry({
      fullName,
      email,
      phone,
      service,
      message,
    });

    await newInquiry.save();

    return res.status(201).json({
      success: true,
      message: "Inquiry sent successfully",
      data: newInquiry,
    });
  } catch (error) {
    console.log("CREATE INQUIRY ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating inquiry",
    });
  }
};

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Inquiries fetched successfully",
      data: inquiries,
    });
  } catch (error) {
    console.log("GET ALL INQUIRIES ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching inquiries",
    });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["unread", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: updatedInquiry,
    });
  } catch (error) {
    console.log("UPDATE INQUIRY STATUS ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating inquiry status",
    });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInquiry = await Inquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.log("DELETE INQUIRY ERROR =", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting inquiry",
    });
  }
};