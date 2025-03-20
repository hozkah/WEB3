const Job = require('../models/Job');
const asyncHandler = require('express-async-handler');

const checkJobOwnership = asyncHandler(async (req, res, next) => {
  const job = await Job.findByPk(req.params.id);
  
  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.employerId !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to modify this job');
  }

  req.job = job;
  next();
});

module.exports = { checkJobOwnership };