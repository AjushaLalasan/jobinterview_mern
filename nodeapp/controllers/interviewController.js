// controllers/interviewController.js
const Interview = require("../models/Interview");

// Create Interview
exports.addInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    const savedInterview = await interview.save();
    res.status(200).json(savedInterview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Interview by ID
exports.updateInterview = async (req, res) => {
  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInterview)
      throw new Error("Interview not found with id: " + req.params.id);
    res.status(200).json(updatedInterview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Interview by ID
exports.deleteInterview = async (req, res) => {
  try {
    const deleted = await Interview.findByIdAndDelete(req.params.id);
    if (!deleted)
      throw new Error("Interview not found with id: " + req.params.id);
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Interviews
exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Interview by ID
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview)
      throw new Error("Interview not found with id: " + req.params.id);
    res.status(200).json(interview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
