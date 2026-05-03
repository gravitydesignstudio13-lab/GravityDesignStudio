import Review from "../model/reviewModel.js";


// ✅ ADD (NO IMAGE)
export const addReview = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.json({
        success: false,
        message: "Name and description are required",
      });
    }

    const review = new Review({
      name,
      description,
    });

    await review.save();

    res.json({
      success: true,
      message: "Review added",
      data: review,
    });
  } catch (error) {
    console.log("ADD REVIEW ERROR =", error);
    res.status(500).json({ success: false });
  }
};



// ✅ GET
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: 1 }); // optional change

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log("GET REVIEW ERROR =", error);
    res.status(500).json({ success: false });
  }
};



// ✅ DELETE
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await Review.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.log("DELETE REVIEW ERROR =", error);
    res.status(500).json({ success: false });
  }
};



// ✅ UPDATE (NO IMAGE)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updated = await Review.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated",
      data: updated,
    });
  } catch (error) {
    console.log("UPDATE REVIEW ERROR =", error);
    res.status(500).json({ success: false });
  }
};