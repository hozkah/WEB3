const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs,
} = require('../controllers/jobController');
const { protect, isEmployer } = require('../middleware/authMiddleware');
const { checkJobOwnership } = require('../middleware/jobMiddleware');

router.route('/').get(getJobs);
router.route('/employer').get(protect, isEmployer, getEmployerJobs);

router
  .route('/')
  .post(protect, isEmployer, createJob);

router
  .route('/:id')
  .get(getJobById)
  .put(protect, isEmployer, checkJobOwnership, updateJob)
  .delete(protect, isEmployer, checkJobOwnership, deleteJob);

module.exports = router;