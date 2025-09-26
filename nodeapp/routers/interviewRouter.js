// routers/interviewRouter.js
const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

// Create Interview
router.post("/", interviewController.addInterview);

// Update Interview by ID
router.put("/:id", interviewController.updateInterview);

// Delete Interview by ID
router.delete("/:id", interviewController.deleteInterview);

// Get all Interviews
router.get("/", interviewController.getAllInterviews);

// Get Interview by ID
router.get("/:id", interviewController.getInterviewById);

module.exports = router;
