import Service from "../model/servicesSchima.js"


export const createService = async (req, res) => {
  try {
    const { title, detail } = req.body;

    if (!title || !detail) {
      return res.status(400).json({
        success: false,
        message: "Enter All Details",
      });
    }

    const data = await Service.create({
      title,
      detail,
      image: req.file
        ? `${process.env.BACKEND_URL}/upload/${req.file.filename}`
        : null,
    });

    res.status(201).json({
      success: true,
      message: "Service Created Successfully",
      data,
    });
  } catch (error) {
    console.log("createService error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating Services",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const data = await Service.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting service",
    });
  }
};

export const findService=async(req,res)=>{
    try {
        const data=await Service.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Error foinding Services"})
    }
}
