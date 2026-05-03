import HomeVideo from "../model/homeVideoModel.js";
import cloudinary from "../config/cloudinary.js";

// ✅ UPLOAD VIDEO
export const uploadHomeVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No video uploaded" });
    }

    const videoUrl = req.file.path;

    // 🔥 STEP 1: Get old video
    const oldVideo = await HomeVideo.findOne();

    // 🔥 STEP 2: Delete old video from Cloudinary
    if (oldVideo?.videoUrl) {
      try {
        const publicId = oldVideo.videoUrl
          .split("/")
          .slice(-1)[0]
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `gravity-videos/${publicId}`,
          { resource_type: "video" } // ✅ IMPORTANT for video
        );
      } catch (err) {
        console.log("Cloudinary delete error:", err);
      }
    }

    // 🔥 STEP 3: Remove old record from DB
    await HomeVideo.deleteMany();

    // 🔥 STEP 4: Save new video
    const data = await HomeVideo.create({
      videoUrl,
    });

    res.json({
      success: true,
      message: "Video uploaded & old video removed",
      data,
    });
  } catch (error) {
    console.log("UPLOAD VIDEO ERROR =", error);
    res.status(500).json({ success: false });
  }
};

// ✅ GET VIDEO
export const getHomeVideo = async (req, res) => {
  try {
    const video = await HomeVideo.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.log("GET VIDEO ERROR =", error);
    res.status(500).json({ success: false });
  }
};