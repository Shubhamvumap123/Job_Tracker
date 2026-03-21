const express = require("express");
const router = express.Router();

const { createJob, getJobs, updateJob, deleteJob } = require("../controller/JobController");
const { protect } = require("../middleware/authMiddleware");

// Create new job
router.post("/create", protect, createJob);

// Get list of jobs
router.get("/list", protect, getJobs);

// Update specific job
router.put("/update/:id", protect, updateJob);

// Delete specific job
router.delete("/delete/:id", protect, deleteJob);

module.exports = router;
