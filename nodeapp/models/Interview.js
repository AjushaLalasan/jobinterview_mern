// models/Interview.js
const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  interviewDate: { type: Date, required: true },
  interviewType: { type: String, required: true },
  status: { type: String, required: true },
  feedback: { type: String, maxlength: 2000 }
});

module.exports = mongoose.model('Interview', InterviewSchema);
