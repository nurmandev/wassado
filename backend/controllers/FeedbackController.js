const FeedbackModel = require("../models/FeedbackModel");

// ----------------GET ALL FEEDBACKS API START-------------------------
// @Request  GET
// @Route    /api/feedback/
// @access   Private

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().populate("user");
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feedbacks" });
  }
};

// ----------------GET FEEDBACK BY ID API START-------------------------
// @Request  GET
// @Route    /api/feedback/:id
// @access   Private

const getFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await FeedbackModel.findById(id).populate("user");
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feedback" });
  }
};

// ----------------CREATE FEEDBACK API START-------------------------
// @Request  POST
// @Route    /api/feedback/
// @access   Private

const createFeedback = async (req, res) => {
  const { user, comments } = req.body;

  try {
    const newFeedback = await FeedbackModel.create({
      user,
      comments,
    });

    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: "Error creating feedback" });
  }
};

// ----------------UPDATE FEEDBACK API START-------------------------
// @Request  PUT
// @Route    /api/feedback/:id
// @access   Private

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { user, comments } = req.body;

  try {
    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
      id,
      { user, comments },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json(updatedFeedback);
  } catch (err) {
    res.status(500).json({ error: "Error updating feedback" });
  }
};

// ----------------DELETE FEEDBACK API START-------------------------
// @Request  DELETE
// @Route    /api/feedback/:id
// @access   Private

const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.status(200).json({ success: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting feedback" });
  }
};

// ----------------EXPORTING CONTROLLERS-------------------------

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
