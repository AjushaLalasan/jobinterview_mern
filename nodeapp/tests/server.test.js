const mongoose = require("mongoose");
const Interview = require("../models/Interview");
const interviewController = require("../controllers/interviewController");

describe("Interview Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addInterview", () => {
    it("should add an interview and return 200 with the saved interview", async () => {
      const interviewData = {
        candidateName: "John Doe",
        companyName: "Acme Corp",
        jobTitle: "Developer",
        interviewDate: new Date(),
        interviewType: "Technical",
        status: "Scheduled",
        feedback: "N/A",
      };
      const req = { body: interviewData };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.prototype.save = jest.fn().mockResolvedValue(interviewData);
      await interviewController.addInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(interviewData);
    });
    it("should handle errors and return 400", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Validation error"));
      await interviewController.addInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
    });
  });

  describe("updateInterview", () => {
    it("should update an interview and return 200 with the updated interview", async () => {
      const updatedInterview = { candidateName: "Jane", _id: "1" };
      const req = { params: { id: "1" }, body: updatedInterview };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(updatedInterview);
      await interviewController.updateInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedInterview);
    });
    it("should return 400 if interview not found", async () => {
      const req = { params: { id: "2" }, body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      await interviewController.updateInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Interview not found with id: 2",
      });
    });
  });

  describe("deleteInterview", () => {
    it("should delete an interview and return 200 with success message", async () => {
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "1" });
      await interviewController.deleteInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Interview deleted successfully",
      });
    });
    it("should return 400 if interview not found", async () => {
      const req = { params: { id: "2" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await interviewController.deleteInterview(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Interview not found with id: 2",
      });
    });
  });

  describe("getAllInterviews", () => {
    it("should return all interviews with 200", async () => {
      const interviews = [{ candidateName: "A" }, { candidateName: "B" }];
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.find = jest.fn().mockResolvedValue(interviews);
      await interviewController.getAllInterviews(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(interviews);
    });
    it("should handle errors and return 400", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.find = jest.fn().mockRejectedValue(new Error("DB error"));
      await interviewController.getAllInterviews(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("getInterviewById", () => {
    it("should return interview by id with 200", async () => {
      const interview = { candidateName: "A", _id: "1" };
      const req = { params: { id: "1" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findById = jest.fn().mockResolvedValue(interview);
      await interviewController.getInterviewById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(interview);
    });
    it("should return 400 if interview not found", async () => {
      const req = { params: { id: "2" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Interview.findById = jest.fn().mockResolvedValue(null);
      await interviewController.getInterviewById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Interview not found with id: 2",
      });
    });
  });
});
